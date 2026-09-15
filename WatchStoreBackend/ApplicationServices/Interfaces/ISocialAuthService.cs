using ApplicationServices.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationServices.Interfaces
{
    public interface ISocialAuthService
    {
        public SocialAutDTO GenerateToken(string userInfo);
    }
}
