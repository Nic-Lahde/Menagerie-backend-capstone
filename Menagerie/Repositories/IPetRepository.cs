using Menagerie.Models;
using System.Collections.Generic;

namespace Menagerie.Repositories
{
    public interface IPetRepository
    {
        List<Pet> GetAllByOwner(int id);
    }
}