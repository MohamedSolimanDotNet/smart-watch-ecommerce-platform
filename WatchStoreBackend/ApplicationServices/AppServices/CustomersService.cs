using ApplicationDomain.Models;
using ApplicationDomain.Repositories;
using ApplicationServices.AutoMapper;
using ApplicationServices.DTO;
using ApplicationServices.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Win32;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationServices.AppServices
{
    public class CustomersService : ICustomersService
    {
        private readonly UserManager<Customers> _manager;
        private readonly RoleManager<CustomerRoles> _roleManager;
        private readonly IMapper _mapper;
        public CustomersService(UserManager<Customers> manager, IMapper mapper, RoleManager<CustomerRoles> roleManager) 
        {
            _manager = manager;
            _mapper = mapper;
            _roleManager = roleManager;
        }

        public async Task<CustomersDTO> Create(CustomersDTO user)
        {
            var findEmail = await _manager.FindByEmailAsync(user.Email);

            if (findEmail == null)
            {

                Customers newUser = new Customers();
                newUser.Id = Guid.NewGuid();
                newUser.UserName = user.UserName;
                newUser.Email = user.Email;
                newUser.Address = user.Address;
                newUser.PhoneNumber = user.Phone;
                newUser.RoleName = user.RoleName;

                var result = await _manager.CreateAsync(newUser, user.Password);

                if (result.Succeeded)
                {
                    return user;
                }
            }
            return null;
        }

        public async Task<int> Delete(string id)
        {
            var user = await _manager.FindByIdAsync(id);
            if (user != null)
            {
                await _manager.DeleteAsync(user);
                return 1;
            }
            return 0;
        }

        public async Task<Customers> GetById(string id)
        {
            return await _manager.FindByIdAsync(id);
        }

        public async Task<List<Customers>> GetAll()
        {
            return await _manager.Users.ToListAsync();
        }

        public async Task<CustomersDTO> Update(string id, CustomersDTO customer)
        {
            //find email will update it
            var user = await _manager.FindByIdAsync(id);

            if (user != null)
            {
                //check if there is an email like return from user in database or not
                var findEmail = await _manager.FindByEmailAsync(customer.Email);

                if (findEmail == null)
                {
                    // remove old password
                    var RemoveResult = await _manager.RemovePasswordAsync(user);

                    if (RemoveResult.Succeeded)
                    {
                        // add new password
                        var AddResult = await _manager.AddPasswordAsync(user, customer.Password);
                        if (AddResult.Succeeded)
                        {
                            user.UserName = customer.UserName;
                            user.Email = customer.Email;
                            user.Address = customer.Address;
                            user.PhoneNumber = customer.Phone;
                            user.RoleName = customer.RoleName;

                            // update data
                            await _manager.UpdateAsync(user);
                            return customer;
                        }

                    }

                }
                else
                {
                    //check first if the email follow to that user or not
                    if (user.Email == customer.Email)
                    {
                        // remove old password
                        var RemoveResult = await _manager.RemovePasswordAsync(user);

                        if (RemoveResult.Succeeded)
                        {
                            // add new password
                            var AddResult = await _manager.AddPasswordAsync(user, customer.Password);
                            if (AddResult.Succeeded)
                            {
                                user.UserName = customer.UserName;
                                user.Email = customer.Email;
                                user.Address = customer.Address;
                                user.PhoneNumber = customer.Phone;
                                user.RoleName = customer.RoleName;

                                // update data
                                await _manager.UpdateAsync(user);
                                return customer;
                            }

                        }
                    }
                }
            }
            return null;
        
        }
    }
}
