import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Router } from '@angular/router';

interface carts {
  id: string;
  count: number;
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
export class CartService {
	public cart: carts[] = [];
	public count = [];
	public itemsCol: AngularFirestoreCollection<item>;
	public items: any;

	constructor(private db: AngularFirestore, 
		private router: Router) { }

	servAddToCart(itemId){
		const index: number = this.cart.indexOf(itemId);
		console.log(index == -1);
		if(index != -1){
			this.count[index] += 1;
		} else {
			this.cart.push(itemId);
			this.count[this.cart.indexOf(itemId)] = 1;
		}
		console.log(itemId);
		console.log("cart "+JSON.stringify(this.cart));
		this.fetchDataFromItemId(itemId);
	}

	servInc(itemId){
		console.log("Increment "+itemId);
		const index: number = this.cart.indexOf(itemId);
	    if (index != -1) {
	        // this.cart.splice(index, 1);
	        this.count[index] += 1;
	    } 
	    console.log("CARt array -> "+this.cart[index]+" Count array -> "+this.count[index]);
		this.cart.forEach(function(item){
			console.log(item);
		});
		this.count.forEach(function(item){
			console.log(item);
		});
	}

	servDec(itemId){
		console.log("Decrement "+itemId);
		const index: number = this.cart.indexOf(itemId);
	    if (this.count[index]-1 <=0 && index != -1) {
	    	this.cart.splice(index, 1);
	    	this.count.splice(index, 1)
	    } else if(this.count[index]-1 > 0){
	    	this.count[index] -= 1;
	    }
	    console.log("CARt array -> "+this.cart[index]+" Count array -> "+this.count[index]);
		console.log("CARt array -> "+this.cart[index]+" Count array -> "+this.count[index]);
		this.cart.forEach(function(item){
			console.log(item);
		});
		this.count.forEach(function(item){
			console.log(item);
		});
	}

	fetchDataFromItemId(itemId){
		this.items = this.db.doc('/items/'+itemId).valueChanges();
		this.items.forEach(function(value){
			console.log(value.company);
		});
		// console.log("items array (cartservice)= "+JSON.stringify(this.items));
	}
	
}
