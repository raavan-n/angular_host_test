import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

	public users: any;


 constructor(private db: AngularFirestore,
	private authService: AuthService) { }


  ngOnInit() {
  	this.fetchData();
  }

  	fetchData(){
	      this.users = this.db.collection('/user').snapshotChanges()
	      .map(actions => {
	        return actions.map(a => {
	          const data = a.payload.doc.data();
	          const id = a.payload.doc.id;
	          return { id, data };
	        });
	      });

	      this.users.forEach(function(item){
		    	console.log(item);
		    });

	}

}
