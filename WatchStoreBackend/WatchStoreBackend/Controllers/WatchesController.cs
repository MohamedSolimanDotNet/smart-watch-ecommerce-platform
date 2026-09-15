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
    public class WatchesController : ControllerBase
    {
        private readonly IWatchesService _watchesService;

        public WatchesController(IWatchesService watchesService)
        {
            _watchesService = watchesService;
        }

        [HttpGet]
        public IActionResult GetAllWatches()
        {

            return Ok(_watchesService.GetAll());
        }

        [HttpGet("{id}"), Authorize]
        public IActionResult GetById(Guid id)
        {
            var watch = _watchesService.GetById(id);
            if (watch == null)
            {
                return BadRequest();
            }
            return Ok(watch);
        }


        [HttpPut("{id}"), Authorize]
        public async Task<IActionResult> UpdateUser(Guid id ,WatchesDTO item)
        {
            var updateWatch = await _watchesService.UpdateWatch(id, item);

            if(updateWatch == null)
            {
                return BadRequest();    
            }
            return Ok(updateWatch);
        }


        [HttpPost, Authorize]
        public async Task<IActionResult> Create(WatchesDTO item)
        {
            var createWatch = await _watchesService.CreateWatch(item);
            if(createWatch == null)
            {
                return BadRequest();
            }
            return Ok(createWatch);
        }


        [HttpDelete("{id}"), Authorize]
        public IActionResult Delete(Guid id)
        {
            var delete = _watchesService.Delete(id);

            if (delete == 1)
            {
                return Ok(delete);
            }
            return BadRequest();
        }

    }
}
