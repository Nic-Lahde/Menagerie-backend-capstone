using Menagerie.Models;
using System.Collections.Generic;

namespace Menagerie.Repositories
{
    public interface IGeneRepository
    {
        List<Gene> GetAll();
    }
}