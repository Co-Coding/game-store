import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product.models';
import { NgForm } from '@angular/forms';

import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { ProductsService } from 'src/app/services/products.service';

import Swal from 'sweetalert2'

import { interval } from 'rxjs';
import { Subscription } from 'rxjs';

import { Router } from '@angular/router';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styles: []
})
export class AddproductComponent implements OnInit {

  imgSrc: string = "../../../assets/image/clickhere.jpeg";
  selectedImage: any = null;


  product: ProductModel = new ProductModel;
  category;
  genre;
  sub: Subscription

  constructor( private storage:AngularFireStorage, private prodService:ProductsService, private router:Router  ) { }

  ngOnInit() {

    this.category = [
      {name: 'PS4'},
      {name: 'PS3'},
      {name: 'Nintendo Switch'},
      {name: 'PC'},
    ]
    this.genre = [
      {name: 'Action'},
      {name: 'Terror'},
      {name: 'Sports'},
      {name: 'Rol'},
    ]

  }

  showPreview(event:any){
    
    if(event.target.files && event.target.files[0]) {
      const reader = new FileReader
      reader.onload = (e:any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0]
    } else{
      this.imgSrc = "../../../assets/image/clickhere.jpeg";
      this.selectedImage = null;
    }

  }


  AddProduct(form:NgForm){

    if ( form.invalid  ) { return; }

    if ( form.valid){
      console.log(form);
      
      var filePath = `images/${this.selectedImage.name}_${new Date().getTime()}`;
      
      const fileRef = this.storage.ref(filePath);
      
      this.storage.upload(filePath,this.selectedImage).snapshotChanges().pipe(
        finalize( () => {
          fileRef.getDownloadURL().subscribe( (url) =>{
            this.product.image = url;
            // this.imgservice.insertImageDetails(this.product);
            this.prodService.addProduct(this.product)
            .subscribe( resp => {
              console.log(resp) 
            });
            })
          })
        ) .subscribe();

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your product will be added in a few seconds',
          showConfirmButton: false,
          timer: 1500
        });

        this.router.navigateByUrl('/home');

   }

  }

     navigateHome(){
      this.sub.unsubscribe();

  }

}
