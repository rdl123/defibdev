import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Ng2SmartTableComponent,LocalDataSource } from 'ng2-smart-table';

import { FormationService } from '../../../services/FormationService/formation.service';
import { SmartTableData } from '../../../@core/data/smart-table';

import { Router } from '@angular/router';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { Formation } from '../../../entities/Formation';
import { Subscription } from '../../../entities/Subscription';
import { SubscriptionService } from '../../../services/SubscriptionService/subscription.service';
import { NbDateService, NbDialogRef,NbDialogService  } from '@nebular/theme';
import { FormateurService } from '../../../services/FormateurService/formateur.service';
import { ngxCsv } from 'ngx-csv';
import { MailObject } from '../../../entities/MailObject';
import { ClientService } from '../../../services/ClientService/client.service';
import { MailSchedulerService } from '../../../services/MailScheduler/mail-scheduler.service';


// import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
})
export class SubscriptionslistComponent {
  // formData: FormGroup = this.formBuilder.group({
  //   username: [null],
  //   fullname: [null],
  //   password: [null],
  //   organisme: [null],
  //   email: [null],
  //   telephone: [null],
  //   secteurUser : [null]
  //   });
  min: Date;
  max: Date;
  show_success:  boolean;
  show_warning:  boolean;
  NewFormateurvalue = null;
  NewDateStart = null;
  NewDateEnd = null;
  selectedsubscription : any;
  selectedFormateurid = 1;
  selectedclientid =1;
  selectedformationid=1;
  subscription : Subscription;
  listsubscriptions : any;
  listsubscriptionsformatted : any;
  subscriptions :any;
  listformateurs : any;
  listformations: any;
  listclients : any;
  mailObject : MailObject;
  settings = {
    mode: 'external',
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID de la formation',
        type: 'number',
      },
      formation: {
        title: 'Nom de la formation',
        type: 'string',
      },
      date_debut : {
        title: 'Date debut de la formation',
        type: 'string',
      },
      date_fin: {
        title: 'Date de fin de la formation',
        type: 'string',
      },
      client: {
        title: 'Nom du client',
        type: 'string',
      },
      formateur: {
        title: 'Nom du formateur',
        type: 'string',
      },
      responsable: {
        title: 'Nom du responsable',
        type: 'string',
      },
      isConfirmed: {
        title: 'Formation confirmée',
        type: 'string',
      }
    },
  };
    

  source: LocalDataSource = new LocalDataSource();

  @ViewChild('table')
  smartTable: Ng2SmartTableComponent;
  public editSubscription: Subscription;
  constructor(private service: SmartTableData,
              private subsService : SubscriptionService,
              private router: Router,
              protected dateService: NbDateService<Date>,
              private formateurService : FormateurService,
              private dialogService: NbDialogService,
              private formationService : FormationService,
              private clientService : ClientService,
              private  mailSchedulerService : MailSchedulerService
              // private formBuilder: FormBuilder,

              ) {
    this.min = this.dateService.addDay(this.dateService.today(), -5);
    this.max = this.dateService.addDay(this.dateService.today(), 5);
    this.editSubscription = new Subscription();
    this.subscription = new Subscription();
    const data = this.service.getData();
    //console.log(data);
    this.source.load(data);
    this.mailObject = new MailObject();
  }

  ngOnInit(){

    this.formateurService.findAllFormateurs().subscribe(data => {
      this.listformateurs = data;
    });
    this.clientService.findAllClients().subscribe(data => {
      this.listclients = data;
    });
    this.formationService.findAllFormations().subscribe(data => {
      this.listformations = data;
    });
    this.subsService.findAllSubscriptions().subscribe( data =>{
      this.subscriptions = data;
    });
    this.subsService.findAllSubscriptions().subscribe( data =>{
      this.listsubscriptions = data;
      this.listsubscriptions.forEach(function (arg) {
        arg.formation.description =  null;
    });
       this.listsubscriptionsformatted = data;
      this.listsubscriptionsformatted.forEach(function (item) {
        item.client =    item.client.nom;
        item.formateur = item.formateur.nom;
        item.formation = item.formation.nom;
        item.responsable = item.responsable.nom;
    });
    this.source.load(this.listsubscriptionsformatted);
    })
      
  }

  // ngAfterViewInit(): void {
  //   console.log('Values on ngAfterViewInit():');
  //   this.smartTable.edit.subscribe( (dataObject: any) => {
  //     console.log('Edit');
  //     console.log(dataObject);
  //   });
  //   this.smartTable.delete.subscribe( (dataObject: any) => {
  //     console.log('Delete');
  //     console.log(dataObject);
  //   });
  //   this.smartTable.create.subscribe( (dataObject: any) => {
  //     console.log('Create');
  //     console.log(dataObject);
  //   });
  // }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
  onCreate(e){
    console.log("add cusomized");
    this.router.navigateByUrl('/pages/forms/inputs-subs');
  }
  onDelete(e){
    console.log("delete clicked");
    console.log(e.data.id); 
    this.subsService.deleteSubscription(e.data.id);
    window.location.reload();
  }

  public onOpenModal(e : any, mode : string){
    const container = document.getElementById('container')
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle','modal');
    if (mode == 'edit'){
      this.editSubscription = e;
      button.setAttribute('data-target','#editSubscriptionModal');
    }
    container.appendChild(button);
    button.click();

  }
  public opnDialog(dialog: TemplateRef<any> , e : any,){

    this.editSubscription =e;
    // var initialdata = localStorage.getItem("Initialdata");
    // var current_formateur_id = JSON.parse(initialdata);
    // this.selectedsubscription= current_formateur_id.filter(a => a.id==e.id);
    // this.selectedFormateurid = this.selectedsubscription[0].formateur.id;
    // this.selectedclientid= this.selectedsubscription[0].client.id;
    // this.selectedformationid= this.selectedsubscription[0].formation.id;
    const dialogRef = this.dialogService.open(dialog, {
      context: {
        title: 'Enter template name',
        myObject: e,
      }, dialogClass: 'model-full'
    })
    dialogRef.onClose.subscribe((resp) => {
      console.log(`dialog closed`);
      console.log(resp);
    });
  }
  onMenuItemSelected(e){
    this.NewFormateurvalue = e;
  }
  onStartDateChanged(e){
    e.setHours( e.getHours() + 1 );
    this.NewDateStart = e.toISOString().split('T')[0];
 
  }
  onendDateChanged(e){
    e.setHours( e.getHours() + 1 );
    this.NewDateEnd = e.toISOString().split('T')[0];
  }
  ValiderFormation(e){
    this.subsService.validateTraining(e).subscribe(
      data => {
             console.log(data); 
             this.programMailToClient(e);
      },
      err =>{
        console.log(err);
      });
  }
  Editer() {
    var oldformation = this.editSubscription.formation ;
    var oldclient = this.editSubscription.client ;
    var oldformateur = this.editSubscription.formateur ;
    if(this.NewDateStart != null){
      this.editSubscription.date_debut = this.NewDateStart;
    }
    if(this.NewDateEnd != null){
      this.editSubscription.date_fin   = this.NewDateEnd;
    }
   if(this.NewFormateurvalue != null){
    let filtredformateurlist = this.listformateurs.filter(e=>
      e.id == this.NewFormateurvalue)
      this.editSubscription.formateur = filtredformateurlist[0];
   }
    this.editSubscription.client = null;
    this.editSubscription.formation = null;
     this.subsService.editSubscription(this.editSubscription).subscribe(
       data => {
              console.log(data); 
              window.location.reload();
       },
       err => {
        this.editSubscription.client = oldclient;
        this.editSubscription.formation = oldformation;
        this.editSubscription.formateur = oldformateur;
         console.log(err.status)
       if(err.status == 200){
          this.show_success = true;
          window.location.reload();
         }
        else{
           this.show_warning= true;
         }
       }
  
    );
  
  }

  
  DownloadData() {
    var options = { 
  fieldSeparator: ',',
  quoteStrings: '"',
  decimalseparator: '.',
  showLabels: true, 
  showTitle: true,
  title: 'Rapport des clients',
  useBom: true,
  noDownload: false,
  headers: ["Identifient","Nom de la formation", "Date de début", "Date de fin", "Client","Formateur","Responsable"]
};

new ngxCsv(this.listsubscriptionsformatted,"Rapport des clients",options);
}

  programMailToClient(e){
  var subscription = this.subscriptions.filter(arg=>arg.id == e)[0]
  console.log(subscription.client);
  console.log(subscription.client.email);
   this.mailObject.email = subscription.client.email ;
   var name = subscription.client.nom;
   var formation = subscription.formation.nom ;
   this.mailObject.body = this.buildEmail(name,formation,subscription.date_fin)
   console.log(name);
   console.log(formation);
   console.log(this.subscriptions.date_fin);
   this.mailObject.subject = "Renouvellement de formation avec Himaya.ma";
   this.mailObject.timeZone = "Africa/Casablanca";
   //Temporary code to set end dat as today date + 1 minute to get the mail next min
   var today = new Date();
   today.setHours(today.getHours());
   today.setMinutes(today.getMinutes() +1);
   var shedueledTime = today.toISOString().split('.')[0];
   this.mailObject.dateTime = shedueledTime;
   this.mailSchedulerService.scheduleEmail(this.mailObject).subscribe( data =>{
     console.log(data);
     window.location.reload();
   })
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
