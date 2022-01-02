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
  listformateurs : any;
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

              // private formBuilder: FormBuilder,

              ) {
    this.min = this.dateService.addDay(this.dateService.today(), -5);
    this.max = this.dateService.addDay(this.dateService.today(), 5);
    this.editSubscription = new Subscription();
    this.subscription = new Subscription();
    const data = this.service.getData();
    //console.log(data);
    this.source.load(data);
  }

  ngOnInit(){

    this.formateurService.findAllFormateurs().subscribe(data => {
      this.listformateurs = data;
    });
    this.subsService.findAllSubscriptions().subscribe( data =>{
      this.listsubscriptions = data;
      this.listsubscriptions.forEach(function (arg) {
        arg.formation.description =  null;
    });
 
      localStorage.setItem("Initialdata",JSON.stringify(this.listsubscriptions));   
      this.listsubscriptionsformatted = data;
      this.listsubscriptionsformatted.forEach(function (item) {
        item.client =    item.client.nom;
        item.formateur = item.formateur.nom;
        item.formation = item.formation.nom;
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
    this.router.navigateByUrl('/pages/forms/inputs-formation');
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
    this.NewDateStart = e.toISOString().split('T')[0];
 
  }
  onendDateChanged(e){
    this.NewDateEnd = e.toISOString().split('T')[0];
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
  headers: ["Identifient","Nom de la formation", "Date de début", "Date de fin", "Client","Formateur"]
};

new ngxCsv(this.listsubscriptionsformatted,"Rapport",options);
}

}
