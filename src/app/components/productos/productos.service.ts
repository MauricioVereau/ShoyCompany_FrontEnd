import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of ,throwError} from "rxjs";
import { Producto } from "./productos";
import {map,catchError} from 'rxjs/operators'
import swal from 'sweetalert2';
import { Router } from "@angular/router";
import { formatDate, registerLocaleData } from "@angular/common";
import localeES from '@angular/common/locales/es'
import { TipoProducto } from "./tipoProducto"; 

@Injectable()
export class ProductosService{
    
    private urlEndPoint:string = 'http://localhost:8080/api/productos';
    private httpheaders = new HttpHeaders({'Content-Type': 'application/json'})

    constructor(private http: HttpClient,private router:Router){}

    private isNoAutorizado(e):boolean{
      if(e.status==401 || e.status==403){

        this.router.navigate(['/login'])
        return true;
      }
      return false;
    }


    getTiposProductos():Observable<TipoProducto[]>{
     return  this.http.get<TipoProducto[]>(this.urlEndPoint + '/tipos').pipe(
       catchError(e=>{
         this.isNoAutorizado(e);
         return throwError(e);
       })
     );
    }

    getProductos(page: number) : Observable<any[]>{
      //return of(CLIENTES);
      return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
        map((response:any) => {
           (response.content as Producto[]).map(producto =>{
                registerLocaleData(localeES,'es');
                producto.createAt = formatDate(producto.createAt,'EEEE dd, MMMM yyyy','es');
                return producto;
           });
           return response;
        }
        )
      );
    }

    create(producto : Producto) : Observable<Producto>{
      return this.http.post<any>(this.urlEndPoint,producto,{headers:this.httpheaders}).pipe(
        map((response):any => response.producto as Producto),
        catchError(e => {

          if(this.isNoAutorizado(e)){
            return throwError(e);
          }

          if(e.status === 400){
            return throwError(e);
          }

          console.error(e.error.mensaje);
          swal.fire('Error al crear producto ',e.error.error,'error');
          return throwError(e);
        })
      );
    }

    getProducto(id):Observable<Producto>{
      return this.http.get<Producto>(`${this.urlEndPoint}/${id}`).pipe(
        catchError(e =>{

          if(this.isNoAutorizado(e)){
            return throwError(e);
          }

          this.router.navigate(['/productos']);
          console.error(e.error.mensaje);
          swal.fire('Error al Editar ',e.error.mensaje,'error');
          return throwError(e);
        })
      );
    }

    update(producto: Producto):Observable<any>{
      return this.http.put<any>(`${this.urlEndPoint}/${producto.id}`,producto,{headers:this.httpheaders}).pipe(
        catchError(e => {

          if(this.isNoAutorizado(e)){
            return throwError(e);
          }

          console.error(e.error.mensaje);
          swal.fire('Error al editar ',e.error.mensaje,'error');
          return throwError(e);
        })
      );
    }

    delete (id:number):Observable<Producto>{
      return this.http.delete<Producto>(`${this.urlEndPoint}/${id}`,{headers:this.httpheaders}).pipe(
        catchError(e => {

          if(this.isNoAutorizado(e)){
            return throwError(e);
          }

          console.error(e.error.mensaje);
          swal.fire('Error al eliminar ',e.error.mensaje,'error');
          return throwError(e);
        })
      );
    }

subirFoto(archivo: File,id):Observable<HttpEvent<{}>>{
  let formData = new FormData();
  formData.append("archivo",archivo);
  formData.append("id",id);

  const req = new HttpRequest('POST',`${this.urlEndPoint}/upload`,formData,{
     reportProgress: true
  });

  return this.http.request(req).pipe(
    catchError(e=>{
      this.isNoAutorizado(e);
      return throwError(e);
    })
  );

}

}