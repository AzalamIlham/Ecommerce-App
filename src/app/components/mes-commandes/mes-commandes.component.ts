import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../../sevices/commande.service';
import {  Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mes-commandes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mes-commandes.component.html',
  styleUrl: './mes-commandes.component.css'
})
export class MesCommandesComponent implements OnInit {

  
  

  commandes: any[] = [];
  constructor(private commandeService :CommandeService,private router:Router){

  }

  ngOnInit():void{
    this.commandeService.getUserOrders().subscribe((data: any[]) => {
      this.commandes = data; 
    });
  }
convertTimestampToDate(timestamp: any): Date {
  return new Date(timestamp.seconds * 1000); 
}


}
