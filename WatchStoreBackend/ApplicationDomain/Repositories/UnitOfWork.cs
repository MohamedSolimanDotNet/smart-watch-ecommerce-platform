using ApplicationDomain.CustomerBaseEntity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationDomain.Repositories
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        private DbContext Dbcontext { get; set; }

        public UnitOfWork(DbContext dbContext)
        {
            Dbcontext = dbContext;
        }
        public void Dispose()
        {
            Dbcontext.Dispose();
        }

        public IRepository<T> GetRepository<T>() where T : class, new()
        {
            return new Repository<T>(Dbcontext);
        }

        public int SaveChanges()
        {
            return Dbcontext.SaveChanges();
        }

        public int SaveChanges(Guid? UserCreatedBy)
        {

            var entries = Dbcontext.ChangeTracker.Entries()
                                                    .Where(e => e.Entity is BaseEntity && (
                                                            e.State == EntityState.Added
                                                            || e.State == EntityState.Modified));

            foreach (var entity in entries)
            {
                ((BaseEntity)entity.Entity).UpdatedOn = DateTime.Now;
                ((BaseEntity)entity.Entity).UpdatedBy = UserCreatedBy;
                //var customerMail = _httpContextAccessor?.HttpContext?.User?.Identity?.Name;

                if (entity.State == EntityState.Added)
                {
                    ((BaseEntity)entity.Entity).CreatedOn = DateTime.Now;
                    ((BaseEntity)entity.Entity).CreatedBy = UserCreatedBy;
                }
                var validationContext = new ValidationContext(entity);
                Validator.ValidateObject(entity, validationContext);
            }

            return Dbcontext.SaveChanges();
        }
    }
}
