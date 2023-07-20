using Menagerie.Models;
using System.Collections.Generic;

namespace Menagerie.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        void Delete(int id);
        List<UserProfile> GetAll();
        UserProfile GetByFirebaseId(string firebaseId);
        UserProfile GetById(int id);
        void Update(UserProfile userProfile);
    }
}