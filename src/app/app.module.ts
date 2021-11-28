import { NgModule ,LOCALE_ID} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';


import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/shared/navbar/menu.component';

import { ProductosComponent } from './components/productos/productos.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { AboutComponent } from './components/about/about.component';
import { RegproductoComponent } from './components/darshboard/regproducto/regproducto.component';
import { ListproductoComponent } from './components/darshboard/listproducto/listproducto.component';
import { ListventasComponent } from './components/darshboard/listventas/listventas.component';
import { CarritoComponent } from './components/carrito/carrito.component';


import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetalleComponent } from './components/productos/detalle/detalle.component';
import { FormComponent } from './components/productos/form.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';
import { ProductosService } from './components/productos/productos.service';
import { LoginComponent } from './usuarios/login.component';
import { TokenInterceptor } from './usuarios/interceptors/token.interceptor';
import { AuthInterceptor } from './usuarios/interceptors/auth.interceptors';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './usuarios/guards/auth.guard';
import { RoleGuard } from './usuarios/guards/role.guard';
registerLocaleData(localeES,'es');



const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'lista', component: ProductosComponent },
  { path: 'about', component: AboutComponent },
  { path: 'carrito', component: CarritoComponent },
  { path:'productos',component: ProductosComponent},
  { path:'productos/page/:page',component: ProductosComponent},
  { path: 'productos/form',component: FormComponent,canActivate:[AuthGuard,RoleGuard],data:{role: 'ROLE_ADMIN'}},
  { path: 'productos/form/:id',component: FormComponent,canActivate:[AuthGuard,RoleGuard],data:{role: 'ROLE_ADMIN'}},
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
  
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    LoginComponent,
    ProductosComponent,
    FooterComponent,
    AboutComponent,
    RegproductoComponent,
    ListproductoComponent,
    ListventasComponent,
    CarritoComponent,
    DetalleComponent,
    FormComponent,
    PaginatorComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],
  providers: [ProductosService,{provide: LOCALE_ID,useValue: 'es'},
  {provide: HTTP_INTERCEPTORS,useClass:TokenInterceptor,multi:true},
  {provide: HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
