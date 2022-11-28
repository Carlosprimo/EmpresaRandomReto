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
    public class RentalDatumsController : ControllerBase
    {
        private readonly EmpresaRandomDbContext _context;

        public RentalDatumsController(EmpresaRandomDbContext context)
        {
            _context = context;
        }

        // GET: api/RentalDatums
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RentalDatum>>> GetRentalData()
        {
            return await _context.RentalData.ToListAsync();
        }

        // GET: api/RentalDatums/id
        [HttpGet("{id}")]
        public async Task<ActionResult<RentalDatum>> GetRentalDatum(string id)
        {
            var rentalDatum = await _context.RentalData.FindAsync(id);

            if (rentalDatum == null)
            {
                return NotFound();
            }

            return rentalDatum;
        }

        // POST: api/RentalDatums
        [HttpPost]
        public async Task<ActionResult<RentalDatum>> PostRentalDatum(RentalDatum rentalDatum)
        {
            _context.RentalData.Add(rentalDatum);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (RentalDatumExists(rentalDatum.IdRent))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetRentalDatum", new { id = rentalDatum.IdRent }, rentalDatum);
        }

        // GET: api/get_customer_freq
        [HttpGet("get_customer_freq")]
        public async Task<ActionResult<IEnumerable<RentalDatum>>> GetMostFreqCustomer()
        {
            var rentalData = await _context.RentalData.ToListAsync();
            var most = rentalData.GroupBy(i => i.IdUserRental).OrderByDescending(grp => grp.Count())
            .Select(grp => grp.Key);
            return StatusCode(StatusCodes.Status200OK, most);

        }

        // GET: api/most_popular_videogames
        [HttpGet("most_popular_videogames")]
        public async Task<ActionResult<IEnumerable<RentalDatum>>> GetMostPopularVideoGame()
        {
            var rentalData = await _context.RentalData.ToListAsync();
            var most = rentalData.GroupBy(i => i.IdVideoGamesRental).OrderByDescending(grp => grp.Count())
            .Select(grp => grp.Key);
            return StatusCode(StatusCodes.Status200OK, most);

        }

        private bool RentalDatumExists(string id)
        {
            return _context.RentalData.Any(e => e.IdRent == id);
        }
    }
}
