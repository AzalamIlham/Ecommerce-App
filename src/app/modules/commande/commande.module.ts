import { LignePanier } from '../LignePanier';


export class CommandeModule {
  userId !: string;
  dateCommande!: Date;
  details !:Array<LignePanier>;
  montant !: number ;


  constructor(userId: string, details: Array<LignePanier>, montant: number) {
    this.userId = userId;
    this.dateCommande = new Date();
    this.details = details;
    this.montant = montant;
  }

 }
