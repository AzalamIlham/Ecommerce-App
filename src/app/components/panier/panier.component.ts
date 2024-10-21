import { Component } from '@angular/core';
import { LignePanier } from '../../modules/LignePanier';
import { CommonModule } from '@angular/common';
import { Product } from '../../modules/Product';
import { PanelService } from '../../sevices/panel.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.css'
})
export class PanierComponent {

  detailsPanier: LignePanier[] = [];
  constructor(private servicePanel: PanelService,private router:Router) { }

  ngOnInit(): void {
    this.servicePanel.getAllCartProducts().subscribe(data => {
      this.detailsPanier = data; 
    });
  }

  get totalPrice(): number {
    return this.detailsPanier.reduce((acc, item) => acc + (item.qte * item.produit.price), 0);
  }

  incrementQuantity(produit: Product) {
    this.servicePanel.incrementQuantity(produit);
  }

  decrementQuantity(produit: Product) {
    this.servicePanel.decrementQuantity(produit);
  }

  removeItem(produit: Product) {
    this.servicePanel.removeItem(produit);
  }

  continueShopping(){
    this.router.navigate(['/']);
  }

  passerCommande(){
    this.router.navigate(['/mes-commandes']);
  }
  
}
