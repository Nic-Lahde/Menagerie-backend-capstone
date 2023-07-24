using Menagerie.Models;
using Menagerie.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Menagerie.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedingController : ControllerBase
    {
        private readonly IFeedingRepository _feedingRepository;
        private readonly IPetRepository _petRepository;
        public FeedingController(IFeedingRepository feedingRepository, IPetRepository petRepository)
        {
            _feedingRepository = feedingRepository;
            _petRepository = petRepository;
        }   
        [HttpPost("{id}")]
        public IActionResult Create(Feeding feeding, int id)
        {
            _feedingRepository.Add(feeding);
            return Ok(_petRepository.GetAllByOwner(id));
        }
        [HttpDelete("{feedingId}/{userId}")]
        public IActionResult Delete(int feedingId, int userId)
        {
            _feedingRepository.Delete(feedingId);
            return Ok(_petRepository.GetAllByOwner(userId));
        }
    }
}