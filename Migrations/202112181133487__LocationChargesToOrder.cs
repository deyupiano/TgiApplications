namespace TgiApplications.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _LocationChargesToOrder : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.OfflineOrders", "LocationExtraCharges", c => c.Double(nullable: false));
            DropColumn("dbo.OfflineOrders", "ExtraCharges");
        }
        
        public override void Down()
        {
            AddColumn("dbo.OfflineOrders", "ExtraCharges", c => c.Double(nullable: false));
            DropColumn("dbo.OfflineOrders", "LocationExtraCharges");
        }
    }
}
