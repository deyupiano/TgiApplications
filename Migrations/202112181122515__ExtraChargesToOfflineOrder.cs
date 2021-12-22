namespace TgiApplications.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _ExtraChargesToOfflineOrder : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.OfflineOrders", "extraCharges", c => c.Double(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.OfflineOrders", "extraCharges");
        }
    }
}
