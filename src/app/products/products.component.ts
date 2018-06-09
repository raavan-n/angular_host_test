import { Component, OnInit, Input } from '@angular/core';
import * as firebase from 'firebase';

import { AuthService } from '../auth.service';
import { UserOpsService } from '../user/services/user-ops.service';
import { CartService } from './services/cart.service';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Router } from '@angular/router';
import { CartComponent } from './cart/cart.component';

interface item {
  company: string;
  imgLink: string;
  pNames: string;
  price: number;
}

interface itemId extends item { 
  id: string; 
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {

	// public isLoggedIn: string;
	public itemsCol: AngularFirestoreCollection<item>;
	// public items: Observable<item[]>;
	public items: any;
	public term:string;

	// public carts: string[] = [];
	// public id:string;

	itemDoc: AngularFirestoreDocument<item>;
  	Item: Observable<item>;

	constructor(private authService: AuthService, 
		private cartService: CartService,
		private db: AngularFirestore, 
		private router: Router, 
		private user: UserOpsService) {}

	ngOnInit() {
		this.fetchData();
		this.authService.checkIfLoggedIn();		
	}

	fetchData(){
		this.itemsCol = this.db.collection('/items');
		// this.items = this.itemsCol.valueChanges();

		this.items = this.itemsCol.snapshotChanges()
	      .map(actions => {
	        return actions.map(a => {
	          const data = a.payload.doc.data() as item;
	          const id = a.payload.doc.id;
	          return { id, data };
	        });
	      });
	}

	addToCart(itemId){
		this.cartService.servAddToCart(itemId);
	}

	getItem(itemId){
		this.itemDoc = this.db.doc('items/'+itemId);
    	this.Item = this.itemDoc.valueChanges();
	}

	signOut(){

		console.log("Aala");
		this.authService.Out();

	}

}
