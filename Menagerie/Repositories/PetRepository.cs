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
                 SELECT p.Id AS PetId, p.UserProfileId AS PetUserProfileId, p.[Name] AS PetName, SpeciesCommon, SpeciesLatin, DOB, FoodInterval, ImageUrl, SexId, Notes, s.Description AS Sex, g.Id AS GeneId, g.Name AS GeneName,
                        IsCoDominant, Percentage, t.Id AS TraitId, t.Name AS TraitName, Food, f.Date AS FeedingDate, pg.Id AS PetGeneId, pt.Id AS PetTraitId, f.Id AS FeedingId
                 FROM Pet p 
                 JOIN Sex s ON SexId = s.Id
                 LEFT JOIN PetGene pg ON p.Id = pg.PetId
                 LEFT JOIN Gene g ON pg.GeneId = g.Id
                 LEFT JOIN PetTrait pt ON pt.PetId = p.Id
                 LEFT JOIN Trait t ON pt.TraitId = t.Id
                 LEFT JOIN Feeding f ON f.PetId = p.Id
                 WHERE p.UserProfileId = @id AND p.Archive = 0
                 ";

                    DbUtils.AddParameter(cmd, "@id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var pets = new List<Pet>();
                        while (reader.Read())
                        {
                            var petId = DbUtils.GetInt(reader, "PetId");
                            var existingPet = pets.FirstOrDefault(p => p.Id == petId);
                            if (existingPet == null)
                            {
                                existingPet = new Pet()
                                {
                                    Id = DbUtils.GetInt(reader, "PetId"),
                                    UserProfileId = DbUtils.GetInt(reader, "PetUserProfileId"),
                                    Name = DbUtils.GetString(reader, "PetName"),
                                    SpeciesCommon = DbUtils.GetString(reader, "SpeciesCommon"),
                                    SpeciesLatin = DbUtils.GetNullableString(reader, "SpeciesLatin"),
                                    DOB = DbUtils.GetNullableString(reader, "DOB"),
                                    FoodInterval = DbUtils.GetInt(reader, "FoodInterval"),
                                    ImageUrl = DbUtils.GetNullableString(reader, "ImageUrl"),
                                    SexId = DbUtils.GetInt(reader, "SexId"),
                                    Sex = DbUtils.GetString(reader, "Sex"),
                                    Notes = DbUtils.GetString(reader, "Notes"),
                                    Feedings = new List<Feeding>(),
                                    Traits = new List<Trait>(),
                                    Genes = new List<Gene>()

                                };
                                 pets.Add(existingPet);
                            }
                            if(DbUtils.IsNotDbNull(reader, "FeedingId"))
                            {
                                existingPet.Feedings.Add(new Feeding()
                                {
                                    Id = DbUtils.GetInt(reader, "FeedingId"),
                                    DateTime = DbUtils.GetDateTime(reader, "FeedingDate"),
                                    Food = DbUtils.GetString(reader, "Food")
                                });
                            }
                            if (DbUtils.IsNotDbNull(reader, "PetGeneId"))
                            {
                                existingPet.Genes.Add(new Gene()
                                {
                                    Id = DbUtils.GetInt(reader, "GeneId"),
                                    IsCoDominant = reader.GetBoolean(reader.GetOrdinal("IsCoDominant")),
                                    Name = DbUtils.GetString(reader, "GeneName")
                                });
                            }
                            if (DbUtils.IsNotDbNull(reader, "PetTraitId"))
                            {
                                existingPet.Traits.Add(new Trait()
                                {
                                    Id = DbUtils.GetInt(reader, "TraitId"),
                                    Percentage = DbUtils.GetInt(reader, "Percentage"),
                                    Name = DbUtils.GetString(reader, "TraitName")
                                });
                            }


                        }
                        return pets;                                                                             
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