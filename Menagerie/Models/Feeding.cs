using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Menagerie.Models
{
    public class Feeding
    {
        public int Id { get; set; }
        public DateTime DateTime { get; set; }
        public string Food { get; set; }
    }
}
