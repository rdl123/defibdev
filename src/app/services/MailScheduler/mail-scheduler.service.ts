import { Injectable } from '@angular/core';

import { MailObject } from '../../entities/MailObject';


import {HttpClient} from '@angular/common/http';
import {AND, API_URL, INCIDENT_AND_QUERY, INCIDENT_OR_QUERY} from '../../Utils/constantes';

@Injectable({
  providedIn: 'root'
})
export class MailSchedulerService {

  MailObject : any;

  constructor(private http: HttpClient) {
  }

  scheduleEmail(mailObject:MailObject) {

    return this.http.post(API_URL + '/scheduleEmail', mailObject);

   }
}