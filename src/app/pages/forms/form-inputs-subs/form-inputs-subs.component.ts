import { Component, ComponentFactoryResolver } from '@angular/core';
import { Client } from '../../../entities/Clients';
import { Formation } from '../../../entities/Formation';
import { Subscription } from '../../../entities/Subscription';
import { MailObject } from '../../../entities/MailObject';

import { ClientService } from '../../../services/ClientService/client.service';
import { getUniqueId } from '../../../services/helpers/Id_genertor';
import { FormationService } from '../../../services/FormationService/formation.service';
import { CategorieService } from '../../../services/CategorieService/categorie.service';
import { FormateurService } from '../../../services/FormateurService/formateur.service';
import { SubscriptionService } from '../../../services/SubscriptionService/subscription.service';
import { ResponsableService } from '../../../services/ResponsableService/responsable.service';
import { MailSchedulerService } from '../../../services/MailScheduler/mail-scheduler.service';
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
    listresponsables : any;
    NewDateStart = null;
    NewDateEnd = null;
    formation: Formation;
    mailObject : MailObject;
    subscrption : Subscription;
    show_success:  boolean;
    show_warning:  boolean;

  constructor( private formationService : FormationService,
               private clientService : ClientService,
               private formateurService : FormateurService,
               private subscriptionService : SubscriptionService,
               private responsableService : ResponsableService,
               private  mailSchedulerService : MailSchedulerService
               ) {
          this.formation = new Formation();
          this.subscrption = new Subscription();
          this.mailObject = new MailObject();
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
  this.responsableService.findAllResponsables().subscribe(data =>{
    this.listresponsables = data;
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
onresponsableSelected(e){
  this.subscrption.responsable = this.listresponsables.filter(arg =>arg.id == e)[0];
}
onStartDateChanged(e){
  e.setHours( e.getHours() + 1 );
  this.NewDateStart = e.toISOString().split('T')[0];
  this.subscrption.date_debut = this.NewDateStart;

}
onEndDateChanged(e){
  e.setHours( e.getHours() + 1 );
  var today = new Date();
  today.setHours(today.getHours() +1);
  today.setMinutes(today.getMinutes() +1);
  var shedueledTime = today.toISOString().split('.')[0];
  this.mailObject.dateTime = shedueledTime;
  console.log(this.mailObject.dateTime);
  this.NewDateEnd = e.toISOString().split('T')[0];
  this.subscrption.date_fin = this.NewDateEnd;
}
add() {
  this.subscrption.isConfirmed = "Non";
  this.subscriptionService.addSubscription(this.subscrption).subscribe(
    data => {
           console.log(data);
           if (data == 1) {
            this.show_success = true;
       

          }
          else {
            this.show_warning= true;
          }   
    },
    err => {
      console.log(err.status)
    }

  );
 
}



}
