using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using Web_Engineering_549.Models;

namespace Web_Engineering_549.Database
{
    public partial class EntityContext : DbContext
    {
            public EntityContext()
                : base("name=WebDashboardEntities")
            {
            }
            public DbSet<Account> Accounts { get; set; }
            public DbSet<ChatMessage> ChatMessages { get; set; }
    }
}