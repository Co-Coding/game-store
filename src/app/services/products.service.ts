import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from '../models/product.models';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private currentCartCount = new BehaviorSubject(0);
  cartCount = this.currentCartCount.asObservable();

  private currentTotalCount = new BehaviorSubject(0);
  totalCount = this.currentTotalCount.asObservable();

  private currentcartRemove = new BehaviorSubject(0);
  cartRemove = this.currentTotalCount.asObservable();
  

  cart = [];

  cartTotal = 0;
  itemsTotal = 0;

  product: ProductModel[];
  
  constructor( private http:HttpClient ) {

    
  }
  
  url = 'https://gamestore-8c4e3.firebaseio.com/Products'

  //
  updateCartRemove(cart){
    this.currentcartRemove.next(cart)
  }
  
  // Method to update cart items view
  updateCartCount(count: number) {
    this.currentCartCount.next(count)
  }
 // Cart Total $
  updateTotalCount(count: number){
     this.currentTotalCount.next(count)
  }

  // Method to add product to DataBase
  addProduct(product:ProductModel){
    return this.http.post(`${this.url}.json`,product)
  }

  // Method to save products in LocalStorage
  saveProduct(){
    return this.http.get(`${this.url}.json`).pipe(
      map( (resp) => this.createArray(resp) )
      )
  }

  // Method to see Product
  seeProduct( id:string ){
    return this.http.get(`${this.url}.json`).pipe(
      map( data => { 
        
        let prodArray: ProductModel[] = [];
    
        Object.keys(data).forEach( (key) => {
        let product:ProductModel = data[key]
         prodArray.push(product)

        })

        return prodArray[id];
      })
    )
  }
  // Get product from products and return the Item clicked
  getProducts(id){
    let products = JSON.parse( localStorage.getItem('products'));

    let cartItem = products[id]

     return cartItem
  }

  deleteProduct(cart,i){

    cart.splice(i,1);
    localStorage.setItem('cart', JSON.stringify(cart) )

    let cartZero = JSON.parse( localStorage.getItem('cart') )
    if ( cartZero <= 0 ){
      this.cartTotal = 0
    }
  

  }

  // Add Item to the cart and save in LocalStorage
  addToCart(cartItem){

    if(localStorage.getItem('cart') == null){
      this.cart =[];
    }else{
      this.cart =  JSON.parse(localStorage.getItem('cart'));
    }
    this.cart = [...this.cart,cartItem]
  
    localStorage.setItem('cart', JSON.stringify(this.cart) )
  }


  setCartValue(cart){
   let tempTotal = 0;

    if (cart === null) { return [];}
    cart.map( item =>{

      tempTotal += item.price * item.amount;
      
      this.cartTotal = parseFloat(tempTotal.toFixed(2));
      this.itemsTotal += item.amount;    
    });
  }


  private createArray(productsObj: object){

    const products: ProductModel[] = [];

  if (productsObj === null) { return [];}
  Object.keys(productsObj).forEach( key => {

    const product: ProductModel = productsObj[key]
    
    product.id = key;
    products.push(product);
  });
  this.product = products
  return products;
  }


}
