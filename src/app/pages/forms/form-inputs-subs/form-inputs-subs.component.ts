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
  this.subscriptionService.addSubscription(this.subscrption).subscribe(
    data => {
           console.log(data);
           if (data == 1) {
            this.show_success = true;
            this.mailObject.email = this.listclients.filter(arg =>arg.id == this.subscrption.client?.id)[0].email;
            var name = this.listclients.filter(arg =>arg.id == this.subscrption.client?.id)[0].nom;
            var formation = this.listformation.filter(arg =>arg.id == this.subscrption.formation?.id)[0].nom;
            this.mailObject.body = this.buildEmail(name,formation,this.subscrption.date_fin)
            console.log(name);
            console.log(formation);
            console.log(this.subscrption.date_fin);
            this.mailObject.subject = "Renouvellement de formation avec Himaya.ma";
            this.mailObject.timeZone = "Europe/Paris";
            this.mailSchedulerService.scheduleEmail(this.mailObject).subscribe( data =>{
              console.log(data);
            })

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

buildEmail(name : String , formation : String ,date_fin : String) {
  return "<div style=\"font-family:Helvetica,Arial,sans-serif;font-size:16px;margin:0;color:#0b0c0c\">\n" +
          "\n" +
          "<span style=\"display:none;font-size:1px;color:#fff;max-height:0\"></span>\n" +
          "\n" +
          "  <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;min-width:100%;width:100%!important\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n" +
          "    <tbody><tr>\n" +
          "      <td width=\"100%\" height=\"53\" bgcolor=\"#0b0c0c\">\n" +
          "        \n" +
          "        <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;max-width:580px\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\">\n" +
          "          <tbody><tr>\n" +
          "            <td width=\"70\" bgcolor=\"#0b0c0c\" valign=\"middle\">\n" +
          "                <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
          "                  <tbody><tr>\n" +
          "                    <td style=\"padding-left:10px\">\n" +
          "                  \n" +
          "                    </td>\n" +
          "                    <td style=\"font-size:28px;line-height:1.315789474;Margin-top:4px;padding-left:10px\">\n" +
          "                      <span style=\"font-family:Helvetica,Arial,sans-serif;font-weight:700;color:#ffffff;text-decoration:none;vertical-align:top;display:inline-block\">Demande de renouvellement de formation avec Himaya.ma</span>\n" +
          "                    </td>\n" +
          "                  </tr>\n" +
          "                </tbody></table>\n" +
          "              </a>\n" +
          "            </td>\n" +
          "          </tr>\n" +
          "        </tbody></table>\n" +
          "        \n" +
          "      </td>\n" +
          "    </tr>\n" +
          "  </tbody></table>\n" +
          "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
          "    <tbody><tr>\n" +
          "      <td width=\"10\" height=\"10\" valign=\"middle\"></td>\n" +
          "      <td>\n" +
          "        \n" +
          "                <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
          "                  <tbody><tr>\n" +
          "                    <td bgcolor=\"#1D70B8\" width=\"100%\" height=\"10\"></td>\n" +
          "                  </tr>\n" +
          "                </tbody></table>\n" +
          "        \n" +
          "      </td>\n" +
          "      <td width=\"10\" valign=\"middle\" height=\"10\"></td>\n" +
          "    </tr>\n" +
          "  </tbody></table>\n" +
          "\n" +
          "\n" +
          "\n" +
          "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
          "    <tbody><tr>\n" +
          "      <td height=\"30\"><br></td>\n" +
          "    </tr>\n" +
          "    <tr>\n" +
          "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
          "      <td style=\"font-family:Helvetica,Arial,sans-serif;font-size:19px;line-height:1.315789474;max-width:560px\">\n" +
          "        \n" +
          "            <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">Bonjour " + name + ",</p><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> Himaya.ma vous informe qu'il vous reste un mois avant l'expiration de votre abonnement à la  formation sur " +formation+ "  le :" +date_fin+". Cela fait une langue durée que nous vous avons rencontré pour la première fois, et nous attendons avec impatience encore de nombreuses années ! Ne manquez pas toutes les choses que Himaya a à offrir aux ses clients ! </p>" +
          "        \n" +
          "        \n" +
          "            <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">La bonne nouvelle, c'est qu'il est encore temps de renouveler votre abonnement.</p>" +
          "        \n" +
          "        \n" +
          "            <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">Appelez-nous au numéro de téléphone visible sur note site web Himaay.ma et nous renouvellerons votre adhésion par téléphone avec une carte de crédit.</p>" +
          "        \n" +
          "        \n" +
          "            <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">Assurez-vous de nous faire savoir si vous avez des questions ou des commentaires.</p>" +
          "        \n" +
          "        \n" +
          "            <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">Merci de votre confiance!.</p>" +
          "        \n" +

          "      </td>\n" +
          "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
          "    </tr>\n" +
          "    <tr>\n" +
          "      <td height=\"30\"><br></td>\n" +
          "    </tr>\n" +
          "  </tbody></table><div class=\"yj6qo\"></div><div class=\"adL\">\n" +
          "\n" +
          "</div></div>";
}

}
