namespace TaskApplication2.DBConnector
{
    using System.Data.Entity;
    using System.Web.Configuration;
    using TaskApplication2.Models;

    public class DbContextApp : DbContext
    {
        public DbContextApp() : base(WebConfigurationManager.AppSettings["ConnectionString"]) { }

        public virtual DbSet<SeverityModel> Severities { get; set; }
        public virtual DbSet<TimeModel> Times { get; set; }
    }
}