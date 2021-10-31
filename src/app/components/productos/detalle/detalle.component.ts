import { Component, Input, OnInit } from '@angular/core';
import { Producto } from '../productos';
import { ProductosService } from '../productos.service';
import { ModalService } from './modal.service';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'detalle-producto',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  @Input() producto : Producto;
  titulo: string = "Detalle Producto";
  fotoSeleccionada: File;
  progreso:number = 0;


  constructor(private ProductoService:ProductosService,public modalService:ModalService) { }

  ngOnInit(){
  }


  seleccionarFoto(event){
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    console.log(this.fotoSeleccionada);
    if(this.fotoSeleccionada.type.indexOf('image') < 0){
     swal.fire('Error al seleccionar la imagen:','El archivo debe ser una imagen','error');
     this.fotoSeleccionada = null;
    }
   }
 
   subirFoto(){
     if(!this.fotoSeleccionada){
       swal.fire('Error Upload:','debe seleccionar una foto','error')
     }else{
     this.ProductoService.subirFoto(this.fotoSeleccionada,this.producto.id)
       .subscribe(event =>{
 
         if(event.type === HttpEventType.UploadProgress){
           this.progreso = Math.round((event.loaded/event.total)*100);
         }else if(event.type === HttpEventType.Response){
           let response:any = event.body;
           this.producto = response.producto as Producto;
 
           this.modalService.notificarUpload.emit(this.producto);
           swal.fire('La foto se ha subido completamente',response.mensaje,'success')
         }
       //this.cliente = cliente;
       swal.fire('La foto se ha subido completamente',`La foto se ha subido con exito: ${this.producto.foto}`,'success')
     });
   }
   }
 
   cerrarModal(){
     this.modalService.cerrarModal();
     this.fotoSeleccionada = null;
     this.progreso = 0;
   }

}
