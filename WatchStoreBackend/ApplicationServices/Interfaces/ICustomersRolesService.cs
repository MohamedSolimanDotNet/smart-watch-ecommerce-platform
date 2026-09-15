using ApplicationDomain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationServices.Interfaces
{
    public interface ICustomersRolesService
    {
        Task<List<CustomerRoles>> GetAllRoles();
        Task<CustomerRoles> GetRoleById(string id);
        Task<CustomerRoles> CreateRole(CustomerRoles role);
        Task<CustomerRoles> UpdateRole(string id, CustomerRoles role);
        Task<CustomerRoles> DeleteRole(string id);
    }
}
