import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { ProductosComponent } from './components/productos/productos.component';
import { AboutComponent } from './components/about/about.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { FormComponent } from './components/productos/form.component';
import { ProductosService } from './components/productos/productos.service';
import { LoginComponent } from './usuarios/login.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'lista', component: ProductosComponent },
  { path: 'about', component: AboutComponent },
  { path: 'carrito', component: CarritoComponent },
  { path:'productos',component: ProductosComponent},
  { path:'productos/page/:page',component: ProductosComponent},
  { path: 'productos/form',component: FormComponent},
  { path: 'productos/form/:id',component: FormComponent},
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
  
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[ProductosService]
})
export class AppRoutingModule { }
