import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../modules/Product';
import { map, Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class ProductService {
  

  private baseUrl = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) { }

  getProducts(){
    return this.http.get('https://dummyjson.com/products')
  }

  getAllCategories() {
    return this.http.get<any[]>('https://dummyjson.com/products/category-list');
  }
  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<any>(`https://dummyjson.com/products/category/${category}`).pipe(
      map(value =>
        value.products.map((product: any) => new Product(
          product.id,
          product.thumbnail,
          product.description,
          product.category,
          product.price,
          product.stock
          
        ))
      )
    );
  }

  public getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

}
