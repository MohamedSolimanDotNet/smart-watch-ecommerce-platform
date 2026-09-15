using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationDomain.Repositories
{
    public interface IRepository<T> where T : class
    {
        T Find(Guid id);
        T Find(int id);
        T Find(string id);
        void Add(T entity);
        void AddRange(List<T> lstEntities);
        void Update(T entity);
        void Delete(T entity);
        void Delete(Guid id);
        void DeleteRange(List<T> lstEntities);
        IQueryable<T> GetListItems();
        IQueryable<T> GetListItems(Expression<Func<T, bool>> whereCondition);
        IQueryable<T> GetListItems(params Expression<Func<T, object>>[] navigationProperties);
        IQueryable<T> GetListItems(Expression<Func<T, bool>> whereCondition, params Expression<Func<T, object>>[] navigationProperties);
        int Count();
      
    }
}
