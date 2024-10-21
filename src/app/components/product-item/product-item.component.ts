
import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Product } from '../../modules/Product';
import { PanelService } from '../../sevices/panel.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  
  @Input() product!: Product;
  @Output() selectedProductDetail = new EventEmitter<Product>();
  
  isClicked =false;
  constructor(private servicePanel: PanelService) {}

  selectProduct() {
    this.selectedProductDetail.emit(this.product);
  }

  addToCart() {
    this.isClicked = true;
    this.servicePanel.onProductAdded(this.product); 
    setTimeout(() => {
      this.isClicked = false;
    }, 200); 
  }

  getState(stock: number): string {
    return stock > 0 ? "In stock" : "Out of stock";
  }

  getColor(stock: number): string {
    return stock > 0 ? "green" : "red";
  }

  alerter() {
    console.log("Product added successfully!");
  }
}
