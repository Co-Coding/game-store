import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user.models';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginandregisterService {

  urlUsers = 'https://gamestore-8c4e3.firebaseio.com/Users'
  url = 'https://identitytoolkit.googleapis.com/v1/'
  API_KEY = 'AIzaSyDpizLoAJiAt6FzNI7dGrvAWCY4OvuJEXU'

  user: UserModel 




  // Sign UP 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]'

  // Sign IN https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor( private http:HttpClient ) { }

  private currentLoggedIn = new BehaviorSubject(false);
  Logged = this.currentLoggedIn.asObservable();


  youAreLogged(logged:boolean){
    this.currentLoggedIn.next(logged)
  }

  getUserInfo(user:UserModel){
    return this.http.get( `${this.urlUsers}.json`)
    .pipe( 
      map( resp => {

        const userArray: UserModel[] = [];
        
        if (resp === null) { return []; }

        Object.keys(resp).forEach( key => {
          const user: UserModel = resp[key];
          user.id = key
          userArray.push( user )

        })

        let userInfo = userArray.find( users => users.email === user.email  )

        this.user = userInfo
        
        return userInfo
      })
      );
  }

  login( user:UserModel ){
    const authData = {
      ...user,
      returnSecureToken: true
    };
    

    return this.http.post( 
      `${this.url}accounts:signInWithPassword?key=${this.API_KEY}`, authData );


  }

  saveUser(user:UserModel){
    return this.http.post( `${this.urlUsers}.json`, user )
  }

  signUp( user:UserModel ){
    const authData = {
      ...user,
      returnSecureToken: true
    }
   return this.http.post( `${this.url}accounts:signUp?key=${this.API_KEY}`,authData );
  }
  




}




