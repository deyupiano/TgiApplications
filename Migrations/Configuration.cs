namespace TgiApplications.Migrations
{
    using Microsoft.AspNet.Identity.EntityFramework;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<TgiApplications.Models.TgiDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(TgiApplications.Models.TgiDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            context.Roles.AddOrUpdate(
            new IdentityRole
            {
                Name = "Supervisor",
                Id = "1"
            },
              new IdentityRole
              {
                  Name = "Customer",
                  Id = "2"
              },
              new IdentityRole
              {
                  Name = "SuperAdmin",
                  Id = "3"
              },
               new IdentityRole
               {
                   Name = "GeneralManager",
                   Id = "4"
               },
                new IdentityRole
                {
                    Name = "Admin",
                    Id = "5"
                },
              new IdentityRole
              {
                  Name = "GeneralStaff",
                  Id = "6"
              },
              new IdentityRole
              {
                  Name = "LaundryManager",
                  Id = "7"
              },
              new IdentityRole
              {
                  Name = "LogisticsManager",
                  Id = "8"
              },
              new IdentityRole
              {
                  Name = "SchoolManager",
                  Id = "9"
              },
              new IdentityRole
              {
                  Name = "LaundryStaff",
                  Id = "10"
              },
              new IdentityRole
              {
                  Name = "LogisticsStaff",
                  Id = "11"
              },
              new IdentityRole
              {
                  Name = "SchoolStaff",
                  Id = "12"
              },
              new IdentityRole
              {
                  Name = "LaundryCustomer",
                  Id = "13"
              },
              new IdentityRole
              {
                  Name = "LogisticsCustomer",
                  Id = "14"
              }

          );
            //
        }
    }
}
