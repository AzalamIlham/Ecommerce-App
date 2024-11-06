import { Injectable } from '@angular/core';
import { CommandeModule } from '../modules/commande/commande.module';
import { LignePanier } from '../modules/LignePanier';
import { Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  updateDoc,
  getDoc,
  deleteDoc,
  query,
  where
  } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
  

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  constructor(private fireStore:Firestore,private authService :AuthService){
  }
  private commandes: CommandeModule[] = [];


  getCommandes(): CommandeModule[] {
    return this.commandes;
  }


  getUserOrders() {
    const userId = this.authService.UserId; 
    const collectionInstance = collection(this.fireStore, 'orders');
    const userOrdersQuery = query(collectionInstance, where('userId', '==', userId));
    return collectionData(userOrdersQuery, { idField: 'id' });
  }



  addCommande(userId: string, details: Array<LignePanier>, montant: number) {
    const produitDetails = details.map(item => ({
      produitId: item.produit.id,        
      description: item.produit.description, 
      quantite: item.qte  
    }));
  
    const commandeData: any = {
      userId: userId,
      montant: montant,
      dateCommande: new Date(),
      details: produitDetails, 
    };
  
    const collectionInstance = collection(this.fireStore, 'orders');
    addDoc(collectionInstance, commandeData)
      .then(() => console.log("Commande créée avec succès", commandeData))
      .catch(error => console.log("Erreur lors de la création de la commande", error));
  }
  
  getAllOrders(){
    const collectionInstance = collection(this.fireStore,'orders')
   return  collectionData(collectionInstance, {idField : 'id'})

  }

  getOrderId(id:string){
    const collectionInstance = collection(this.fireStore,'orders')

    const docinstance = doc(this.fireStore,'orders',id)

    return getDoc(docinstance)

  }

  updateOrder(id:string){
    const docinstance = doc(this.fireStore,'products',id)
    const updatedOrder : any= {name : "updated name", montant : 1000}
    updateDoc(docinstance,updatedOrder)
    .then(()=>console.log(`Order with ${id} updated successfully ! `))
    .catch(error=>console.log(error))
  }

  deleteOrder(id:string){
    const docinstance = doc(this.fireStore,'orders',id)
    deleteDoc(docinstance)
    .then(()=>console.log('data deleted !'))
    .catch(error=>console.log(error))
  }

}
