import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-cart-total',
  templateUrl: './cart-total.component.html',
  styleUrls: ['./cart-total.component.css']
})
export class CartTotalComponent implements OnInit {


  @Input('cartTotal') cartTotal = '0'
  @Output() cambiarValor: EventEmitter<number> = new EventEmitter();

  constructor( private prodService:ProductsService ) { 

    
  }



  ngOnInit() {



    this.cambiarValor.emit( this.prodService.itemsTotal )
    console.log(this.prodService.itemsTotal);
   
  }



}