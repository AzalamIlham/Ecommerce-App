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

  constructor(private http: HttpClient) { }

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
    console.log(this.detailProduit);
  }

  incrementQuantity(produit: Product) {
    const itemFound = this.detailProduit.find(item => item.produit.id === produit.id);
    if (itemFound) {
      itemFound.qte++; // Incrémenter la quantité
      this.productCartSubject.next(this.detailProduit); // Mettre à jour l'observable
    }
  }

  decrementQuantity(produit: Product) {
    const itemFound = this.detailProduit.find(item => item.produit.id === produit.id);
    if (itemFound && itemFound.qte > 0) {
      itemFound.qte--; // Décrémenter la quantité
      if (itemFound.qte === 0) {
        this.removeItem(produit); // Retirer le produit si la quantité est 0
      }
      this.productCartSubject.next(this.detailProduit); // Mettre à jour l'observable
    }
  }

  removeItem(produit: Product) {
    this.detailProduit = this.detailProduit.filter(item => item.produit.id !== produit.id);
    this.productCartSubject.next(this.detailProduit); // Mettre à jour l'observable
  }
}
