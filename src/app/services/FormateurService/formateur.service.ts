import { Injectable } from '@angular/core';

import { Formateur } from '../../entities/Formateur';


import {HttpClient} from '@angular/common/http';
import {AND, API_URL, INCIDENT_AND_QUERY, INCIDENT_OR_QUERY} from '../../Utils/constantes';
@Injectable({
  providedIn: 'root'
})
export class FormateurService {


  Formateur : any;
  constructor(private http: HttpClient) { }


  findAllFormateurs() {

    return this.http.get(API_URL + '/Formateur/find/all' );

   }

   deleteFormateur(id : string) {
     this.http.delete(API_URL + '/Formateur/delete/'+ id ).subscribe(() => console.log('Delete successful'));
  };

    editFormateur(Formateur: Formateur) {
    return this.http.patch(API_URL+'/Formateur/update',Formateur);
  }

   addFormateur(Formateur: Formateur) {
    return this.http.post(API_URL + '/Formateur/add_formateur', Formateur);
  }
}