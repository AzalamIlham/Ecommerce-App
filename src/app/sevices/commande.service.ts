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
  deleteDoc
  } from '@angular/fire/firestore';
  

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  constructor(private fireStore:Firestore){
  }
  private commandes: CommandeModule[] = [];


  getCommandes(): CommandeModule[] {
    return this.commandes;
  }


   addCommande(userId :string, details: Array<LignePanier>, montant: number){
    const commandeData : any ={userId:userId,montant:montant,dateCommande:new Date(),details:details}
    const collectionInstance= collection(this.fireStore,'orders')
    addDoc(collectionInstance,commandeData).then(()=>console.log("data created",commandeData)).catch(error =>console.log(error))
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
