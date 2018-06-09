import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';


@Injectable({
  providedIn: 'root'
})
export class UserOpsService {
	// public isLoggedIn: boolean;
	// public users: Observable<any[]>;

	constructor(private router: Router, private db: AngularFirestore) {
		firebase.auth().onAuthStateChanged(function(user) {
		  if (user) {
		    // User is signed in.
		    // this.isLoggedIn = true;
		    // console.log("signed in " + JSON.stringify(user));
		    // this.users = user;
		  } else {
		    // No user is signed in.
		    // this.isLoggedIn = false;
		  	// console.log("lasan "+ this.isLoggedIn);
		  	router.navigate(['/user/signin']);
		  }
		});
	}
}
