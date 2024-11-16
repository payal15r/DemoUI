import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../../Services/products.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-productlist',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './productlist.component.html',
  styleUrl: './productlist.component.scss'
})
export class ProductlistComponent implements OnInit {
  ProductsList: any[] = [];
  Category = [
    { CategoryId: 1, CategoryName: 'Electronics' },
    { CategoryId: 2, CategoryName: 'Mobile' },
    { CategoryId: 3, CategoryName: 'Laptop' }
  ];
  constructor(private productService: ProductsService,private router : Router) {
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        products.forEach(element => {
          if (element.categoryId) {
            const selectedCategory = this.Category.find(cat => cat.CategoryId === element.categoryId);
            if (selectedCategory) {
              element.categoryName = selectedCategory.CategoryName;
            }
          }
        });
        this.ProductsList = products;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      },
    });
  }

  EditProduct(product: any) {
    this.router.navigate([`edit/${product.id}`]);
  }
  DeleteProduect(product: any) {
    const confirmation = window.confirm(`Are you sure you want to delete this product ?`);
    if (confirmation) {
      const ProductId = product.id;
      if (ProductId) {
        this.productService.deleteProduct(ProductId).subscribe({
          next: () => {
            alert("Product Deleted!");
            this.GetProducts();
          },
          error: (err) => {
            alert("Failed to delete the product. Please try again.");
          },
        });
      }
    }

  }
  GetProducts() {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.ProductsList = products;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      },
    });
  }
}

