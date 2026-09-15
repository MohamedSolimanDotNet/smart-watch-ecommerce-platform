using ApplicationDomain.CustomerBaseEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationDomain.Models
{
    public class Watches : BaseEntity
    {
        public Guid Id { get; set; }
        public string Statuses { get; set; }
        public string Title { get; set; }
        public string Price { get; set; }
        public string Description { get; set; }

        public string ProductPath { get; set; }

        public string ProductUrl { get; set; }
    }
}
