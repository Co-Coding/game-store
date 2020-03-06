import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart = [];
  cartTotal;
  itemsTotal;
  tempTotal;
  products;
 

  constructor(
              private prodService:ProductsService

  ) { }

  ngOnInit() {

    
    // Get new cartTotal updated
    this.prodService.totalCount.subscribe(msg =>this.cartTotal = msg);
    // Get cart values for display
    this.cart = JSON.parse(localStorage.getItem('cart'));
    // Set cart Value
    this.prodService.setCartValue(this.cart)
    this.cartTotal = this.prodService.cartTotal
    
    if ( this.cart.length <= 0 ){
      this.cartTotal = '0'
    }
  

  }



  deleteProduct( i ,cart){
    let itemsTotal = 0;
    let tempTotal = 0;
    let cartTotalCount


    if ( this.cart.find( item =>item.id === cart )) {

      let tempItem = this.cart.find( item =>item.id === cart);
      tempItem.amount = tempItem.amount - 1;
      if ( tempItem.amount > 0 ){
      localStorage.setItem('cart', JSON.stringify(this.cart) )
       this.prodService.setCartValue(this.cart)
      }
      else{
    
        
         this.cart.splice(i, 1)
        localStorage.setItem('cart', JSON.stringify(this.cart) )

        


      }




   // Total del carrito y total $
   if (this.cart === null) { return [];}
   this.cart.map( item =>{
     tempTotal += item.price * item.amount;    
     cartTotalCount = parseFloat(tempTotal.toFixed(2));
     itemsTotal += item.amount;  
   });
   
   this.prodService.updateCartCount(itemsTotal);
    this.prodService.updateTotalCount(cartTotalCount)
   
    // if ( tempItem.amount <= 0 ){
    //   this.cart.splice(i,1);
    //   localStorage.setItem('cart', JSON.stringify(cart) )
    // }

    }

    
  }

}
