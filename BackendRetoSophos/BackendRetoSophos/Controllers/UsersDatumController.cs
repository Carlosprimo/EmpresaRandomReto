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
    public class UsersDatumController : ControllerBase
    {
        private readonly EmpresaRandomDbContext _context;

        public UsersDatumController(EmpresaRandomDbContext context)
        {
            _context = context;
        }

        // GET: api/UsersDatum
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UsersDatum>>> GetUsersData()
        {
            return await _context.UsersData.ToListAsync();
        }

        // GET: api/UsersDatum/id
        [HttpGet("{id}")]
        public async Task<ActionResult<UsersDatum>> GetUsersDatum(string id)
        {
            var usersDatum = await _context.UsersData.FindAsync(id);

            if (usersDatum == null)
            {
                return NotFound();
            }

            return usersDatum;
        }

        // PUT: api/UsersDatum/id
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsersDatum(string id, UsersDatum usersDatum)
        {
            if (id != usersDatum.IdUser)
            {
                return BadRequest();
            }

            _context.Entry(usersDatum).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsersDatumExists(id))
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

        // POST: api/UsersDatum
        [HttpPost]
        public async Task<ActionResult<UsersDatum>> PostUsersDatum(UsersDatum usersDatum)
        {
            _context.UsersData.Add(usersDatum);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (UsersDatumExists(usersDatum.IdUser))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetUsersDatum", new { id = usersDatum.IdUser }, usersDatum);
        }

        // DELETE: api/UsersDatum/id
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsersDatum(string id)
        {
            var usersDatum = await _context.UsersData.FindAsync(id);
            if (usersDatum == null)
            {
                return NotFound();
            }

            _context.UsersData.Remove(usersDatum);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UsersDatumExists(string id)
        {
            return _context.UsersData.Any(e => e.IdUser == id);
        }
    }
}
