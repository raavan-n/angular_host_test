import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { 
          AngularFirestore,
          AngularFirestoreCollection,
          AngularFirestoreDocument 
       } from 'angularfire2/firestore';

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  shippingAddress?: string;
  phoneNumber?: string;
  role?: string;
}

interface item {
  company: string;
  imgLink: string;
  pNames: string;
  price: number;
}

interface itemId extends item { 
  id: string; 
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public itemsCol: AngularFirestoreCollection<item>;
  // public items: Observable<item[]>;
  public items: any;

  // public carts: string[] = [];
  // public id:string;

  itemDoc: AngularFirestoreDocument<item>;
  item: Observable<item>;

  public user: any;

  constructor(private router: Router, private db: AngularFirestore) { }

  checkRole(doc){
    console.log(doc);
    let r: string = "";
    let _self = this;
    // this.itemsCol = this.db.collection('/user');
    this.user = this.db.collection('/user').doc(doc).valueChanges();

    this.user.forEach(function(value){
      console.log("value "+JSON.stringify(value));
      if(value.role == "n"){
        r = "n";
        console.log("Normal"+r);
        _self.router.navigate(['/products']);
      } else if(value.role == "a"){
        r = "a";
        console.log("admin"+ r);
        _self.router.navigate(['/admin/products']);
      }
    });
  }

  signUp(email: string, password: string){
  	firebase.auth().createUserWithEmailAndPassword(email, password)
  	.then(
      (success) => {

        const data: User = {
          uid: success.user.uid,
          email: success.user.email,
          displayName: success.user.displayName,
          photoURL: success.user.photoURL,
          shippingAddress: "N/A",
          phoneNumber: "N/A",
          role: "n"
        }
        console.log(data);

        // console.log("normal "+this.user);
        // console.log("json stringify"+JSON.stringify(this.user));
        this.db.collection('/user').doc(success.user.uid).set(data)
        .then(() => {
          console.log("User data uploaded");
        })
        .catch((error) => {
          console.log("Error user data upload hagla = "+ error);
        });
        this.router.navigate(['/user/signin']);
  		}
  	)
  	.catch(
      (error) => {
        console.log("Email pass func error"+error);
      }
    );
  }

  signIn(email: string, password: string){
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(
      (success) => {
        // console.log("success = "+ JSON.stringify(success));
        this.checkRole(success.user.uid);
      }
    )
    .catch(
        (error) => {
          console.log(error);
        }
    );
  }

  Out(){
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      this.router.navigate(['/user']);
    }).catch(function(error) {
      // An error happened.
      console.log(error);
    });
  }

  checkIfLoggedIn(){
    firebase.auth().onAuthStateChanged(function(user) {
      // console.log("auth.service User"+JSON.stringify(user));
    });
  }

}
