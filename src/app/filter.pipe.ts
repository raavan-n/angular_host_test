import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items:any, term: any): any {
    if(term === undefined){ return items; }
    return items.filter(function(item){
    	return item.data.company.toLowerCase().includes(term.toLowerCase());
    })
  }

}
