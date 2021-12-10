import { Injectable } from '@angular/core';

import { Formation } from '../../entities/Formation';


import {HttpClient} from '@angular/common/http';
import {AND, API_URL, INCIDENT_AND_QUERY, INCIDENT_OR_QUERY} from '../../Utils/constantes';

@Injectable({
  providedIn: 'root'
})
export class FormationService {
   

  Formation : any;
  constructor(private http: HttpClient) { }
  

  findAllFormations() {

    return this.http.get(API_URL + '/Formation/find/all' );

   }
}
