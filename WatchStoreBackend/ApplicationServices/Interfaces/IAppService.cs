using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationServices.Interfaces
{
    public interface IAppService<T>
    {
        Task<T> Create(T item);
        Task<T> Update(T item);
        int Delete(Guid id);
        List<T> GetAll();
        List<T> GetAllByParentId(Guid id);
        T GetById(Guid id);

    }
}
