using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using TgiApplications.Models;

namespace TgiApplications.Providers
{
    public class ApplicationOAuthProvider : OAuthAuthorizationServerProvider
    {
        //private SchoolDirectorDbContext db = new SchoolDirectorDbContext();
        private readonly string _publicClientId;

        public ApplicationOAuthProvider(string publicClientId)
        {
            if (publicClientId == null)
            {
                throw new ArgumentNullException("publicClientId");
            }

            _publicClientId = publicClientId;
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            var userManager = context.OwinContext.GetUserManager<ApplicationUserManager>();
            var data = await context.Request.ReadFormAsync();
            string requestingUser = data["UserName"];

            try
            {
                ApplicationUser user = await userManager.FindAsync(context.UserName, context.Password);

                if (user == null)
                {
                    context.SetError("invalid_grant", "The user name or password is incorrect.");
                    return;
                }


                ClaimsIdentity oAuthIdentity = await user.GenerateUserIdentityAsync(userManager, OAuthDefaults.AuthenticationType);
                var userStore = new UserStore<ApplicationUser>(new TgiDbContext());
                var manager = new UserManager<ApplicationUser>(userStore);


                var userRoles = manager.GetRoles(user.Id);
                foreach (string roleName in userRoles)
                {
                    oAuthIdentity.AddClaim(new Claim(ClaimTypes.Role, roleName));

                }
                var additionalData = new AuthenticationProperties(new Dictionary<string, string>{
                        {
                            "roles", Newtonsoft.Json.JsonConvert.SerializeObject(userRoles)
                        },
                        {
                            "isActivated", Newtonsoft.Json.JsonConvert.SerializeObject(user.IsActivated)
                        },
                        {
                            "userId", Newtonsoft.Json.JsonConvert.SerializeObject(user.Id)
                        },
                        {
                            "username", Newtonsoft.Json.JsonConvert.SerializeObject(user.UserName)
                        } });
                AuthenticationProperties properties = CreateProperties(context.UserName, data["isActivated"]);
                var token = new AuthenticationTicket(oAuthIdentity, additionalData);
                context.Validated(token);

            }
            catch (Exception ex)
            {

                ex.ToString();
            }


            return;
        }

        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (KeyValuePair<string, string> property in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }

            return Task.FromResult<object>(null);
        }

        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            // Resource owner password credentials does not provide a client ID.
            if (context.ClientId == null)
            {
                context.Validated();
            }

            return Task.FromResult<object>(null);
        }

        public override Task ValidateClientRedirectUri(OAuthValidateClientRedirectUriContext context)
        {
            if (context.ClientId == _publicClientId)
            {
                Uri expectedRootUri = new Uri(context.Request.Uri, "/");

                if (expectedRootUri.AbsoluteUri == context.RedirectUri)
                {
                    context.Validated();
                }
            }

            return Task.FromResult<object>(null);
        }

        public static AuthenticationProperties CreateProperties(string userName, string isActivated)
        {
            IDictionary<string, string> data = new Dictionary<string, string>
            {
                { "userName", userName },
                { "isActivated", isActivated }
            };
            return new AuthenticationProperties(data);
        }
    }
}