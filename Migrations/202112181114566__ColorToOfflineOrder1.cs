namespace TgiApplications.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _ColorToOfflineOrder1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.OfflineOrders", "ItemColor", c => c.String());
            AddColumn("dbo.OfflineOrders", "Price", c => c.Double(nullable: false));
            DropColumn("dbo.OfflineOrders", "Total");
        }
        
        public override void Down()
        {
            AddColumn("dbo.OfflineOrders", "Total", c => c.Double(nullable: false));
            DropColumn("dbo.OfflineOrders", "Price");
            DropColumn("dbo.OfflineOrders", "ItemColor");
        }
    }
}
