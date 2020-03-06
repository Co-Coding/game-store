import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: []
})
export class ProductComponent implements OnInit {

  cartTotal
  // itemsTotal

  cartItems

  cart = [];

  cartItemCount: number = 0;

  product;
  productId;

  constructor( private activateRoute:ActivatedRoute,
               private prodService:ProductsService,
               private router:Router,
    ) {

    this.activateRoute.params.subscribe( params => {

      this.productId = params['id']

      this.product = this.prodService.seeProduct(params['id']).
      subscribe( data => {
        this.product = data
          
      });
      
    })
  

   }

  ngOnInit() {


    this.cart = JSON.parse(localStorage.getItem('cart'));
    // Set cart Value
    this.prodService.setCartValue(this.cart)
    this.cartTotal = this.prodService.cartTotal
    console.log(this.cart);
    
  }


  addToCart(){

    let cartItem = {...this.prodService.getProducts(this.productId), amount: 1}
    let tempItem = this.cart.find( item =>item.id === cartItem.id);
    let tempTotal = 0;
    let itemsTotal = 0;
    let cartTotalCount

    console.log(cartItem);
    

    if (  typeof tempItem === 'undefined'  ) {

      this.prodService.addToCart(cartItem)
      // Get storage to get the length and call the method to update the first cart item view
      // let cart = JSON.parse( localStorage.getItem('cart'));
      // this.cartItemCount= cart.length;
      
      // Total del carrito

      let cartNew = this.prodService.cart
      
      if (cartNew === null) { return [];}
      cartNew.map( item =>{
        tempTotal += item.price * item.amount; 
        cartTotalCount = parseFloat(tempTotal.toFixed(2));
        itemsTotal += item.amount;
      });
      this.prodService.updateCartCount(itemsTotal);
      this.prodService.updateTotalCount(cartTotalCount)
      
      this.router.navigateByUrl('/cart');

       }

       else if ( cartItem.id === tempItem.id ) {

         let tempItem = this.cart.find( item =>item.id === cartItem.id);
         tempItem.amount = tempItem.amount + 1;
         localStorage.setItem('cart', JSON.stringify(this.cart) )
         this.prodService.setCartValue(this.cart)

      // Total del carrito y total $
      if (this.cart === null) { return [];}
      this.cart.map( item =>{
        tempTotal += item.price * item.amount;    
        cartTotalCount = parseFloat(tempTotal.toFixed(2));
        itemsTotal += item.amount;  
      });
      
      this.prodService.updateCartCount(itemsTotal);
       this.prodService.updateTotalCount(cartTotalCount)
      
      this.router.navigateByUrl('/cart');

       }
    

   
  }
    
  
  }


