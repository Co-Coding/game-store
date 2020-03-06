import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  products

  constructor( private prodService:ProductsService, private router:Router ) { }

  ngOnInit() {

    // Get products from LocalStorage and put it in a local variable 
    this.products = JSON.parse( localStorage.getItem('products'));

  }

  seeProduct(idx:string){
    console.log(idx);
    
  this.router.navigate(['/product', idx])

  }


}
