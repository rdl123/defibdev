import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Client } from '../entities/Clients';


import {HttpClient} from '@angular/common/http';
import {AND, API_URL, INCIDENT_AND_QUERY, INCIDENT_OR_QUERY} from '../Utils/constantes';
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  Clients : any;

  constructor(private http: HttpClient) {
  }

  findAllClients() {

    return this.http.get(API_URL + '/Client/find/all' );

   }
}
