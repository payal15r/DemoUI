using demoAPI.Model;
using Microsoft.EntityFrameworkCore;

namespace demoAPI.Data
{
    public class MyDBContext :DbContext
    {   
        public MyDBContext(DbContextOptions options): base(options) 
        { }    
        public DbSet<Product>  Products { get; set; }
        public DbSet<Category>  Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>()
                .HasOne(p => p.Category)
                .WithMany()
                .HasForeignKey(p => p.CategoryId)
                .OnDelete(DeleteBehavior.Cascade); 
        }
    }
}
