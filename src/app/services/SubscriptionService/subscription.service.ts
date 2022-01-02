import { Injectable } from '@angular/core';

import { Subscription } from '../../entities/Subscription';


import {HttpClient} from '@angular/common/http';
import {AND, API_URL, INCIDENT_AND_QUERY, INCIDENT_OR_QUERY} from '../../Utils/constantes';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
   
  Fetchedsubscriptions = new BehaviorSubject(null);
  Subscription : any;
  constructor(private http: HttpClient) { }
  

  deleteSubscription(id : string) {
     console.log("on delete method");
     this.http.delete(API_URL + '/Subscription/delete/'+ id ).subscribe(() => console.log('Delete successful'));
  };

  addSubscription(subscription: Subscription) {
    return this.http.post(API_URL + '/Subscription/add_Formation', subscription);
  }

  editSubscription(subscription: Subscription) {
    return this.http.patch(API_URL+'/Subscription/update',subscription);
  }

  findAllSubscriptions() {

    return this.http.get(API_URL + '/Subscription/find/all' );

   }
}
