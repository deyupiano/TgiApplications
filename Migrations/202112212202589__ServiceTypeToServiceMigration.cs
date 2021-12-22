namespace TgiApplications.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _ServiceTypeToServiceMigration : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Services", "Id", c => c.Int());
            CreateIndex("dbo.Services", "Id");
            AddForeignKey("dbo.Services", "Id", "dbo.ServiceTypes", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Services", "Id", "dbo.ServiceTypes");
            DropIndex("dbo.Services", new[] { "Id" });
            DropColumn("dbo.Services", "Id");
        }
    }
}
