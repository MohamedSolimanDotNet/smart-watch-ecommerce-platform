using ApplicationDomain.Models;
using ApplicationServices.DTO;
using ApplicationServices.Interfaces;
using ApplicationServices.AppServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WatchStoreBackend.HelperClass;
using Microsoft.AspNetCore.Authorization;

namespace WatchStoreBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class CustomersRolesController : ControllerBase
    {
        private readonly ICustomersRolesService _usersRoleService;

        public CustomersRolesController(ICustomersRolesService usersRoleService)
        {
            _usersRoleService = usersRoleService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsersRole()
        {
            return Ok(await _usersRoleService.GetAllRoles());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GeUserById(string id)
        {
            var role = await _usersRoleService.GetRoleById(id);

            if (role == null)
            {
                return BadRequest();
            }
            return Ok(role);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(string id, CustomerRoles user)
        {
            var updateRole = await _usersRoleService.UpdateRole(id, user);

            if (updateRole == null)
            {
                return BadRequest();
            }
            return Ok(updateRole);
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser(CustomerRoles user)
        {
            var createRole = await _usersRoleService.CreateRole(user);
            if (createRole == null)
            {
                return BadRequest();
            }
            return Ok(createRole);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRole(string id)
        {
            var deleteRole = await _usersRoleService.DeleteRole(id);

            if(deleteRole == null)
            {
                return BadRequest();
            }
            return Ok(deleteRole);
        }

    }
}
