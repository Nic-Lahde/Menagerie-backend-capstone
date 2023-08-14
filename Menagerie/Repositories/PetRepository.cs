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
                                var feedingId = DbUtils.GetInt(reader, "FeedingId");
                                if (!existingPet.Feedings.Any(feeding => feeding.Id == feedingId)) { 
                                    existingPet.Feedings.Add(new Feeding()
                                    {
                                        Id = DbUtils.GetInt(reader, "FeedingId"),
                                        Date = DbUtils.GetDateTime(reader, "FeedingDate"),
                                        Food = DbUtils.GetString(reader, "Food"),
                                        PetId = DbUtils.GetInt(reader, "PetId")
                                    });                                
                                }
                            }
                            if (DbUtils.IsNotDbNull(reader, "PetGeneId"))
                            {
                                var petGeneId = DbUtils.GetInt(reader, "PetGeneId");
                                if (!existingPet.Genes.Any(gene => gene.PetGeneId == petGeneId)) { 
                                    existingPet.Genes.Add(new Gene()
                                    {
                                        Id = DbUtils.GetInt(reader, "GeneId"),
                                        PetGeneId = DbUtils.GetInt(reader, "PetGeneId"),
                                        IsCoDominant = reader.GetBoolean(reader.GetOrdinal("IsCoDominant")),
                                        Name = DbUtils.GetString(reader, "GeneName")
                                    });
                                }
                            }
                            if (DbUtils.IsNotDbNull(reader, "PetTraitId"))
                            {
                                var petTraitId = DbUtils.GetInt(reader, "PetTraitId");
                                if (!existingPet.Traits.Any(trait => trait.PetTraitId == petTraitId)) { 
                                    existingPet.Traits.Add(new Trait()
                                    {
                                        Id = DbUtils.GetInt(reader, "TraitId"),
                                        PetTraitId = DbUtils.GetInt(reader, "PetTraitId"),
                                        Percentage = reader.GetDecimal(reader.GetOrdinal("Percentage")),
                                        Name = DbUtils.GetString(reader, "TraitName")
                                    });                              
                                }
                            }
                        }                      
                        return pets;                                                                             
                    }
                }
            }
        }
        public List<Pet> GetAllArchivedByOwner(int id)
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
                 WHERE p.UserProfileId = @id AND p.Archive = 1
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
                            if (DbUtils.IsNotDbNull(reader, "FeedingId"))
                            {
                                var feedingId = DbUtils.GetInt(reader, "FeedingId");
                                if (!existingPet.Feedings.Any(feeding => feeding.Id == feedingId))
                                {
                                    existingPet.Feedings.Add(new Feeding()
                                    {
                                        Id = DbUtils.GetInt(reader, "FeedingId"),
                                        Date = DbUtils.GetDateTime(reader, "FeedingDate"),
                                        Food = DbUtils.GetString(reader, "Food"),
                                        PetId = DbUtils.GetInt(reader, "PetId")
                                    });
                                }
                            }
                            if (DbUtils.IsNotDbNull(reader, "PetGeneId"))
                            {
                                var petGeneId = DbUtils.GetInt(reader, "PetGeneId");
                                if (!existingPet.Genes.Any(gene => gene.PetGeneId == petGeneId))
                                {
                                    existingPet.Genes.Add(new Gene()
                                    {
                                        Id = DbUtils.GetInt(reader, "GeneId"),
                                        PetGeneId = DbUtils.GetInt(reader, "PetGeneId"),
                                        IsCoDominant = reader.GetBoolean(reader.GetOrdinal("IsCoDominant")),
                                        Name = DbUtils.GetString(reader, "GeneName")
                                    });
                                }
                            }
                            if (DbUtils.IsNotDbNull(reader, "PetTraitId"))
                            {
                                var petTraitId = DbUtils.GetInt(reader, "PetTraitId");
                                if (!existingPet.Traits.Any(trait => trait.PetTraitId == petTraitId))
                                {
                                    existingPet.Traits.Add(new Trait()
                                    {
                                        Id = DbUtils.GetInt(reader, "TraitId"),
                                        PetTraitId = DbUtils.GetInt(reader, "PetTraitId"),
                                        Percentage = reader.GetDecimal(reader.GetOrdinal("Percentage")),
                                        Name = DbUtils.GetString(reader, "TraitName")
                                    });
                                }
                            }
                        }
                        return pets;
                    }
                }
            }
        }
        public Pet GetPetById(int id)
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
                WHERE p.Id = @id AND p.Archive = 0
                ";

                    DbUtils.AddParameter(cmd, "@id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        Pet pet = null;

                        while (reader.Read())
                        {
                            if (pet == null)
                            {
                                pet = new Pet()
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
                            }

                            if (DbUtils.IsNotDbNull(reader, "FeedingId"))
                            {
                                var feedingId = DbUtils.GetInt(reader, "FeedingId");
                                if (!pet.Feedings.Any(feeding => feeding.Id == feedingId))
                                {
                                    pet.Feedings.Add(new Feeding()
                                    {
                                        Id = DbUtils.GetInt(reader, "FeedingId"),
                                        Date = DbUtils.GetDateTime(reader, "FeedingDate"),
                                        Food = DbUtils.GetString(reader, "Food"),
                                        PetId = DbUtils.GetInt(reader, "PetId")
                                    });
                                }
                            }
                            if (DbUtils.IsNotDbNull(reader, "PetGeneId"))
                            {
                                var petGeneId = DbUtils.GetInt(reader, "PetGeneId");
                                if (!pet.Genes.Any(gene => gene.PetGeneId == petGeneId))
                                {
                                    pet.Genes.Add(new Gene()
                                    {
                                        Id = DbUtils.GetInt(reader, "GeneId"),
                                        PetGeneId = DbUtils.GetInt(reader, "PetGeneId"),
                                        IsCoDominant = reader.GetBoolean(reader.GetOrdinal("IsCoDominant")),
                                        Name = DbUtils.GetString(reader, "GeneName")
                                    });
                                }
                            }
                            if (DbUtils.IsNotDbNull(reader, "PetTraitId"))
                            {
                                var petTraitId = DbUtils.GetInt(reader, "PetTraitId");
                                if (!pet.Traits.Any(trait => trait.PetTraitId == petTraitId))
                                {
                                    pet.Traits.Add(new Trait()
                                    {
                                        Id = DbUtils.GetInt(reader, "TraitId"),
                                        PetTraitId = DbUtils.GetInt(reader, "PetTraitId"),
                                        Percentage = reader.GetDecimal(reader.GetOrdinal("Percentage")),
                                        Name = DbUtils.GetString(reader, "TraitName")
                                    });
                                }
                            }
                        }

                        return pet;
                    }
                }
            }
        }

        public void Add(Pet pet)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Pet (UserProfileId, [Name], SpeciesCommon, SpeciesLatin, DOB, FoodInterval, ImageUrl, SexId, Notes, Archive)
                        OUTPUT INSERTED.ID
                        VALUES (@userProfileId, @name, @speciesCommon, @speciesLatin, @dOB, @foodInterval, @imageUrl, @sexId, @notes, 0)";

                    DbUtils.AddParameter(cmd, "@userProfileId", pet.UserProfileId);
                    DbUtils.AddParameter(cmd, "@name", pet.Name);
                    DbUtils.AddParameter(cmd, "@speciesCommon", pet.SpeciesCommon);
                    DbUtils.AddParameter(cmd, "@speciesLatin", pet.SpeciesLatin);
                    DbUtils.AddParameter(cmd, "@dOB", pet.DOB);
                    DbUtils.AddParameter(cmd, "@foodInterval", pet.FoodInterval);
                    DbUtils.AddParameter(cmd, "@imageUrl", pet.ImageUrl);
                    DbUtils.AddParameter(cmd, "@sexId", pet.SexId);
                    DbUtils.AddParameter(cmd, "@notes", pet.Notes);


                    pet.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Update(Pet pet)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                UPDATE Pet
                SET
                    [Name] = @name,
                    SpeciesCommon = @speciesCommon,
                    SpeciesLatin = @speciesLatin,
                    DOB = @dOB,
                    FoodInterval = @foodInterval,
                    ImageUrl = @imageUrl,
                    SexId = @sexId,
                    Notes = @notes
                WHERE
                    Id = @id";

                    DbUtils.AddParameter(cmd, "@id", pet.Id);
                    DbUtils.AddParameter(cmd, "@name", pet.Name);
                    DbUtils.AddParameter(cmd, "@speciesCommon", pet.SpeciesCommon);
                    DbUtils.AddParameter(cmd, "@speciesLatin", pet.SpeciesLatin);
                    DbUtils.AddParameter(cmd, "@dOB", pet.DOB);
                    DbUtils.AddParameter(cmd, "@foodInterval", pet.FoodInterval);
                    DbUtils.AddParameter(cmd, "@imageUrl", pet.ImageUrl);
                    DbUtils.AddParameter(cmd, "@sexId", pet.SexId);
                    DbUtils.AddParameter(cmd, "@notes", pet.Notes);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Archive(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                UPDATE Pet
                SET
                    [Archive] = 1
                WHERE
                    Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);          

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void AddGeneToPet(int petId, int geneId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO PetGene (PetId, GeneId)
                        VALUES (@petId, @geneId)";

                    DbUtils.AddParameter(cmd, "@petId", petId);
                    DbUtils.AddParameter(cmd, "@geneId", geneId);



                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void AddTraitToPet(int petId, decimal percentage, int traitId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO PetTrait (PetId, TraitId, [Percentage])
                        VALUES (@petId, @traitId, @percentage)";

                    DbUtils.AddParameter(cmd, "@petId", petId);
                    DbUtils.AddParameter(cmd, "@traitId", traitId);
                    DbUtils.AddParameter(cmd, "@percentage", percentage);



                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void DeleteGeneFromPet(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM PetGene WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void DeleteTraitFromPet(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM PetTrait WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}