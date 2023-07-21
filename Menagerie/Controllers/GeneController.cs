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
    public class GeneController: ControllerBase
    {
        private readonly IGeneRepository _geneRepository;
        public GeneController(IGeneRepository geneRepository)
        {
            _geneRepository = geneRepository;
        }
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_geneRepository.GetAll());
        }
    }
}
