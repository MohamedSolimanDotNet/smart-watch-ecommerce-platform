using ApplicationDomain.Models;
using ApplicationServices.DTO;
using ApplicationServices.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WatchStoreBackend.HelperClass;

namespace WatchStoreBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly ICustomersService _usersService;
        public CustomersController(ICustomersService usersService) 
        { 
            _usersService = usersService;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllUsers()
        {
            return Ok(await _usersService.GetAll());
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GeUserById(string id)
        {
            var user = await _usersService.GetById(id);

            if(user == null)
            {
                return BadRequest();
            }

            return Ok(user);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateUser(string id, CustomersDTO user)
        {
            var updateUser = await _usersService.Update(id, user);

            if(updateUser == null)
            {
                return BadRequest();
            }
            return Ok(updateUser);
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([Bind("UserName", "Email", "Address", "Phone", "Password", "ConfirmPassword")] CustomersDTO user)
        {
            var createUser = await _usersService.Create(user);

            if(createUser == null)
            {
                return BadRequest();
            }
            return Ok(createUser);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var deleteUser = await _usersService.Delete(id);

            if (deleteUser == 1)
            {
                return Ok(deleteUser);
            }
            return BadRequest();
        }

    }
}
