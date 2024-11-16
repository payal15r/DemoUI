using demoAPI.Data;
using demoAPI.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace demoAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class ProductController : Controller
    { public readonly MyDBContext _myDbContext;
        public ProductController(MyDBContext myDBContext)
        {
            _myDbContext = myDBContext;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            var products = await _myDbContext.Products.ToListAsync();
            return Ok(products);
        }
        [HttpPost]
        public async Task<IActionResult> AddProdcut([FromBody] Product productModel)
        {
            try
            {
                productModel.ManufacturedDate = DateTime.Now;
                await _myDbContext.Products.AddAsync(productModel);
                await _myDbContext.SaveChangesAsync();
                return Ok(productModel);
            }
            catch (Exception ex)
            {
                return Ok(productModel);
            }

        }
        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetProductById([FromRoute]int id)
        {
           var product = _myDbContext.Products.FirstOrDefaultAsync(x => x.Id == id).Result;
            if(product == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(product);

            }
        }
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateProduct([FromRoute] int id,Product productObj)
        {
            var product = await _myDbContext.Products.FindAsync(id);
            if(product == null)
            {
                return NotFound();
            }
            else
            {
                product.Name = productObj.Name;
                product.Description = productObj.Description;
                product.SKU = productObj.SKU;
                product.MRP = productObj.MRP;
                product.Currency = productObj.Currency;
                product.BasePrice = productObj.BasePrice;
                product.ExpireDate = productObj.ExpireDate;
                product.ManufacturedDate = DateTime.Now;
                _myDbContext.SaveChangesAsync();
                return Ok(product);
            }
           
        }
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteProduct([FromRoute] int id)
        {
            var product = await _myDbContext.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            else
            {
               _myDbContext.Products.Remove(product);
                await _myDbContext.SaveChangesAsync();
                return Ok(product);
            }

        }
        
    }
}
