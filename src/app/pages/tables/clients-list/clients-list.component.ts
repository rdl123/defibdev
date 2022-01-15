import { Component, ViewChild } from '@angular/core';
import { Ng2SmartTableComponent,LocalDataSource } from 'ng2-smart-table';
import { ClientService } from '../../../services/ClientService/client.service';
import { SmartTableData } from '../../../@core/data/smart-table';
import { Client } from '../../../entities/Clients';
import { Router } from '@angular/router';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { ngxCsv } from 'ngx-csv/ngx-csv';
// import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
})
export class ClientslistComponent {
  // formData: FormGroup = this.formBuilder.group({
  //   username: [null],
  //   fullname: [null],
  //   password: [null],
  //   organisme: [null],
  //   email: [null],
  //   telephone: [null],
  //   secteurUser : [null]
  //   });
  show_success:  boolean;
  show_warning:  boolean;
  Client : Client;
  listclients : any;
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
        title: 'ID',
        type: 'number',
      },
      nom: {
        title: 'Last Name',
        type: 'string',
      },
      prenom: {
        title: 'First Name',
        type: 'string',
      },
      cin: {
        title: 'CIN',
        type: 'string',
      },
      gsm: {
        title: 'GSM',
        type: 'string',
      },
      email: {
        title: 'Email',
        type: 'string',
      },
      ville: {
        title: 'Ville',
        type: 'string',
      },
      adresse: {
        title: 'Adresse',
        type: 'string',
      },
    },
  };
    

  source: LocalDataSource = new LocalDataSource();

  @ViewChild('table')
  smartTable: Ng2SmartTableComponent;
  public editClient: Client;
  constructor(private service: SmartTableData,
              private clientService : ClientService,
              private router: Router,
              // private formBuilder: FormBuilder
              ) {
    this.editClient = new Client();
    this.Client = new Client();
    const data = this.service.getData();
    //console.log(data);
    this.source.load(data);
  }

  ngOnInit(){
    this.clientService.findAllClients().subscribe( data =>{
      this.listclients = data;
      //console.log(this.listclients)
      this.source.load(this.listclients);
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
    this.router.navigateByUrl('/pages/forms/inputs-client');
  }
  onDelete(e){
    console.log("delete clicked");
    console.log(e.data.id); 
    this.clientService.deleteClient(e.data.id);
  }

  public onOpenModal(e : any, mode : string){
    const container = document.getElementById('container')
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle','modal');
    if (mode == 'edit'){
      this.editClient = e;
      button.setAttribute('data-target','#editClientModal');
    }
    container.appendChild(button);
    button.click();

  }

  Editer() {
    //const myId = getUniqueId(1);
   // this.Client.id = myId;
    this.clientService.editClient(this.editClient).subscribe(
      data => {
             console.log(data);   
      },
      err => {
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
      headers: ["Identifient","Nom", "Prénom", "CIN", "GSM","Email"]
    };

    new ngxCsv(this.listclients,"Rapport",options);
   
  }

}
