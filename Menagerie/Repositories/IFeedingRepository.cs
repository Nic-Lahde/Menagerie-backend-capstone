using Menagerie.Models;
using System.Collections.Generic;

namespace Menagerie.Repositories
{
    public interface IFeedingRepository
    {
        void Add(Feeding feeding);
        void Delete(int id);
    }
}