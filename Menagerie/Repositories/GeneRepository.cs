using System.Collections.Generic;
using System.Linq;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Menagerie.Models;
using Menagerie.Utils;

namespace Menagerie.Repositories
{
    public class GeneRepository : BaseRepository, IGeneRepository
    {
        public GeneRepository(IConfiguration configuration) : base(configuration) { }
        public List<Gene> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT Id, [Name], IsCoDominant FROM Gene";
                    var reader = cmd.ExecuteReader();

                    var genes = new List<Gene>();

                    while (reader.Read())
                    {
                        genes.Add(new Gene()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            IsCoDominant = reader.GetBoolean(reader.GetOrdinal("IsCoDominant"))
                        });
                    }

                    reader.Close();

                    return genes;
                }
            }
        }
    }
}
