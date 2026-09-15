using ApplicationDomain.Models;
using ApplicationServices.DTO;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationServices.AutoMapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Customers,CustomersDTO>().ReverseMap();
            CreateMap<CustomerRoles, IdentityRole>().ReverseMap().ForMember(s => s.UsersRoleName, s => s.MapFrom(s => s.Name));
            CreateMap<Watches, WatchesDTO>().ReverseMap();
        }
    }
}
