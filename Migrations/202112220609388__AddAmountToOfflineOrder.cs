namespace TgiApplications.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _AddAmountToOfflineOrder : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.OfflineOrders", "Amount", c => c.Double(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.OfflineOrders", "Amount");
        }
    }
}
