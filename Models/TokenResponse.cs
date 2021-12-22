namespace TgiApplications.Models
{
    using System;
    using Newtonsoft.Json;

    //using SQLite.Net.Attributes;
    public class TokenResponse
    {
        #region Properties
        //[PrimaryKey, AutoIncrement]
        //public int TokenResponseId { get; set; }
        [JsonProperty(propertyName: "access_token")]
        public string AccessToken { get; set; }
        [JsonProperty(propertyName: "token_type")]
        public string TokenType { get; set; }
        [JsonProperty(propertyName: "expires_in")]
        public int ExpiresIn { get; set; }
        [JsonProperty(propertyName: "userName")]
        public string Username { get; set; }
        [JsonProperty(propertyName: ".issued")]
        public DateTime Issued { get; set; }
        [JsonProperty(propertyName: ".expires")]
        public DateTime Expires { get; set; }
        [JsonProperty(propertyName: "error_description")]
        public string ErrorDescription { get; set; }
        //public bool IRemembered { get; set; }
        //public string Password { get; set; }

        #endregion
        //#region Method
        //public override int GetHashCode()
        //{
        //    return TokenResponseId;
        //}
        //#endregion
    }

}
