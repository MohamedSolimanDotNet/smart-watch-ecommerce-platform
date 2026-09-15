using ApplicationServices.Interfaces;
using Azure.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace WatchStoreBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SocialAuthController : ControllerBase
    {
        private readonly ISocialAuthService _socialAuthService;

        public SocialAuthController(ISocialAuthService socialAuthService)
        {
            _socialAuthService = socialAuthService;
        }

        //[HttpGet("GoogleAuth")]
        //public async Task<IActionResult> GoogleAuth([FromQuery] string code)
        //{
        //    // Inside the Callback method
        //    var client = new HttpClient();
        //    var parameters = new Dictionary<string, string>
        //    {
        //        { "code", code },
        //        { "client_id", "YOUR_CLIENT_ID" },
        //        { "client_secret", "YOUR_CLIENT_SECRET" },
        //        { "redirect_uri", "YOUR_REDIRECT_URI" },
        //        { "grant_type", "authorization_code" }
        //    };
        //    var content = new FormUrlEncodedContent(parameters);
        //    var response = await client.PostAsync("https://oauth2.googleapis.com/token", content);
        //    var tokenResponse = await response.Content.ReadAsStringAsync();
        //    // Parse the tokenResponse to get the access token
        //    var tokenJson = JObject.Parse(tokenResponse);
        //    var accessToken = tokenJson.Value<string>("access_token");


        //    // Use the access token to fetch user information
        //    var userInfoResponse = await client.GetAsync($"https://www.googleapis.com/oauth2/v3/userinfo?access_token={accessToken}");
        //    var userInfo = await userInfoResponse.Content.ReadAsStringAsync();
        //    // Parse the userInfo JSON to get user details
        //    var userInfoJson = JObject.Parse(userInfo);
        //    //var userId = userInfoJson["sub"].ToString(); // User ID
        //    //var userEmail = userInfoJson["email"].ToString(); // User email
        //    var userName = userInfoJson["name"].ToString(); // User name

        //    var token = _socialAuthService.GenerateToken(userName);

        //    return Ok(token);
        //}

        [HttpGet("GoogleAuth/{email}")]
        public async Task<IActionResult> GoogleAuth(string email)
        {

            var token = _socialAuthService.GenerateToken(email);

            return Ok(token);
        }
    }



}
