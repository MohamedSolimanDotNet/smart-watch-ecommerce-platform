using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace ApplicationDomain.Models
{
    public class ApplicationContext : IdentityDbContext<Customers, CustomerRoles, Guid>
    {
        public ApplicationContext() 
        { 

        }
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {

        }


        public virtual DbSet<Watches> Watches { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Customers>().ToTable("Customers");
            builder.Entity<CustomerRoles>().ToTable("CustomerRoles");
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {

                var connectionString = "Server=localhost\\SQLEXPRESS;Database=WatchStore;Trusted_Connection=True; MultipleActiveResultSets=true;TrustServerCertificate=True;";
                optionsBuilder.UseSqlServer(connectionString);
            }
        }
    }
}
