import { Component, OnInit } from '@angular/core';
import { Formateur } from '../../../entities/Formateur';

import { FormateurService } from '../../../services/FormateurService/formateur.service';
import { FileService } from '../../../services/FiIeUploadService/file.service';
import { getUniqueId } from '../../../services/helpers/Id_genertor';

@Component({
  selector: 'ngx-form-inputs-formateur',
  templateUrl: './form-inputs-formateur.component.html',
  styleUrls: ['./form-inputs-formateur.component.scss']
})
export class FormInputsFormateurComponent {
  
    Formateur: Formateur;
    show_success:  boolean;
    show_warning:  boolean;
     selectedFile: File;
  constructor(private formateurService : FormateurService,private fileService : FileService) { 
    this.Formateur = new Formateur();
  }
onFileChanged(event) {
     this.selectedFile = event.target.files[0]
     console.log(this.selectedFile)
  }

 add() {
  const myId = getUniqueId(1);
  this.Formateur.id = myId;
  console.log(this.Formateur)
  this.formateurService.addFormateur(this.Formateur).subscribe(
    data => {
           console.log(data);
         
    },
    err => {
      console.log(err.status)
      if(err.status == 200){
   
       this.show_success = true;
     

      }
      else{
        this.show_warning= true;
        this.fileService.UploadFile(this.selectedFile).subscribe(
          data => {
                 console.log(data);
               
          }
          )
         
      }
    }

  );
 
}

}
