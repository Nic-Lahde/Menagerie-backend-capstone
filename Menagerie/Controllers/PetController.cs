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
    public class PetController : ControllerBase
    {
        private readonly IPetRepository _petRepository;
        // GET: api/<ValuesController>
        public PetController(IPetRepository petRepository)
        {
            _petRepository = petRepository;
        }
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_petRepository.GetAllByOwner(id));
        }

      
    }
}
