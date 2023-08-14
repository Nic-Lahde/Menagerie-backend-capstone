using Menagerie.Models;
using System.Collections.Generic;

namespace Menagerie.Repositories
{
    public interface IPetRepository
    {
        List<Pet> GetAllByOwner(int id);
        List<Pet> GetAllArchivedByOwner(int id);
        Pet GetPetById(int id);
        void Add(Pet pet);
        void Update(Pet pet);
        void Archive(int id);
        void AddGeneToPet(int petId, int geneId);
        void AddTraitToPet(int petId, decimal percentage, int traitId);
        void DeleteGeneFromPet(int id);
        void DeleteTraitFromPet(int id);
    }
}