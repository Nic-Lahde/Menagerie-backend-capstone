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
        public List<Gene> DisplayGenes
        {
            get
            {
                List<Gene> processedGenes = new List<Gene>();
                var geneGroups = Genes.GroupBy(g => g.Name).ToList();

                foreach (var geneGroup in geneGroups)
                {
                    int geneCount = geneGroup.Count();
                    bool isCodominant = geneGroup.First().IsCoDominant;
                    string geneName = geneGroup.First().Name;

                    if (geneCount > 1 && isCodominant)
                    {
                        processedGenes.Add(new Gene
                        {
                            Id = geneGroup.First().Id,
                            PetGeneId = geneGroup.First().PetGeneId,
                            Name = $"{geneName} (Super)"
                        });
                    }
                    else if (geneCount > 1 && !isCodominant)
                    {
                        processedGenes.Add(new Gene
                        {
                            Id = geneGroup.First().Id,
                            PetGeneId = geneGroup.First().PetGeneId,
                            Name = $"{geneName} (Visual)"
                        });
                    }
                    else if (geneCount == 1 && !isCodominant)
                    {
                        processedGenes.Add(new Gene
                        {
                            Id = geneGroup.First().Id,
                            PetGeneId = geneGroup.First().PetGeneId,
                            Name = $"{geneName} (Het)"
                        });
                    }
                    else if (geneCount == 1 && isCodominant)
                    {
                        processedGenes.Add(new Gene
                        {
                            Id = geneGroup.First().Id,
                            PetGeneId = geneGroup.First().PetGeneId,
                            Name = geneName
                        });
                    }
                }

                return processedGenes;
            }

        }
    }
}
