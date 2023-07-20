using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Menagerie.Models
{
    public class Gene
    {
        public int Id { get; set; }
        public bool IsCoDominant { get; set; }
        public string Name { get; set; }
    }
}
