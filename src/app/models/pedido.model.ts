import { Platillos } from "./platillos.model";
import { Restaurant } from "./restaurant.model";
import { Usuario } from "./usuario.model";

export interface Pedido{
    id: string;
    usuario: Usuario;
    productos: ProductoPedido[];
    restaurante : Restaurant | null;
    precioTotal: number;
    estado: EstadoPedido;
    fecha: Date;
    valoracion: number | null;
}

export interface ProductoPedido{
    platillo: Platillos;
    cantidad: number;
    total: number;
}

export type EstadoPedido = 'enviado' | 'visto' | 'camino' | 'entregado';