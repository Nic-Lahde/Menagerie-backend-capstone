using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Menagerie.Models
{
    public class Trait
    {
        public int Id { get; set; }
        public int PetTraitId { get; set; }
        public decimal Percentage { get; set; }
        public string Name { get; set; }
    }
}
