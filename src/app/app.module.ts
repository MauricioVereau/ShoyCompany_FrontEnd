import { NgModule ,LOCALE_ID} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
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


import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DetalleComponent } from './components/productos/detalle/detalle.component';
import { FormComponent } from './components/productos/form.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';
import { ProductosService } from './components/productos/productos.service';
import { LoginComponent } from './usuarios/login.component';
registerLocaleData(localeES,'es');

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
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
