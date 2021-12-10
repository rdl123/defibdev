import { Injectable } from '@angular/core';

import { Categorie } from '../../entities/Categorie';


import {HttpClient} from '@angular/common/http';
import {AND, API_URL, INCIDENT_AND_QUERY, INCIDENT_OR_QUERY} from '../../Utils/constantes';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  Categorie : any;

  constructor(private http: HttpClient) {
  }

  findAllCategories() {

    return this.http.get(API_URL + '/Categorie/find/all' );

   }
}