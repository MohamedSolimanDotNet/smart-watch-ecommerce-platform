using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using ApplicationDomain.CustomerBaseEntity;

namespace ApplicationServices.DTO
{
    public class WatchesDTO
    {
        [Required]
        public string Statuses { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Price { get; set; }
        [Required]
        public string Description { get; set; }
        public string? ProductPath { get; set; }

        public string? ProductUrl { get; set; }

        [NotMapped, Required]
        public IFormFile Image { get; set; }
    }
}
