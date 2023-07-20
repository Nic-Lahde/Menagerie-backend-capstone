using System.Collections.Generic;
using System.Linq;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Menagerie.Models;
using Menagerie.Utils;

namespace Menagerie.Repositories
{

    public class PetRepository : BaseRepository, IPetRepository
    {
        public PetRepository(IConfiguration configuration) : base(configuration) { }

        public List<Pet> GetAllByOwner(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                 SELECT p.Id AS PetId, p.[Name] AS PetName, SpeciesCommon, SpeciesLatin, DOB, FoodInterval, ImageUrl, SexId, Notes, s.Description AS Sex, g.Name AS GeneName,
                        IsCoDominant, Percentage, t.Name, Food, f.Date AS FeedingDate
                 FROM Pet p 
                 JOIN Sex s ON SexId = Sex.Id
                 JOIN PetGene pg ON p.Id = pg.PetId
                 JOIN Gene g ON pg.GeneId = g.Id
                 JOIN PetTrait pt ON pt.PetId = p.Id
                 JOIN Trait t ON pt.TraitId = t.Id
                 JOIN Feeding f ON f.PetId = p.Id
                 WHERE p.UserProfileId = @id AND p.Archive = false
                 ";

                    DbUtils.AddParameter(cmd, "@id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        var userProfiles = new List<Pet>();
                        while (reader.Read())
                        {
                            userProfiles.Add(new Pet()
                            {
                                Id = DbUtils.GetInt(reader, "PetId"),
                                Name = DbUtils.GetString(reader, "PetName"),
                                SpeciesCommon = DbUtils.GetString(reader, "SpeciesCommon"),
                                SpeciesLatin = DbUtils.GetString(reader, "SpeciesLatin"),
                                DOB = DbUtils.GetString(reader, "DOB"),
                                FoodInterval = DbUtils.GetInt(reader, "FoodInterval"),
                            });
                        }

                        return userProfiles;
                    }
                }
            }
        }



        //public Pet GetById(int id)
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"
        //         SELECT Id, [Name], Email                                           
        //         FROM Pet u                     
        //         WHERE u.Id = @id
        //         ";
        //            DbUtils.AddParameter(cmd, "@id", id);

        //            using (SqlDataReader reader = cmd.ExecuteReader())
        //            {

        //                Pet userProfile = null;
        //                if (reader.Read())
        //                {
        //                    userProfile = new Pet()
        //                    {
        //                        Id = DbUtils.GetInt(reader, "Id"),
        //                        Name = DbUtils.GetString(reader, "Name"),
        //                        Email = DbUtils.GetString(reader, "Email"),
        //                    };

        //                }

        //                return userProfile;
        //            }
        //        }
        //    }
        //}







        //public void Add(Pet userProfile)
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"
        //                INSERT INTO Pet ([Name], Email, DateCreated, ImageUrl)
        //                OUTPUT INSERTED.ID
        //                VALUES (@name, @email, @dateCreated, @imageUrl)";

        //            DbUtils.AddParameter(cmd, "@name", userProfile.Name);
        //            DbUtils.AddParameter(cmd, "@email", userProfile.Email);

        //            userProfile.Id = (int)cmd.ExecuteScalar();
        //        }
        //    }
        //}
        //public void Update(Pet userProfile)
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"
        //                UPDATE Pet
        //                   SET [Name] = @name,
        //                       Email  = @email
        //                 WHERE Id = @id";

        //            DbUtils.AddParameter(cmd, "@name", userProfile.Name);
        //            DbUtils.AddParameter(cmd, "@email", userProfile.Email);
        //            DbUtils.AddParameter(cmd, "@id", userProfile.Id);

        //            cmd.ExecuteNonQuery();
        //        }
        //    }
        //}

        //public void Archive(int id)
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = "DELETE FROM Pet WHERE Id = @Id";
        //            DbUtils.AddParameter(cmd, "@id", id);
        //            cmd.ExecuteNonQuery();
        //        }
        //    }
        //}
    }
}