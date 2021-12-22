namespace TgiApplications.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _ItemCatTableMigration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ItemCategories",
                c => new
                    {
                        ItemCategoryId = c.Int(nullable: false, identity: true),
                        ItemCategoryName = c.String(),
                    })
                .PrimaryKey(t => t.ItemCategoryId);
            
            AddColumn("dbo.Items", "ItemCategoryId", c => c.Int());
            CreateIndex("dbo.Items", "ItemCategoryId");
            AddForeignKey("dbo.Items", "ItemCategoryId", "dbo.ItemCategories", "ItemCategoryId");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Items", "ItemCategoryId", "dbo.ItemCategories");
            DropIndex("dbo.Items", new[] { "ItemCategoryId" });
            DropColumn("dbo.Items", "ItemCategoryId");
            DropTable("dbo.ItemCategories");
        }
    }
}
