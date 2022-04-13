import { Component, Input, OnInit } from '@angular/core';
import { ProductoPedido } from 'src/app/models/pedido.model';

@Component({
  selector: 'app-item-carrito',
  templateUrl: './item-carrito.component.html',
  styleUrls: ['./item-carrito.component.css']
})
export class ItemCarritoComponent implements OnInit {

  @Input() productoPedido: ProductoPedido;
  constructor() { }

  ngOnInit(): void {
  }

}
