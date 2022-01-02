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
  

   deleteFormation(id : string) {
     console.log("on delete method");
     this.http.delete(API_URL + '/Formation/delete/'+ id ).subscribe(() => console.log('Delete successful'));
  };

  addFormation(formation: Formation) {
    return this.http.post(API_URL + '/Formation/add_Formation', formation);
  }

  editFormation(formation: Formation) {
    return this.http.patch(API_URL+'/Formation/update',formation);
  }

  findAllFormations() {

    return this.http.get(API_URL + '/Formation/find/all' );

   }
}
