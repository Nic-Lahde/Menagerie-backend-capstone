using System.Collections.Generic;
using System.Linq;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Menagerie.Models;
using Menagerie.Utils;

namespace Menagerie.Repositories
{

    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        public List<UserProfile> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                 SELECT Id, [Name], Email                                          
                 FROM UserProfile u                      
                 ";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        var userProfiles = new List<UserProfile>();
                        while (reader.Read())
                        {
                            userProfiles.Add(new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                                Email = DbUtils.GetString(reader, "Email"),
                            });
                        }

                        return userProfiles;
                    }
                }
            }
        }



        public UserProfile GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                 SELECT Id, [Name], Email                                           
                 FROM UserProfile u                     
                 WHERE u.Id = @id
                 ";
                    DbUtils.AddParameter(cmd, "@id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        UserProfile userProfile = null;
                        if (reader.Read())
                        {
                            userProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                                Email = DbUtils.GetString(reader, "Email"),
                            };

                        }

                        return userProfile;
                    }
                }
            }
        }

        public UserProfile GetByFirebaseId(string firebaseId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                 SELECT Id, [Name], Email, FirebaseId                                             
                 FROM UserProfile u                     
                 WHERE u.FirebaseId = @fireBaseId
                 ";
                    DbUtils.AddParameter(cmd, "@firebaseId", firebaseId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        UserProfile userProfile = null;
                        if (reader.Read())
                        {
                            userProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                                Email = DbUtils.GetString(reader, "Email"),
                                FirebaseId = DbUtils.GetString(reader, "FirebaseId")
                            };

                        }

                        return userProfile;
                    }
                }
            }
        }






        public void Add(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO UserProfile ([Name], Email, FirebaseId)
                        OUTPUT INSERTED.ID
                        VALUES (@name, @email, @firebaseId)";

                    DbUtils.AddParameter(cmd, "@firebaseId", userProfile.FirebaseId);
                    DbUtils.AddParameter(cmd, "@name", userProfile.Name);
                    DbUtils.AddParameter(cmd, "@email", userProfile.Email);

                    userProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Update(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE UserProfile
                           SET [Name] = @name,
                               Email  = @email
                         WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@name", userProfile.Name);
                    DbUtils.AddParameter(cmd, "@email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@id", userProfile.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM UserProfile WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}