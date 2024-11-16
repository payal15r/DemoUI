using demoAPI.Data;
using demoAPI.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace demoAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class CategoryController : Controller
    {
        public readonly MyDBContext _myDBContext;
        public CategoryController(MyDBContext myDBContext)
        {
            _myDBContext = myDBContext;
        }
        [HttpGet]
        public async Task<IActionResult> GetCategory()
        {
            var Category = await _myDBContext.Categories.ToListAsync();
            return Ok(Category);
        }
        [HttpPost]
        public async Task<IActionResult> AddCategory([FromBody]Category category)
        {

            try
            {
                await _myDBContext.Categories.AddAsync(category);
                await _myDBContext.SaveChangesAsync();
                return Ok(category);
            }
            catch (Exception ex)
            {
                return Ok(category);
            }
        }
    }
}
