using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using Web_Engineering_549.Models;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace Web_Engineering_549.Database
{
    public partial class EntityContext : DbContext
    {
            public EntityContext()
                : base("name=WebDashboardEntities")
            {
            }
            public DbSet<Account> Account { get; set; }
            public DbSet<ChatMessage> ChatMessage { get; set; }

            protected override void OnModelCreating(DbModelBuilder modelBuilder)
            {
                modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            }
    }
}