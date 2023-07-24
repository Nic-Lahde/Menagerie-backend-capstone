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
    public class TraitController : ControllerBase
    {
        private readonly ITraitRepository _traitRepository;
        public TraitController(ITraitRepository traitRepository)
        {
            _traitRepository = traitRepository;
        }
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_traitRepository.GetAll());
        }
        [HttpPost]
        public IActionResult Create(Trait trait)
        {
            _traitRepository.Add(trait);
            return Ok(_traitRepository.GetAll());
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _traitRepository.Delete(id);
            return Ok(_traitRepository.GetAll());
        }
    }
}