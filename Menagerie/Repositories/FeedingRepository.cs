using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Menagerie.Models;
using Menagerie.Utils;

namespace Menagerie.Repositories
{
    public class FeedingRepository : BaseRepository, IFeedingRepository
    {
        public FeedingRepository(IConfiguration configuration) : base(configuration) { }     
        public void Add(Feeding feeding)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Feeding (PetId, Food, [Date])
                        OUTPUT INSERTED.ID
                        VALUES (@petId, @food, @date)";

                    DbUtils.AddParameter(cmd, "@petId", feeding.PetId);
                    DbUtils.AddParameter(cmd, "@food", feeding.Food);
                    DbUtils.AddParameter(cmd, "@date", feeding.Date);

                    feeding.Id = (int)cmd.ExecuteScalar();
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
                    cmd.CommandText = "DELETE FROM Feeding WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}