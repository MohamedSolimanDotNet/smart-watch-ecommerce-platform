using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationDomain.Models
{
    public class Customers : IdentityUser<Guid>
    {
        public string Address { get; set; }
        public string? RoleName { get; set; }
    }
}
