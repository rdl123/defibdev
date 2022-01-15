import { Component, ComponentFactoryResolver } from '@angular/core';
import { Client } from '../../../entities/Clients';
import { Formation } from '../../../entities/Formation';

import { ClientService } from '../../../services/ClientService/client.service';
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
    this.listcategorie = data;
  })
}

onCategorieSelected(e){
 
  this.formation.categorie = this.listcategorie.filter(arg =>arg.id == e)[0];
  console.log( this.formation.categorie)

}
add() { 
  this.formationService.addFormation(this.formation).subscribe(
    data => {
      this.show_success = true;
         
    },
    err => {
   
        this.show_warning= true;
    }

  );
 
}

}
