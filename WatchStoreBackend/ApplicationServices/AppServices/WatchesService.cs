using ApplicationDomain.Models;
using ApplicationDomain.Repositories;
using ApplicationServices.DTO;
using ApplicationServices.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace ApplicationServices.AppServices
{
    public class WatchesService : IWatchesService
    {
        private readonly IWebHostEnvironment _environment;
        private readonly IConfiguration _Configuration;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<Watches> _watchesRepository;
        private readonly IMapper _mapper;

        public WatchesService(IWebHostEnvironment environment, IConfiguration configuration, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _environment = environment;
            _Configuration = configuration;
            _unitOfWork = unitOfWork;
            _watchesRepository = unitOfWork.GetRepository<Watches>();
            _mapper = mapper;
        }

        public Task<WatchesDTO> CreateWatch(WatchesDTO item)
        {
            if (item.Image != null && item.Image.Length > 0)
            {
                string[] allowedExtensions = { ".png", ".jpg" };
                string fileExtension = Path.GetExtension(item.Image.FileName);

                if (allowedExtensions.Contains(fileExtension, StringComparer.OrdinalIgnoreCase))
                {
                    string uploadsFolder = Path.Combine(_environment.WebRootPath, "Uploads");
                    string uniqueFileName = Guid.NewGuid().ToString() + "_" + item.Image.FileName;
                    string filePath = Path.Combine(uploadsFolder, uniqueFileName);

                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        item.Image.CopyTo(fileStream);
                    }

                    item.ProductPath = uploadsFolder + "\\" + uniqueFileName;
                    item.ProductUrl = _Configuration["JWT:ValidIssuer"] + "/Uploads/" + uniqueFileName;

                    _watchesRepository.Add(_mapper.Map<Watches>(item));
                    _unitOfWork.SaveChanges();

                    return Task.FromResult(item);
                }

                return null;
            }
            else
            {
                return null;
            }
        }

        public int Delete(Guid id)
        {
            var item = GetById(id);

            if(item != null)
            {
                string path = item.ProductPath;

                if (System.IO.File.Exists(path))
                {
                    System.IO.File.Delete(path);
                }
                _watchesRepository.Delete(item);
                _unitOfWork.SaveChanges();
                return 1;

            }
            return 0;
        }

        public List<Watches> GetAll()
        {
            return _watchesRepository.GetListItems().ToList();
        }

        public List<Watches> GetAllByParentId(Guid id)
        {
            return _watchesRepository.GetListItems(w => w.CreatedBy == id).ToList();
        }

        public Watches GetById(Guid id)
        {
            return _watchesRepository.Find(id);
        }

        public Task<WatchesDTO> UpdateWatch(Guid id ,WatchesDTO item)
        {
            var oldProduct = GetById(id);

            if (oldProduct != null)
            {
                if (item.Image != null && item.Image.Length > 0)
                {
                    string path = oldProduct.ProductPath;

                    if (System.IO.File.Exists(path))
                    {
                        System.IO.File.Delete(path);
                    }

                    string uploadsFolder = Path.Combine(_environment.WebRootPath, "Uploads");
                    string uniqueFileName = Guid.NewGuid().ToString() + "_" + item.Image.FileName;
                    string filePath = Path.Combine(uploadsFolder, uniqueFileName);

                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        item.Image.CopyTo(fileStream);
                    }

                    oldProduct.Price = item.Price;
                    oldProduct.Description = item.Description;
                    oldProduct.Title = item.Title;
                    oldProduct.Statuses = item.Statuses;
                    oldProduct.ProductPath = uploadsFolder + "\\" + uniqueFileName;
                    oldProduct.ProductUrl = _Configuration["JWT:ValidIssuer"] + "/Uploads/" + uniqueFileName;
                   
                    _watchesRepository.Update(oldProduct);
                    _unitOfWork.SaveChanges();

                    return Task.FromResult(item);
                }
                else
                {
                    return null;
                }
            }
            return null;
        }

        public Task<Watches> Update(Watches item)
        {
            throw new NotImplementedException();
        }

        public Task<Watches> Create(Watches item)
        {
            throw new NotImplementedException();
        }

    }
}
