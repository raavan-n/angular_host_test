import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { AuthService } from '../../auth.service';

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
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

	public itemsCol: AngularFirestoreCollection<item>;
	// public items: Observable<item[]>;
	public items: any;
	public users: any;

	public company:string;
	public imgLink:string;
	public pName:string;
	public price:string;
	public term:string;

	itemDoc: AngularFirestoreDocument<item>;
  	Item: Observable<item>;


  constructor(private db: AngularFirestore,
	private authService: AuthService) { }

	ngOnInit() {
		this.fetchData();
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

	deleteItem(itemId){
		this.db.collection('/items').doc(itemId).delete();
	}

	addNewProduct(){
		this.db.collection('/items').add({
		  "company": this.company,
		  "imgLink": this.imgLink,
		  "pName": this.pName,
		  "price": this.price
		}).then((data) => {
		  console.log('Added document with ID: ', data.id);
		});
	}

}
