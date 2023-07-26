using Menagerie.Models;
using Menagerie.Repositories;
using Microsoft.AspNetCore.Authorization;
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
        [Authorize]
        [HttpPost("{petId}")]
        public IActionResult Create(Feeding feeding, int petId)
        {
            _feedingRepository.Add(feeding);
            return Ok(_petRepository.GetPetById(petId));
        }
        [Authorize]
        [HttpDelete("{feedingId}/{petId}")]
        public IActionResult Delete(int feedingId, int petId)
        {
            _feedingRepository.Delete(feedingId);
            return Ok(_petRepository.GetPetById(petId));
        }
    }
}