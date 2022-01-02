import { Component, ComponentFactoryResolver } from '@angular/core';
import { Client } from '../../../entities/Clients';
import { Formation } from '../../../entities/Formation';
import { Subscription } from '../../../entities/Subscription';

import { ClientService } from '../../../services/ClientService/client.service';
import { getUniqueId } from '../../../services/helpers/Id_genertor';
import { FormationService } from '../../../services/FormationService/formation.service';
import { CategorieService } from '../../../services/CategorieService/categorie.service';
import { FormateurService } from '../../../services/FormateurService/formateur.service';
import { SubscriptionService } from '../../../services/SubscriptionService/subscription.service';

@Component({
  selector: 'ngx-form-inputs',
  styleUrls: ['./form-inputs.component.scss'],
  templateUrl: './form-inputs.component.html',

})
export class FormInputsSubsComponent{
   
    listcategorie : any;
    listformation : any;
    listclients : any;
    listformateurs : any;
    NewDateStart = null;
    NewDateEnd = null;
    formation: Formation;
    subscrption : Subscription;
    show_success:  boolean;
    show_warning:  boolean;

  constructor( private formationService : FormationService,
               private clientService : ClientService,
               private formateurService : FormateurService,
               private subscriptionService : SubscriptionService,
               ) {
          this.formation = new Formation();
          this.subscrption = new Subscription();
}

ngOnInit(){
  this.formateurService.findAllFormateurs().subscribe(data =>{
    this.listformateurs = data;
  })
  this.clientService.findAllClients().subscribe(data =>{
    this.listclients = data;
  })
  this.formationService.findAllFormations().subscribe(data =>{
    this.listformation = data;
  })

}
onformationSelected(e){
  this.subscrption.formation = this.listformation.filter(arg =>arg.id == e)[0];
 
}
onformateurSelected(e){
  this.subscrption.formateur = this.listformateurs.filter(arg =>arg.id == e)[0];

}
onclientSelected(e){
  this.subscrption.client = this.listclients.filter(arg =>arg.id == e)[0];
}
onStartDateChanged(e){
  this.NewDateStart = e.toISOString().split('T')[0];
  this.subscrption.date_debut = this.NewDateStart;

}
onEndDateChanged(e){
  this.NewDateEnd = e.toISOString().split('T')[0];
  this.subscrption.date_fin = this.NewDateEnd;
}
add() {
  const myId = getUniqueId(1);
  this.formation.id = myId;
  this.subscriptionService.addSubscription(this.subscrption).subscribe(
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
