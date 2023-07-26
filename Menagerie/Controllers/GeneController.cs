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
    public class GeneController: ControllerBase
    {
        private readonly IGeneRepository _geneRepository;
        public GeneController(IGeneRepository geneRepository)
        {
            _geneRepository = geneRepository;
        }
        [Authorize]
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_geneRepository.GetAll());
        }
        [Authorize]
        [HttpPost]
        public IActionResult Create(Gene gene)
        {
            _geneRepository.Add(gene);
            return Ok(_geneRepository.GetAll());
        }
        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _geneRepository.Delete(id);
            return Ok(_geneRepository.GetAll());
        }
    }
}
