using ApplicationDomain.Models;
using ApplicationServices.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationServices.Interfaces
{
    public interface IWatchesService : IAppService<Watches>
    {
        Task<WatchesDTO> UpdateWatch(Guid id ,WatchesDTO item);
        Task<WatchesDTO> CreateWatch(WatchesDTO item);
    }
}
