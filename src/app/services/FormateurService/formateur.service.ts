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
}