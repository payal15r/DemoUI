using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace demoAPI.Model
{
    public class Product
    {
        [Column("Id")]
        public int Id { get;set;}
        public string Name { get;set;}
        public int BasePrice {get;set;}
        [MaxLength(6)]
        public string SKU { get;set; }
        public int MRP { get;set; }
        public string Description { get;set;}
        [ForeignKey("CategoryId")]
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public int Currency {  get;set;}
        public DateTime ManufacturedDate { get;set;}
        public DateTime ExpireDate { get;set; }
    }
}
