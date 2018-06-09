import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  constructor(){}

  ngOnInit(){
  	firebase.initializeApp({

  		apiKey: "AIzaSyBzpWQ2zbfSwlQkm1zAF2H_fze4_KtV9fM",
	    authDomain: "cart-515d5.firebaseapp.com",
	    projectId: "cart-515d5",

  	});
  }
}
