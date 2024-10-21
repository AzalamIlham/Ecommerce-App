import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from '../product-item/product-item.component';
import { Product } from '../../modules/Product';
import { PanierComponent } from '../panier/panier.component';
import { HeaderComponent } from '../header/header.component';
import { LignePanier } from '../../modules/LignePanier';
import { ProductService } from '../../sevices/product.service';
import { DatailProductComponent } from '../datail-product/datail-product.component';
import { SearchService } from '../../sevices/search.service';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-produit-item',
  templateUrl: './list-produit.component.html',
  styleUrls: ['./list-produit.component.css'],  
  standalone: true,
  imports: [CommonModule,FooterComponent, ProductItemComponent, PanierComponent, HeaderComponent, DatailProductComponent]
})

export class ListProduitComponent {
  
  filteredProducts: Product[] = []; 
  selectedProduct: Product | null = null;
  produits: Product[] = []; 
  
  constructor(private productService: ProductService, private searchService: SearchService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((response: any) => {
      this.produits = response.products || [];  
      this.filteredProducts = [...this.produits];  
    });
    this.searchService.currentSearchTerm.subscribe(term => {
      if (this.produits.length > 0) {
        this.filteredProducts = this.produits.filter(product =>
          product.description.toLowerCase().includes(term.toLowerCase())
        );
      }
    });
  }
  
  selectProduct(product: Product): void {
    this.selectedProduct = product;
  }

}
