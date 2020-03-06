import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.models';
import { NgForm } from '@angular/forms';
import { LoginandregisterService } from 'src/app/services/loginandregister.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  user: UserModel = new UserModel;

  loggedIn:boolean = false;



  constructor( private logregService:LoginandregisterService, private router:Router ) { 
  }

  ngOnInit() {

  }

  login( form:NgForm ){

    if ( form.invalid ){ return;}
      console.log(form);

      if ( form.valid ){
        // Token and data from Firebase
        this.logregService.login(this.user)
        .subscribe( resp => console.log(resp));
    
         this.loggedIn = true;
         // User info
         this.logregService.getUserInfo(this.user).subscribe( res => console.log(res));
         
         this.logregService.youAreLogged(this.loggedIn)
         localStorage.setItem('Sesioniniciada',JSON.stringify( this.loggedIn));
         console.log(this.loggedIn);
         
         
         this.router.navigateByUrl('/home')


      }

  }

}
