import { Injectable } from '@angular/core';

import { Responsable } from '../../entities/Responsable';


import {HttpClient} from '@angular/common/http';
import {AND, API_URL, INCIDENT_AND_QUERY, INCIDENT_OR_QUERY} from '../../Utils/constantes';
@Injectable({
  providedIn: 'root'
})
export class ResponsableService {


  Formateur : any;
  constructor(private http: HttpClient) { }


  findAllResponsables() {

    return this.http.get(API_URL + '/Responsable/find/all' );

   }

   deleteResponsable(id : string) {
     this.http.delete(API_URL + '/Responsable/delete/'+ id ).subscribe(() => console.log('Delete successful'));
  };

    editResponsable(responsable: Responsable) {
    return this.http.patch(API_URL+'/Responsable/update',responsable);
  }

   addResponsable(responsable: Responsable) {
    return this.http.post(API_URL + '/Responsable/add_responsable', responsable);
  }
}