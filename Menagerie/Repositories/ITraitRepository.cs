using Menagerie.Models;
using System.Collections.Generic;

namespace Menagerie.Repositories
{
    public interface ITraitRepository
    {
        void Add(Trait trait);
        void Delete(int id);
        List<Trait> GetAll();
    }
}