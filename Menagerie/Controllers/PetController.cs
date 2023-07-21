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
        [HttpPost]
        public IActionResult Create(Pet pet)
        {
            _petRepository.Add(pet);
            return NoContent();
        }
        [HttpPut]
        public IActionResult Edit(Pet pet)
        {
            _petRepository.Update(pet);
            return Ok(_petRepository.GetAllByOwner(pet.UserProfileId));
        }
        [HttpPut("archive")]
        public IActionResult Archive(Pet pet)
        {
            _petRepository.Archive(pet.Id);
            return Ok(_petRepository.GetAllByOwner(pet.UserProfileId));
        }
        [HttpPost("AddGene/{id}")]
        public IActionResult AddGeneToPet(int id, Pet pet)
        {
            _petRepository.AddGeneToPet(pet.Id, id);
           return Ok(_petRepository.GetAllByOwner(pet.UserProfileId));
        }
    }
}
