import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LignePanier } from '../modules/LignePanier';
import { Product } from '../modules/Product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PanelService {
  private productCartSubject = new BehaviorSubject<LignePanier[]>([]);
  private detailProduit: LignePanier[] = [];


  constructor(private http: HttpClient) {
    this.loadPanier(); 
    this.productCartSubject.next(this.detailProduit); 
  }


  getAllCartProducts() {
    return this.productCartSubject.asObservable(); 
  }


  getPanier(): LignePanier[] {
    return this.detailProduit;
  }
  

  onProductAdded(p: Product) {
    const existingProduct = this.detailProduit.find(item => item.produit.id === p.id);
    if (existingProduct) {
      existingProduct.qte++; 
    } else {
      const newLignePanier = new LignePanier();
      newLignePanier.produit = p;
      newLignePanier.qte = 1;
      this.detailProduit.push(newLignePanier); 
    }
    this.productCartSubject.next(this.detailProduit); 
    this.enregistrerPanier();
  }

  
  loadPanier() {
    const data = localStorage.getItem("cart");
    if (data) {
      this.detailProduit = JSON.parse(data);
      this.productCartSubject.next(this.detailProduit); 
    }
  }
  enregistrerPanier() {
    localStorage.setItem("cart", JSON.stringify(this.detailProduit));
  }

  incrementQuantity(produit: Product) {
    const itemFound = this.detailProduit.find(item => item.produit.id === produit.id);
    if (itemFound) {
      itemFound.qte++; 
      this.productCartSubject.next(this.detailProduit);
      this.enregistrerPanier(); 
    }
  }

  decrementQuantity(produit: Product) {
    const itemFound = this.detailProduit.find(item => item.produit.id === produit.id);
    if (itemFound && itemFound.qte > 0) {
      itemFound.qte--; 
      if (itemFound.qte === 0) {
        this.removeItem(produit); 
      }
      this.productCartSubject.next(this.detailProduit);
      this.enregistrerPanier(); 
    }
  }

  removeItem(produit: Product) {
    this.detailProduit = this.detailProduit.filter(item => item.produit.id !== produit.id);
    this.productCartSubject.next(this.detailProduit); 
    this.enregistrerPanier(); 
  }

  clearCart() {
    this.detailProduit = [];
    this.productCartSubject.next(this.detailProduit);
    localStorage.removeItem("cart");
  }
}
