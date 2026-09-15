using ApplicationDomain.Models;
using ApplicationServices.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationServices.AppServices
{
    public class CustomersRolesService : ICustomersRolesService
    {
        private readonly RoleManager<CustomerRoles> _roleManager;
        private readonly IMapper _mapper;

        public CustomersRolesService(RoleManager<CustomerRoles> roleManager, IMapper mapper)
        {
            _roleManager = roleManager;
            _mapper = mapper;
        }

        public async Task<CustomerRoles> CreateRole(CustomerRoles role)
        {
            if (role != null)
            {
                IdentityResult result = await _roleManager.CreateAsync(role);
                if (result.Succeeded)
                {
                    return role;
                }
            }
            return null;
        }

        public async Task<CustomerRoles> DeleteRole(string id)
        {
            var role = await _roleManager.FindByIdAsync(id);

            if (role != null)
            {
                IdentityResult result = await _roleManager.DeleteAsync(role);

                if (result.Succeeded)
                {
                    return _mapper.Map<CustomerRoles>(role);
                }
            }
            return null;
        }

        public async Task<List<CustomerRoles>> GetAllRoles()
        {
            return _mapper.Map<List<CustomerRoles>>(await _roleManager.Roles.ToListAsync());
        }

        public async Task<CustomerRoles> GetRoleById(string id)
        {
            var role = await _roleManager.FindByIdAsync(id);

            if(role != null)
            {
                return _mapper.Map<CustomerRoles>(await _roleManager.Roles.ToListAsync());
            }
            return null;

        }

        public async Task<CustomerRoles> UpdateRole(string id, CustomerRoles role)
        {
            var findRole = await _roleManager.FindByIdAsync(id);

            if (findRole != null)
            {
                findRole.Name = role.UsersRoleName;
                var result = await _roleManager.UpdateAsync(findRole);
                if (result.Succeeded)
                {
                    return _mapper.Map<CustomerRoles>(findRole);
                }
            }
            return null;
        }
    }
}
