import { Routes } from '@angular/router';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { AuthComponent } from './components/auth/auth.component';
import { PanierComponent } from './components/panier/panier.component';
import { DatailProductComponent } from './components/datail-product/datail-product.component';
import { ListProduitComponent } from './components/listProduit/list-produit.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MesCommandesComponent } from './components/mes-commandes/mes-commandes.component';
import { RegisterComponent } from './components/register/register.component';
import { authguardGuard } from './guards/authguard.guard';
import { SearchCategoryComponent } from './components/search-category/search-category.component';

export const routes: Routes = [
   {path : 'auth',component :AuthComponent},
   {path:"category/:category",component:SearchCategoryComponent},
   {path :'register',component : RegisterComponent},
   {path :'panier',component :PanierComponent},
   {path: 'detail-product/:id', component: DatailProductComponent },
   {path :'',component :ListProduitComponent},
   {path :'detail-product',component :DatailProductComponent},
   {path :'mes-commandes',component :MesCommandesComponent,canActivate : [authguardGuard]}

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
