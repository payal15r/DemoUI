import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../../Services/products.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editproduct',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editproduct.component.html',
  styleUrl: './editproduct.component.scss'
})
export class EditproductComponent implements OnInit {
  constructor(private route: ActivatedRoute, public productService: ProductsService, private router: Router) {

  }
  productDetails = {
    Id: 0,
    Name: '',
    BasePrice: 0,
    SKU: '',
    MRP: 0,
    Description: '',
    CategoryId: 0,
    Category: {
      CategoryId: 0,
      CategoryName: '',
      IsActive: false
    },
    Currency: 0,
    ManufacturedDate: '',
    ExpireDate: ''
  }
  selectedCategoryId: number = 0;
  Category = [
    { CategoryId: 1, CategoryName: 'Electronics' },
    { CategoryId: 2, CategoryName: 'Mobile' },
    { CategoryId: 3, CategoryName: 'Laptop' }
  ];

  SKU_lable: string = "";

  today: string = '';
  ngOnInit(): void {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    this.today = `${year}-${month}-${day}`;
    this.route.paramMap.subscribe({
      next: (param) => {
        const productId = param.get('id');
        if (productId) {
          this.productService.getProdct(Number(productId)).subscribe({
            next: (product) => {
              this.productDetails.Id = product.id;
              this.productDetails.Name = product.name;
              this.productDetails.BasePrice = product.basePrice;
              this.productDetails.SKU = product.sku;
              this.SKU_lable = "";
              this.SKU_lable = this.productDetails.SKU;
              this.productDetails.MRP = product.mrp;
              this.productDetails.Currency = product.currency;
              this.productDetails.ExpireDate = this.formatDate(product.expireDate);
              this.productDetails.ManufacturedDate = this.formatDate(product.manufacturedDate);
              this.productDetails.Description = product.description;
              this.productDetails.CategoryId = product.categoryId;
            }
          })
        }
      }
    })
  }
  GenerateSKU(): void {
    this.productDetails.SKU = this.generateRandomSKU(6);
    this.SKU_lable = ""
    this.SKU_lable = this.productDetails.SKU;
  }
  generateRandomSKU(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
  formatDate(date: string | Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  UpdateProduct() {
    if(this.productDetails.Name == "" || this.productDetails.Name == null){
      alert("Please fill product name !");
      return false;
    }else if( this.productDetails.SKU == "" || this.SKU_lable ==""){
      alert("Please generate SKU !");
      return false;
    }else if( this.productDetails.CategoryId == 0){
      alert("Please select category !");
      return false;
    }else if( this.productDetails.BasePrice == 0){
      alert("Please enter base price !");
      return false;
    }else if( this.productDetails.MRP == 0){
      alert("Please enter MRP !");
      return false;
    }else if( this.productDetails.Description == ""){
      alert("Please enter description !");
      return false;
    }else if( this.productDetails.Currency == 0){
      alert("Please enter Currency !");
      return false;
    }else if( this.productDetails.ExpireDate == null){
      alert("Please enter Expiry Date !");
      return false
    }else{
      this.productDetails.CategoryId = Number(this.productDetails.CategoryId);
      const selectedCategory = this.Category.find(cat => cat.CategoryId === this.productDetails.CategoryId);
      if (selectedCategory) {
        this.productDetails.Category.CategoryId = selectedCategory.CategoryId;
        this.productDetails.Category.CategoryName = selectedCategory.CategoryName;
        this.productDetails.Category.IsActive = true;
      }
      this.productService.updateProduct(this.productDetails.Id, this.productDetails).subscribe({
        next: (product) => {
          this.router.navigate([''])
        }
      });
        return true;
    }
    

    
  }

}
