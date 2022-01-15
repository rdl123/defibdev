import { Component, OnInit } from '@angular/core';
import { Formateur } from '../../../entities/Formateur';

import { FormateurService } from '../../../services/FormateurService/formateur.service';
import { FileService } from '../../../services/FiIeUploadService/file.service';
import { getUniqueId } from '../../../services/helpers/Id_genertor';
import { threadId } from 'worker_threads';

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
    imgURL : any
  constructor(private formateurService : FormateurService,private fileService : FileService) { 
    this.Formateur = new Formateur();
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

  console.log(this.Formateur)
  this.Formateur.photo = this.selectedFile.name;
  this.formateurService.addFormateur(this.Formateur).subscribe(
    data => {
           console.log(data); 
           this.fileService.UploadFormateurFile(this.selectedFile,data).subscribe(
            data => {
                   console.log(data);
                 
                 
            });
  
         this.show_success = true;
    },
    err => {
      console.log(err.status)
        this.show_warning= true;
    }

  );
 
}

}
