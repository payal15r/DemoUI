import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../../Services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productadd',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productadd.component.html',
  styleUrls: ['./productadd.component.scss']
})
export class ProductaddComponent implements OnInit {
  ProductObj = {
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
    ManufacturedDate: new Date(),
    ExpireDate: new Date()
  };

  SKU_lable: string = "";
  selectedCategoryId: number = 0;

  Category = [
    { CategoryId: 1, CategoryName: 'Electronics' },
    { CategoryId: 2, CategoryName: 'Mobile' },
    { CategoryId: 3, CategoryName: 'Laptop' }
  ];

  constructor(private productService: ProductsService, private router: Router) { }
  today: string = '';
  ngOnInit(): void {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    this.today = `${year}-${month}-${day}`;
  }

  GenerateSKU(): void {
    this.SKU_lable = '';
    var Sku_Stirng = this.generateRandomSKU(6);
    this.SKU_lable = Sku_Stirng;
    this.ProductObj.SKU = this.SKU_lable;
  }

  generateRandomSKU(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
  isDisable : boolean = false;
  AddProduct() {
    if(this.ProductObj.Name == "" || this.ProductObj.Name == null){
      alert("Please fill product name !");
      return false;
    }else if( this.ProductObj.SKU == "" || this.SKU_lable ==""){
      alert("Please generate SKU !");
      return false;
    }else if( this.ProductObj.CategoryId == 0){
      alert("Please select category !");
      return false;
    }else if( this.ProductObj.BasePrice == 0){
      alert("Please enter base price !");
      return false;
    }else if( this.ProductObj.MRP == 0){
      alert("Please enter MRP !");
      return false;
    }else if( this.ProductObj.Description == ""){
      alert("Please enter description !");
      return false;
    }else if( this.ProductObj.Currency == 0){
      alert("Please enter Currency !");
      return false;
    }else if( this.ProductObj.ExpireDate == null){
      alert("Please enter Expiry Date !");
      return false
    }else{
      this.isDisable = false;
      this.ProductObj.CategoryId = Number(this.ProductObj.CategoryId);
      const selectedCategory = this.Category.find(cat => cat.CategoryId === this.ProductObj.CategoryId);
      if (selectedCategory) {
        this.ProductObj.Category.CategoryId = selectedCategory.CategoryId;
        this.ProductObj.Category.CategoryName = selectedCategory.CategoryName;
        this.ProductObj.Category.IsActive = true;
      }
      this.productService.addProduct(this.ProductObj).subscribe({
        next: (product) => {
          this.router.navigate(['']);
        }
      });
      return true;
    }
    
  }
}
