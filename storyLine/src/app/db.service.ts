import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable, throwError, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DbService {
  onAddOneliner = new Subject<any>();

  constructor(private db: AngularFirestore) { }

  insertOneLiner(oneliner) {
    return this.db.collection('oneliners')
      .doc(this.db.createId())
      .set(oneliner);
  }

  getOneLiners(): any {
    return this.db.collection('oneliners').get();
  }

}
