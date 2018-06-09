import { Component, OnInit, Input } from '@angular/core';

import { AuthService } from '../../auth.service';
import { UserOpsService } from '../../user/services/user-ops.service';
import { CartService } from '../services/cart.service';


import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { ProductsComponent } from '../products.component';

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
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {

	// @Input() public carts=[];
	public carts=[];
	public count = [];
	public itemsCol: AngularFirestoreCollection<item>;
	@Input() public items: any;
	
	constructor(private ar: ActivatedRoute, public cartService: CartService) { }

	ngOnInit() {
		this.carts = this.cartService.cart;
		this.count = this.cartService.count;
		// this.items = this.cartService.items;
		// this.cartService.fetchDataFromItemId(this.carts);
	}

	inc(itemId){
		this.cartService.servInc(itemId);
	}

	dec(itemId){
		this.cartService.servDec(itemId);
	}

	checkExists(itemId){
		const index: number = this.carts.indexOf(itemId);
		if(index != -1) return true;
	}

}
