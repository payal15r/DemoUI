import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductModel } from '../Models/product.model';

@Injectable({
  providedIn: 'root', // Ensure service is provided in the root injector
})
export class ProductsService {
  private apiUrl: string = 'https://localhost:7147/api/Product'; // Fixed API URL

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  addProduct(productReq : any):Observable<any[]>{
    return this.http.post<any>(this.apiUrl, productReq);
  }
  getProdct(id:number):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  updateProduct(id:number,productReq : any):Observable<any[]>{
    return this.http.put<any>(`${this.apiUrl}/${id}`, productReq);
  }
  deleteProduct(id:number):Observable<any[]>{
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
