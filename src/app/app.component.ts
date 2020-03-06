import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  products;

  title = 'game-store';

  constructor(
    private router: Router,
    private prodService:ProductsService
 )

  {

    if ( JSON.parse( localStorage.getItem('cart')) === null ){

      localStorage.setItem('cart', JSON.stringify([]) );
    }


        // Load LocalStorage in every page
    this.router.events.subscribe((e) => {
        if (e instanceof NavigationEnd) {

          // Save products in LocalStorage
               this.prodService.saveProduct()
    .subscribe( resp => {
      this.products = resp
       localStorage.setItem("products", JSON.stringify(this.products) )
      });
        }
     });
 }
}
