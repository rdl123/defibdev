import { Component, OnInit } from '@angular/core';

import { ParticipantService } from '../../../services/ParticipantService/participant.service';
import { Participant } from '../../../entities/Participant';
@Component({
  selector: 'ngx-form-inputs-participant',
  templateUrl: './form-inputs-participant.component.html',
  styleUrls: ['./form-inputs-participant.component.scss']
})
export class FormInputsParticipantComponent {

  participant: Participant;
  show_success:  boolean;
  show_warning:  boolean;
  selectedFile: File;
  imgURL : any
constructor(private participantService : ParticipantService) { 
  this.participant= new Participant();
}
onFileChanged(event) {
   this.selectedFile = event.target.files[0]
   var reader = new FileReader();
   reader.readAsDataURL(event.target.files[0]); 
   reader.onload = (_event) => { 
     this.imgURL = reader.result; 
   }
}

add() {

this.participantService.addParticipant(this.participant).subscribe(
  data => {
      this.show_success = true; 
  },
  error => {
    console.log(error.status)
    if(error.status = 200){
      this.show_success = true; 
    }
    else {
      this.show_warning= true;
    }
   
  }
);

}

}
