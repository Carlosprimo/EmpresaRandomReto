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
    public class VideoGameDatumsController : ControllerBase
    {
        private readonly EmpresaRandomDbContext _context;

        public VideoGameDatumsController(EmpresaRandomDbContext context)
        {
            _context = context;
        }

        // GET: api/VideoGameDatums
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VideoGameDatum>>> GetVideoGameData()
        {
            return await _context.VideoGameData.ToListAsync();
        }

        // GET: api/VideoGameDatums/id
        [HttpGet("{id}")]
        public async Task<ActionResult<VideoGameDatum>> GetVideoGameDatum(string id)
        {
            var videoGameDatum = await _context.VideoGameData.FindAsync(id);

            if (videoGameDatum == null)
            {
                return NotFound();
            }

            return videoGameDatum;
        }

        // PUT: api/VideoGameDatums/id
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVideoGameDatum(string id, VideoGameDatum videoGameDatum)
        {
            if (id != videoGameDatum.IdGame)
            {
                return BadRequest();
            }

            _context.Entry(videoGameDatum).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VideoGameDatumExists(id))
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

        // POST: api/VideoGameDatums
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<VideoGameDatum>> PostVideoGameDatum(VideoGameDatum videoGameDatum)
        {
            _context.VideoGameData.Add(videoGameDatum);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (VideoGameDatumExists(videoGameDatum.IdGame))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetVideoGameDatum", new { id = videoGameDatum.IdGame }, videoGameDatum);
        }

        // DELETE: api/VideoGameDatums/id
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVideoGameDatum(string id)
        {
            var videoGameDatum = await _context.VideoGameData.FindAsync(id);
            if (videoGameDatum == null)
            {
                return NotFound();
            }

            _context.VideoGameData.Remove(videoGameDatum);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool VideoGameDatumExists(string id)
        {
            return _context.VideoGameData.Any(e => e.IdGame == id);
        }
    }
}
