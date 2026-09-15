using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationDomain.Models
{
    public class CustomerRoles : IdentityRole<Guid>
    {
        public string UsersRoleName { get; set; }
    }
}
