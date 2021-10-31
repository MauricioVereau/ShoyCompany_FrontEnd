import { DecimalPipe } from "@angular/common";
import { TipoProducto } from "./tipoProducto";

export class Producto{
    id: number;
    nombre: string;
    descripcion:string;
    stock:number;
    precio: number;
    createAt: string;
    foto: string;
    tipoProducto:TipoProducto;
}



