namespace TgiApplications.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _FirstMigration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.BizCenters",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CenterName = c.String(),
                        CenterAddress = c.String(),
                        CenterPhoneNo = c.String(),
                        CenterManager = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.OfflineOrders",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        BizCenterId = c.Int(),
                        CustId = c.Int(),
                        StaffId = c.Int(),
                        CustomerPhoneNo = c.String(),
                        OrderStatus = c.String(),
                        CustomerEmail = c.String(),
                        OrderDate = c.DateTime(nullable: false),
                        PickupDate = c.DateTime(nullable: false),
                        ReferenceNo = c.String(),
                        ServiceTypeId = c.Int(),
                        ServiceCategoryId = c.Int(),
                        ItemId = c.Int(),
                        ServiceId = c.Int(),
                        ServiceCharges = c.Double(nullable: false),
                        Quantity = c.Int(nullable: false),
                        Total = c.Double(nullable: false),
                        DiscountAmount = c.Double(nullable: false),
                        TotalAmount = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.BizCenters", t => t.BizCenterId)
                .ForeignKey("dbo.Customers", t => t.CustId)
                .ForeignKey("dbo.Items", t => t.ItemId)
                .ForeignKey("dbo.Services", t => t.ServiceId)
                .ForeignKey("dbo.ServiceCategories", t => t.ServiceCategoryId)
                .ForeignKey("dbo.ServiceTypes", t => t.ServiceTypeId)
                .ForeignKey("dbo.Customers", t => t.StaffId)
                .Index(t => t.BizCenterId)
                .Index(t => t.CustId)
                .Index(t => t.StaffId)
                .Index(t => t.ServiceTypeId)
                .Index(t => t.ServiceCategoryId)
                .Index(t => t.ItemId)
                .Index(t => t.ServiceId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.OfflineOrders", "StaffId", "dbo.Customers");
            DropForeignKey("dbo.OfflineOrders", "ServiceTypeId", "dbo.ServiceTypes");
            DropForeignKey("dbo.OfflineOrders", "ServiceCategoryId", "dbo.ServiceCategories");
            DropForeignKey("dbo.OfflineOrders", "ServiceId", "dbo.Services");
            DropForeignKey("dbo.OfflineOrders", "ItemId", "dbo.Items");
            DropForeignKey("dbo.OfflineOrders", "CustId", "dbo.Customers");
            DropForeignKey("dbo.OfflineOrders", "BizCenterId", "dbo.BizCenters");
            DropIndex("dbo.OfflineOrders", new[] { "ServiceId" });
            DropIndex("dbo.OfflineOrders", new[] { "ItemId" });
            DropIndex("dbo.OfflineOrders", new[] { "ServiceCategoryId" });
            DropIndex("dbo.OfflineOrders", new[] { "ServiceTypeId" });
            DropIndex("dbo.OfflineOrders", new[] { "StaffId" });
            DropIndex("dbo.OfflineOrders", new[] { "CustId" });
            DropIndex("dbo.OfflineOrders", new[] { "BizCenterId" });
            DropTable("dbo.OfflineOrders");
            DropTable("dbo.BizCenters");
        }
    }
}
