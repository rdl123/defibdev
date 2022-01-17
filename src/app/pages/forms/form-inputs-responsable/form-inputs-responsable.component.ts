import { Component, OnInit } from '@angular/core';
import { Formateur } from '../../../entities/Formateur';

import { FormateurService } from '../../../services/FormateurService/formateur.service';
import { FileService } from '../../../services/FiIeUploadService/file.service';
import { getUniqueId } from '../../../services/helpers/Id_genertor';
import { threadId } from 'worker_threads';
import { ResponsableService } from '../../../services/ResponsableService/responsable.service';
import { Responsable } from '../../../entities/Responsable';

@Component({
  selector: 'ngx-form-inputs-responsable',
  templateUrl: './form-inputs-responsable.component.html',
  styleUrls: ['./form-inputs-responsable.component.scss']
})
export class FormInputsResponsableComponent {
  
    responsable: Responsable;
    show_success:  boolean;
    show_warning:  boolean;
    selectedFile: File;
    imgURL : any
  constructor(private responsableService : ResponsableService) { 
    this.responsable = new Responsable();
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

  console.log(this.responsable)
  this.responsableService.addResponsable(this.responsable).subscribe(
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
