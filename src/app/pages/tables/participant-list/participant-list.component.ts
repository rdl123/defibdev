import { Component, ViewChild } from '@angular/core';
import { Ng2SmartTableComponent,LocalDataSource } from 'ng2-smart-table';
import { FormateurService } from '../../../services/FormateurService/formateur.service';
import { ParticipantService } from '../../../services/ParticipantService/participant.service';
import { FileService } from '../../../services/FiIeUploadService/file.service';
import { SmartTableData } from '../../../@core/data/smart-table';
import { Formateur } from '../../../entities/Formateur';
import { Router } from '@angular/router';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { ngxCsv } from 'ngx-csv/ngx-csv';

import { Participant } from '../../../entities/Participant';

@Component({
  selector: 'ngx-participant-list',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss']
})
export class ParticipantListComponent  {

  show_success:  boolean;
  show_warning:  boolean;
  participant: Participant;
  listparticipants : any;
  imgUrl : any;
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
      matricule: {
        title: 'Matricule',
        type: 'string',
      },
    },
  };
    

  source: LocalDataSource = new LocalDataSource();

  @ViewChild('table')
  smartTable: Ng2SmartTableComponent;
  public editParticipant: Participant;
  constructor(private service: SmartTableData,
              private participantService : ParticipantService,
              private fileService : FileService,
              private router: Router,
              // private formBuilder: FormBuilder
              ) {
    this.editParticipant = new Participant();
    this.participant = new Participant();
    const data = this.service.getData();
    //console.log(data);
    this.source.load(data);
  }

  ngOnInit(){
    this.participantService.findAllParticipants().subscribe( data =>{
      this.listparticipants = data;
      //console.log(this.listclients)
      this.source.load(this.listparticipants);
    })
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
  onCreate(e){
    console.log("add cusomized");
    this.router.navigateByUrl('/pages/forms/inputs-formateur');
  }
  onDelete(e){
    console.log("delete clicked");
    console.log(e.data.id); 
    this.participantService.deleteParticipant(e.data.id);
  }

  public onOpenModal(e : any, mode : string){
    const container = document.getElementById('container')
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle','modal');
    if (mode == 'edit'){
      this.editParticipant = e;
      button.setAttribute('data-target','#editFormateurModal');
    }
    container.appendChild(button);
    button.click();

  }

  Editer() {
    //const myId = getUniqueId(1);
   // this.Client.id = myId;
    this.participantService.editParticipant(this.editParticipant).subscribe(
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
      title: 'Rapport des Formateurs',
      useBom: true,
      noDownload: false,
      headers: ["Identifient","Nom", "Prénom", "CIN", "GSM","Email","matricule"]
    };

    new ngxCsv(this.listparticipants,"Rapport",options);
   
  }
}