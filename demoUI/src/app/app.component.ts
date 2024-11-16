import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsService } from './Services/products.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HttpClientModule,CommonModule,ReactiveFormsModule,FormsModule],
  providers:[ProductsService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'demoUI';
}
