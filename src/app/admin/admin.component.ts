import { Component, OnInit, Input } from '@angular/core';

import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { AuthService } from '../auth.service';

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
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

	public itemsCol: AngularFirestoreCollection<item>;
	// public items: Observable<item[]>;
	public items: any;


	itemDoc: AngularFirestoreDocument<item>;
  	Item: Observable<item>;


  constructor(
	private db: AngularFirestore,
	private authService: AuthService
  	) {}

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

	signOut(){
		console.log("Aala");
		this.authService.Out();
	}

}
