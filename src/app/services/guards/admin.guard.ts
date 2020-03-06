import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginandregisterService } from '../loginandregister.service';

import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  loggedIn:boolean

  constructor( private logregService:LoginandregisterService, private router:Router ){}

  canActivate() {


    if( JSON.parse( localStorage.getItem( 'Sesioniniciada' )) === false  ){

      
      return false
      
      
    }
    
    if ( this.logregService.user === undefined ){ return; }
    
    if (  this.logregService.user.rol === 'ADMIN_ROLE' ){
      
      return true;
    }else{
      console.log('Bloqueado por el ADMIN GUARD');
      
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Only with Admin permissions',
        showConfirmButton: false,
        timer: 1500
      })
      
      return false;
    }



  }
  
}
