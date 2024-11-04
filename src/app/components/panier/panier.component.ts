import { Component, OnInit } from '@angular/core';
import { LignePanier } from '../../modules/LignePanier';
import { CommonModule } from '@angular/common';
import { Product } from '../../modules/Product';
import { PanelService } from '../../sevices/panel.service';
import { Router } from '@angular/router';
import { CommandeService } from '../../sevices/commande.service';
import { AuthService } from '../../sevices/auth.service';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  detailsPanier: LignePanier[] = [];
  montantTotal: number = 0;

  constructor(
    private servicePanel: PanelService,
    private router: Router,
    private commandeService: CommandeService,
    private authService :AuthService
  ) {}

  ngOnInit(): void {
    this.servicePanel.getAllCartProducts().subscribe(data => {
      this.detailsPanier = data;
      this.updatePanierDetails();
    });
  }

  updatePanierDetails() {
    this.montantTotal = this.totalPrice;  
  }

  validerPanier() {
    if (this.detailsPanier.length > 0) {
      console.log("valider comm"+this.authService.UserId);
      this.commandeService.addCommande(this.authService.UserId, this.detailsPanier, this.montantTotal);
      console.log('Commande validée !');
      this.router.navigate(['/mes-commandes']);
      this.detailsPanier = [];
      this.montantTotal = 0;
      this.servicePanel.clearCart(); 
    } else {
      console.log('Le panier est vide');
    }
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

  continueShopping() {
    this.router.navigate(['/']);
  }
}
