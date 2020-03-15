namespace TaskApplication2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitilizationDatabases : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.SeverityModels",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Title = c.String(nullable: false),
                        Description = c.String(nullable: false),
                        Severity = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "dbo.TimeModels",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Title = c.String(nullable: false),
                        Description = c.String(nullable: false),
                        StartDate = c.DateTime(nullable: true),
                        EndDate = c.DateTime(nullable: true),
                    })
                .PrimaryKey(t => t.ID);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.TimeModels");
            DropTable("dbo.SeverityModels");
        }
    }
}
