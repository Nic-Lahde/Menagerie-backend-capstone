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
    public class PetController : ControllerBase
    {
        private readonly IPetRepository _petRepository;
        // GET: api/<ValuesController>
        public PetController(IPetRepository petRepository)
        {
            _petRepository = petRepository;
        }
        [Authorize]
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {  
            return Ok(_petRepository.GetAllByOwner(id));
        }
        [Authorize]
        [HttpPost]
        public IActionResult Create(Pet pet)
        {
            _petRepository.Add(pet);
            return NoContent();
        }
        [Authorize]
        [HttpPut]
        public IActionResult Edit(Pet pet)
        {
            _petRepository.Update(pet);
            return Ok(_petRepository.GetPetById(pet.Id));
        }
        [Authorize]
        [HttpPut("archive")]
        public IActionResult Archive(Pet pet)
        {
            _petRepository.Archive(pet.Id);
            return Ok(_petRepository.GetAllByOwner(pet.UserProfileId));
        }
        [Authorize]
        [HttpPost("AddGene/{id}")]
        public IActionResult AddGeneToPet(int id, Pet pet)
        {
            _petRepository.AddGeneToPet(pet.Id, id);
           return Ok(_petRepository.GetPetById(pet.Id));
        }
        [Authorize]
        [HttpPost("AddTrait/{id}/{percentage}")]
        public IActionResult AddTraitToPet(int id, int percentage, Pet pet)
        {
            _petRepository.AddTraitToPet(pet.Id, percentage, id);
            return Ok(_petRepository.GetPetById(pet.Id));
        }
        [Authorize]
        [HttpDelete("RemoveGene/{petGeneId}/{petId}")]
        public IActionResult DeleteGeneFromPet(int petGeneId, int petId)
        {
            _petRepository.DeleteGeneFromPet(petGeneId);
            return Ok(_petRepository.GetPetById(petId));
        }
        [Authorize]
        [HttpDelete("RemoveTrait/{petTraitId}/{petId}")]
        public IActionResult DeleteTraitFromPet(int petTraitId, int petId)
        {
            _petRepository.DeleteTraitFromPet(petTraitId);
            return Ok(_petRepository.GetPetById(petId));
        }
    }
}
