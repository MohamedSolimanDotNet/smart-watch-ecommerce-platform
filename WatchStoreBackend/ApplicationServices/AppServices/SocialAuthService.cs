using ApplicationDomain.Models;
using ApplicationServices.DTO;
using ApplicationServices.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationServices.AppServices
{
    public class SocialAuthService : ISocialAuthService
    {
        public SocialAutDTO GenerateToken(string email)
        {
            var claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.Email, email));
            claims.Add(new Claim(ClaimTypes.NameIdentifier, Guid.NewGuid().ToString()));
            claims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));

            SecurityKey securityKey =
           new SymmetricSecurityKey(Encoding.UTF8.GetBytes(@"sAdRB1YwX+kAKJd3hgm9jPNd2TqjSEtMW0/9mPUE5Rc="));

            SigningCredentials signincred =
                new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            JwtSecurityToken mytoken = new JwtSecurityToken(
                    issuer: "http://localhost:5238/",//url web api
                    audience: null,//url consumer angular/reactjs
                    claims: claims,
                    expires: DateTime.UtcNow.AddDays(1),
                    signingCredentials: signincred
                );

            SocialAutDTO socialAutDTO = new SocialAutDTO();
            socialAutDTO.Token = new JwtSecurityTokenHandler().WriteToken(mytoken);
            socialAutDTO.Expiration = mytoken.ValidTo;

            return socialAutDTO;
        }
    }
}
