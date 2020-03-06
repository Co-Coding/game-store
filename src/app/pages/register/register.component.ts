import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserModel } from 'src/app/models/user.models';
import { LoginandregisterService } from 'src/app/services/loginandregister.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  user:UserModel = new UserModel

  constructor( private logregService:LoginandregisterService, private router:Router ) { 

    this.user.rol = 'USER_ROLE'
  }

  ngOnInit() {
  }


  signUp(form:NgForm){


    if ( form.invalid  ){ return; }

    if ( form.valid ){

      this.logregService.signUp(this.user)
      .subscribe( resp => console.log(resp)
       )
      this.logregService.saveUser(this.user).subscribe( resp => console.log(resp)
      )
  
      this.router.navigateByUrl('/login')

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Now you can Log In',
        showConfirmButton: false,
        timer: 1500
      })

  
    }
    }


}
