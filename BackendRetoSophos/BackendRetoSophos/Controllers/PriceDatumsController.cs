using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackendRetoSophos.Models;

namespace BackendRetoSophos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PriceDatumsController : ControllerBase
    {
        private readonly EmpresaRandomDbContext _context;

        public PriceDatumsController(EmpresaRandomDbContext context)
        {
            _context = context;
        }

        // GET: api/PriceDatums
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PriceDatum>>> GetPriceData()
        {
            return await _context.PriceData.ToListAsync();
        }

        // GET: api/PriceDatums/id
        [HttpGet("{id}")]
        public async Task<ActionResult<PriceDatum>> GetPriceDatum(string id)
        {
            var priceDatum = await _context.PriceData.FindAsync(id);

            if (priceDatum == null)
            {
                return NotFound();
            }

            return priceDatum;
        }

        // PUT: api/PriceDatums/id
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPriceDatum(string id, PriceDatum priceDatum)
        {
            if (id != priceDatum.IdPrice)
            {
                return BadRequest();
            }

            _context.Entry(priceDatum).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PriceDatumExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/PriceDatums
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PriceDatum>> PostPriceDatum(PriceDatum priceDatum)
        {
            _context.PriceData.Add(priceDatum);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (PriceDatumExists(priceDatum.IdPrice))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetPriceDatum", new { id = priceDatum.IdPrice }, priceDatum);
        }

        private bool PriceDatumExists(string id)
        {
            return _context.PriceData.Any(e => e.IdPrice == id);
        }
    }
}
