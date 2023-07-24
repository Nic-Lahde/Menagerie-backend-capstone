using Menagerie.Models;
using System.Collections.Generic;

namespace Menagerie.Repositories
{
    public interface IGeneRepository
    {
        List<Gene> GetAll();
        void Add(Gene gene);
        void Delete(int id);
    }
}