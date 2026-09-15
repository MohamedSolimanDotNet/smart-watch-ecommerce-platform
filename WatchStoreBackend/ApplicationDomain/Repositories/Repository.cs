using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationDomain.Repositories
{
    public class Repository<T> : IDisposable, IRepository<T> where T : class
    {
        protected DbContext DbContext { get; set; }
        protected DbSet<T> DbSet { get; set; }

        public Repository(DbContext dbContext)
        {
            DbContext = dbContext;
            DbSet = DbContext.Set<T>();
        }



        public void Add(T entity)
        {
            DbContext.Set<T>().Add(entity);
        }

        public void AddRange(List<T> lstEntities)
        {
            DbContext.Set<T>().AddRange(lstEntities);
        }

        public int Count()
        {
            return DbSet.Count();
        }

        public void Delete(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }

            DbSet.Remove(entity);
            DbContext.SaveChanges();
        }

        public void Delete(Guid id)
        {
            var entity = Find(id);
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity), "Entity not found");
            }

            Delete(entity);
        }

        public void DeleteRange(List<T> lstEntities)
        {
            DbContext.Set<T>().RemoveRange(lstEntities);
        }

        public void Dispose()
        {
            DbContext.Dispose();
        }

        public T Find(Guid id)
        {
            return DbContext.Set<T>().Find(id);
        }

        public T Find(int id)
        {
            return DbContext.Set<T>().Find(id);
        }

        public T Find(string id)
        {
            return DbContext.Set<T>().Find(id);
        }

        public IQueryable<T> GetListItems()
        {
            return GetList(null, null, null);
        }

        public IQueryable<T> GetListItems(Expression<Func<T, bool>> whereCondition)
        {
            return GetList(null, whereCondition, null);
        }

        public IQueryable<T> GetListItems(params Expression<Func<T, object>>[] navigationProperties)
        {
            return GetList(null, null, navigationProperties);
        }

        public IQueryable<T> GetListItems(Expression<Func<T, bool>> whereCondition, params Expression<Func<T, object>>[] navigationProperties)
        {
            return GetList(null, whereCondition, navigationProperties);
        }

        public void Update(T entity)
        {
            if (entity == null)
                return;
            DbContext.ChangeTracker.Clear();

            DbContext.Entry(entity).State = EntityState.Modified;
        }

        private IQueryable<T> GetList(string Id, Expression<Func<T, bool>> whereCondition, params Expression<Func<T, object>>[] navigationProperties)// where T : class
        {
            //TODO check if exist in cache before load from DB
            DbContext.Set<T>().Where(s => true);

            IQueryable<T> dbQuery = DbContext.Set<T>();

            if (navigationProperties != null)
            {
                foreach (Expression<Func<T, object>> navigationProperty in navigationProperties)
                    //dbQuery = dbQuery.Include<T, object>(navigationProperty);
                    dbQuery = dbQuery.Include(navigationProperty.AsPath());
            }

            if (whereCondition != null)
            {
                dbQuery = dbQuery.AsNoTracking().Where(whereCondition).AsQueryable<T>();
            }

            else
                dbQuery = dbQuery.AsNoTracking();

            return dbQuery;
        }

    }

    public static class ExpressionExtensions
    {
        /// <summary>
        ///     Converts the property accessor lambda expression to a textual representation of it's path. <br />
        ///     The textual representation consists of the properties that the expression access flattened and separated by a dot character (".").
        /// </summary>
        /// <param name="expression">The property selector expression.</param>
        /// <returns>The extracted textual representation of the expression's path.</returns>
        public static string AsPath(this LambdaExpression expression)
        {
            if (expression == null)
                return null;

            TryParsePath(expression.Body, out var path);

            return path;
        }

        /// <summary>
        ///     Recursively parses an expression tree representing a property accessor to extract a textual representation of it's path. <br />
        ///     The textual representation consists of the properties accessed by the expression tree flattened and separated by a dot character (".").
        /// </summary>
        /// <param name="expression">The expression tree to parse.</param>
        /// <param name="path">The extracted textual representation of the expression's path.</param>
        /// <returns>True if the parse operation succeeds; otherwise, false.</returns>
        private static bool TryParsePath(Expression expression, out string path)
        {
            var noConvertExp = RemoveConvertOperations(expression);
            path = null;

            switch (noConvertExp)
            {
                case MemberExpression memberExpression:
                    {
                        var currentPart = memberExpression.Member.Name;

                        if (!TryParsePath(memberExpression.Expression, out var parentPart))
                            return false;

                        path = string.IsNullOrEmpty(parentPart) ? currentPart : string.Concat(parentPart, ".", currentPart);
                        break;
                    }

                case MethodCallExpression callExpression:
                    switch (callExpression.Method.Name)
                    {
                        case nameof(Queryable.Select) when callExpression.Arguments.Count == 2:
                            {
                                if (!TryParsePath(callExpression.Arguments[0], out var parentPart))
                                    return false;

                                if (string.IsNullOrEmpty(parentPart))
                                    return false;

                                if (!(callExpression.Arguments[1] is LambdaExpression subExpression))
                                    return false;

                                if (!TryParsePath(subExpression.Body, out var currentPart))
                                    return false;

                                if (string.IsNullOrEmpty(parentPart))
                                    return false;

                                path = string.Concat(parentPart, ".", currentPart);
                                return true;
                            }

                        case nameof(Queryable.Where):
                            throw new NotSupportedException("Filtering an Include expression is not supported");
                        case nameof(Queryable.OrderBy):
                        case nameof(Queryable.OrderByDescending):
                            throw new NotSupportedException("Ordering an Include expression is not supported");
                        default:
                            return false;
                    }
            }

            return true;
        }

        /// <summary>
        ///     Removes all casts or conversion operations from the nodes of the provided <see cref="Expression" />.
        ///     Used to prevent type boxing when manipulating expression trees.
        /// </summary>
        /// <param name="expression">The expression to remove the conversion operations.</param>
        /// <returns>The expression without conversion or cast operations.</returns>
        private static Expression RemoveConvertOperations(Expression expression)
        {
            while (expression.NodeType == ExpressionType.Convert || expression.NodeType == ExpressionType.ConvertChecked)
                expression = ((UnaryExpression)expression).Operand;

            return expression;
        }
    }
}
