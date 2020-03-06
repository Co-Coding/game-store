import { Component, OnInit, Input } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { LoginandregisterService } from 'src/app/services/loginandregister.service';
import { UserModel } from 'src/app/models/user.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  loggedIn:boolean

  user:UserModel 

  cart = [];
  itemsTotal

  constructor( private prodService:ProductsService, private logredService:LoginandregisterService, private router:Router ) { }

  ngOnInit() {


    
    // Get cart values for display
    this.cart = JSON.parse(localStorage.getItem('cart'));
    // Set cart Value
      this.prodService.setCartValue(this.cart)
    // Get new cartCount updated
      this.prodService.cartCount.subscribe(msg => this.itemsTotal = msg);
      console.log(this.itemsTotal);
      this.itemsTotal = this.prodService.itemsTotal

     this.logredService.Logged.subscribe( msg => {
       this.loggedIn = msg
       console.log(msg)});

    //  if ( JSON.parse( localStorage.getItem('loggedIn')) === true  ){
         
    //  }else {
       
    //  }
    


  }

  logout(){
    this.loggedIn = false
    localStorage.setItem('Sesioniniciada',JSON.stringify( this.loggedIn));
    this.router.navigateByUrl('/home')
  }





}
