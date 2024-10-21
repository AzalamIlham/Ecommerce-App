import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Product } from '../../modules/Product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../sevices/product.service';
import { ProductItemComponent } from '../product-item/product-item.component';

@Component({
  selector: 'app-search-category',
  standalone: true,
  imports: [CommonModule,ProductItemComponent],
  templateUrl: './search-category.component.html',
  styleUrl: './search-category.component.css'
})
export class SearchCategoryComponent {
  products: Product[] = [];
  category!: string;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.category = params.get('category') || '';
      this.getProductsByCategory(this.category);
    });

  }

  getProductsByCategory(category: string): void {
    this.productService.getProductsByCategory(category).subscribe(products => {
      this.products = products;
    });
    console.log(this.products)
  }

}
