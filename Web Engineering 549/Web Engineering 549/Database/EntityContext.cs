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
            public DbSet<StockComment> StockComment { get; set; }
            public DbSet<StockTransaction> StockTransaction { get; set; }

            protected override void OnModelCreating(DbModelBuilder modelBuilder)
            {
                modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

                modelBuilder.Entity<ChatMessage>()
       .HasMany(u => u.Accounts).WithMany(r => r.ChatMessages)
            .Map(m =>
            {
                m.ToTable("Account_ChatMessage");
                m.MapLeftKey("chatMsgId");
                m.MapRightKey("userId");
            });

            }
    }
}