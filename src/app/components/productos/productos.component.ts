import { Component, OnInit } from '@angular/core';
import { Producto } from './productos';
import { ProductosService } from './productos.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { ModalService } from './detalle/modal.service';
import { AuthService } from 'src/app/usuarios/auth.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html'
})
export class ProductosComponent implements OnInit {

   productos:Producto[];
   paginador:any;
   productoSeleccionado:Producto;

  constructor(private productoService:ProductosService,private activatedRoute:ActivatedRoute,
    private modalService:ModalService,public authService:AuthService) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe( params => {
      let page:number = +params.get('page');
      if(!page){
        page = 0;
      }
      this.productoService.getProductos(page).subscribe(
        (response:any) => {
          this.productos = response.content as Producto[];
          this.paginador = response;
        });
      });
  
      this.modalService.notificarUpload.subscribe(producto => {
        this.productos = this.productos.map(productooriginal => {
          if(producto.id == productooriginal.id){
            productooriginal.foto = producto.foto;
          }
          return productooriginal;
        })
      })

  }


  delete(producto:Producto):void{
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Estas Seguro?',
      text: `Seguro que desea elimiar al cliente ${producto.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.delete(producto.id).subscribe(
          response =>{
            this.productos = this.productos.filter(pro => pro !== producto)
            swalWithBootstrapButtons.fire(
              'Producto Eliminado!',
              'Your file has been deleted.',
              'success'
            )
          }
        )
        
      } 
    })
  }

  abrirModal(producto:Producto){
    this.productoSeleccionado = producto;
    this.modalService.abrirModal();
  }


}
