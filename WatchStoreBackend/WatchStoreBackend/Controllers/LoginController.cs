using ApplicationDomain.Models;
using ApplicationServices.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace WatchStoreBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly UserManager<Customers> _manager;
        private readonly IConfiguration _configuration;

        public LoginController(UserManager<Customers> manager, IConfiguration configuration)
        {
            _manager = manager;
            _configuration = configuration;
        }

        [HttpPost]
        public async Task<ActionResult> Login(LoginDTO login)
        {
            if (ModelState.IsValid)
            {
                var user = await _manager.FindByEmailAsync(login.Email);
                if (user != null)
                {
                    var result = await _manager.CheckPasswordAsync(user, login.Password);
                    if (result)
                    {
                        var claims = new List<Claim>();
                        claims.Add(new Claim(ClaimTypes.Email, user.Email));
                        claims.Add(new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()));
                        claims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));

                        var roles = await _manager.GetRolesAsync(user);
                        foreach (var itemRole in roles)
                        {
                            claims.Add(new Claim(ClaimTypes.Role, itemRole));
                        }

                        DateTime Expiration;
                        if (login.RememberMe)
                        {
                            Expiration = DateTime.UtcNow.AddDays(15);
                        }
                        else
                        {
                            Expiration = DateTime.UtcNow.AddDays(1);
                        }

                        SecurityKey securityKey =
                            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

                        SigningCredentials signincred =
                            new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                        JwtSecurityToken mytoken = new JwtSecurityToken(
                            issuer: _configuration["JWT:ValidIssuer"],//url web api
                            audience: null,//url consumer angular/reactjs
                            claims: claims,
                            expires: Expiration,
                            signingCredentials: signincred
                            );

                        return Ok(new
                        {
                            token = new JwtSecurityTokenHandler().WriteToken(mytoken),
                            expiration = mytoken.ValidTo,
                            user.Id,
                        });
                    }
                }
                return Unauthorized();
            }
            return BadRequest(ModelState);
        }
    }
}
