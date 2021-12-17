import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Client } from '../../entities/Clients';
import {HttpClient} from '@angular/common/http';
import {AND, API_URL, INCIDENT_AND_QUERY, INCIDENT_OR_QUERY} from '../../Utils/constantes';
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clientSelected = new Subject<Client>();
  Clients : any;

  constructor(private http: HttpClient) {
  }

  findAllClients() {

    return this.http.get(API_URL + '/Client/find/all' );

   }

   deleteClient(id : string) {
     console.log("on delete method");
     this.http.delete(API_URL + '/Client/delete/'+ id ).subscribe(() => console.log('Delete successful'));
  };

  addClient(Client: Client) {
    return this.http.post(API_URL + '/Client/add_Client', Client);
  }

  

   
}
