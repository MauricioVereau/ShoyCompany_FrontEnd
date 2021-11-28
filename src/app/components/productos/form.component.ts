import { Component, OnInit } from '@angular/core';
import { Producto } from './productos'; 
import { ProductosService } from './productos.service';
import { Router,ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { TipoProducto } from './tipoProducto'; 

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html'
  })
  export class FormComponent implements OnInit {
  
    producto : Producto = new Producto()
    tiposProductos : TipoProducto[];
    titulo:string = "Crear Producto"
  
    constructor(private productoService: ProductosService,private router : Router,
                private activatedRoute:ActivatedRoute) { }
    ngOnInit(): void {
      this.cargarProducto()
  
    }
  
  
    cargarProducto():void{
      this.activatedRoute.params.subscribe(params =>{
        let id = params['id']
        if(id){
          this.productoService.getProducto(id).subscribe((producto)=>this.producto = producto)
        }
      });
      this.productoService.getTiposProductos().subscribe(tiposProductos => this.tiposProductos = tiposProductos );
  
    }
  
    public create():void{
           this.productoService.create(this.producto)
           .subscribe(producto =>  {
            this.router.navigate(['/productos'])
            swal.fire('Nuevo Producto ',`El Producto ${producto.nombre} ha sido creado!`,'success')
  
           }
           );
    } 
    
   /* update():void{
      this.productoService.update(this.producto)
      .subscribe(json =>  {
        this.router.navigate(['/productos'])
        swal.fire('Producto Actualizado',`${json.mensaje}: ${json.producto.nombre}`,'success')
           }
           );
    }  
    */
    update():void{
      console.log(this.producto);
      this.productoService.update(this.producto)
      .subscribe(json =>  {
        this.router.navigate(['/productos'])
        swal.fire('Producto Actualizado',`${json.mensaje}: ${json.producto.nombre}`,'success')
           }
           );
    }  
    
    compararTipo(o1:TipoProducto,o2:TipoProducto){
      if(o1 === undefined && o2 === undefined){
        return true
      }
      return o1 == null || o2 == null? false: o1.id===o2.id;
    }
  
  
  
  
  }