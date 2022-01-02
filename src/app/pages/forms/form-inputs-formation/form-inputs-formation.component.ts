import { Component, ComponentFactoryResolver } from '@angular/core';
import { Client } from '../../../entities/Clients';
import { Formation } from '../../../entities/Formation';

import { ClientService } from '../../../services/ClientService/client.service';
import { getUniqueId } from '../../../services/helpers/Id_genertor';
import { FormationService } from '../../../services/FormationService/formation.service';
import { CategorieService } from '../../../services/CategorieService/categorie.service';

@Component({
  selector: 'ngx-form-inputs',
  styleUrls: ['./form-inputs.component.scss'],
  templateUrl: './form-inputs.component.html',

})
export class FormInputsFormationComponent{
   
    listcategorie : any;
    formation: Formation;
    show_success:  boolean;
    show_warning:  boolean;

  constructor( private formationService : FormationService,
          private categorieService : CategorieService) {
          this.formation = new Formation();
}

ngOnInit(){
  this.categorieService.findAllCategories().subscribe( data =>{
    console.log(data);
    this.listcategorie = data;
  })
}
add() {
  const myId = getUniqueId(1);
  this.formation.id = myId;
  this.formationService.addFormation(this.formation).subscribe(
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
       

      }
    }

  );
 
}

}
