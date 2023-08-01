using System.Collections.Generic;
using System.Linq;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Menagerie.Models;
using Menagerie.Utils;

namespace Menagerie.Repositories
{
    public class TraitRepository : BaseRepository, ITraitRepository
    {
        public TraitRepository(IConfiguration configuration) : base(configuration) { }
        public List<Trait> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT Id, [Name] FROM Trait ORDER BY [Name]";
                    var reader = cmd.ExecuteReader();

                    var traits = new List<Trait>();

                    while (reader.Read())
                    {
                        traits.Add(new Trait()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name"))
                        });
                    }

                    reader.Close();

                    return traits;
                }
            }
        }
        public void Add(Trait trait)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Trait ([Name])
                        OUTPUT INSERTED.ID
                        VALUES (@name)";

                    DbUtils.AddParameter(cmd, "@name", trait.Name);

                    trait.Id = (int)cmd.ExecuteScalar();
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
                    cmd.CommandText = "DELETE FROM Trait WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
