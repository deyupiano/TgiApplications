namespace TgiApplications.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _ProgressStatus : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ProgressStatus",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Status = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.ProgressStatus");
        }
    }
}
