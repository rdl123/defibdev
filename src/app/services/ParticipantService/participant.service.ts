import { Injectable } from '@angular/core';

import { Participant } from '../../entities/Participant';


import {HttpClient} from '@angular/common/http';
import {AND, API_URL, INCIDENT_AND_QUERY, INCIDENT_OR_QUERY} from '../../Utils/constantes';
@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  Formateur : any;
  constructor(private http: HttpClient) { }


  findAllParticipants() {

    return this.http.get(API_URL + '/Participant/find/all' );

   }

   deleteParticipant(id : string) {
     this.http.delete(API_URL + '/Participant/delete/'+ id ).subscribe(() => console.log('Delete successful'));
  };

    editParticipant(participant: Participant) {
    return this.http.patch(API_URL+'/Participant/update',participant);
  }

   addParticipant(participant: Participant) {
    return this.http.post(API_URL + '/Participant/add_participant', participant);
  }
}
