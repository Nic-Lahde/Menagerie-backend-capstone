using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Menagerie.Models
{
    public class Pet
    {
        public int Id { get; set; }
        public int UserProfileId { get; set; }
        public string Name { get; set; }

        public string SpeciesCommon { get; set; }
        public string SpeciesLatin { get; set; }
        public string DOB { get; set; }
        public int FoodInterval { get; set; }
        public string ImageUrl { get; set; }
        public int SexId { get; set; }
        public string Sex { get; set; }
        public string Notes { get; set; }
        public bool Archive { get; set; }
        public List<Gene> Genes { get; set; }
        public List<Trait> Traits { get; set; }
        public List<Feeding> Feedings { get; set; }

    }
}
