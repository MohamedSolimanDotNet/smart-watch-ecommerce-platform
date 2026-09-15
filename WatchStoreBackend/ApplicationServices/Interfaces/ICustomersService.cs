using ApplicationDomain.Models;
using ApplicationServices.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationServices.Interfaces
{
    public interface ICustomersService
    {
        Task<List<Customers>> GetAll();
        Task<Customers> GetById(string id);
        Task<CustomersDTO> Update(string id, CustomersDTO item);
        Task<int> Delete(string id);
        Task<CustomersDTO> Create(CustomersDTO user);
    }
}
