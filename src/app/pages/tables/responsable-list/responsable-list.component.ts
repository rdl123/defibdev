import { Component, ViewChild } from '@angular/core';
import { Ng2SmartTableComponent,LocalDataSource } from 'ng2-smart-table';
import { FormateurService } from '../../../services/FormateurService/formateur.service';
import { ResponsableService } from '../../../services/ResponsableService/responsable.service';
import { FileService } from '../../../services/FiIeUploadService/file.service';
import { SmartTableData } from '../../../@core/data/smart-table';
import { Formateur } from '../../../entities/Formateur';
import { Responsable } from '../../../entities/Responsable';
import { Router } from '@angular/router';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { ngxCsv } from 'ngx-csv/ngx-csv';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
})
export class ResponsableListComponent   {

  show_success:  boolean;
  show_warning:  boolean;
  responsable: Responsable;
  listresponsables : any;
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
      ville: {
        title: 'Ville',
        type: 'string',
      },
    },
  };
    

  source: LocalDataSource = new LocalDataSource();

  @ViewChild('table')
  smartTable: Ng2SmartTableComponent;
  public editResponsable: Responsable;
  constructor(private service: SmartTableData,
              private responsableService : ResponsableService,
              private fileService : FileService,
              private router: Router,
              // private formBuilder: FormBuilder
              ) {
    this.editResponsable = new Responsable();
    this.responsable = new Responsable();
    const data = this.service.getData();
    //console.log(data);
    this.source.load(data);
  }

  ngOnInit(){
    this.responsableService.findAllResponsables().subscribe( data =>{
      this.listresponsables = data;
      //console.log(this.listclients)
      this.source.load(this.listresponsables);
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
    this.responsableService.deleteResponsable(e.data.id);
  }

  public onOpenModal(e : any, mode : string){
    const container = document.getElementById('container')
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle','modal');
    if (mode == 'edit'){
      this.editResponsable = e;
      button.setAttribute('data-target','#editFormateurModal');
    }
    container.appendChild(button);
    button.click();

  }

  Editer() {
    //const myId = getUniqueId(1);
   // this.Client.id = myId;
    this.responsableService.editResponsable(this.editResponsable).subscribe(
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
      headers: ["Identifient","Nom", "Prénom", "CIN", "GSM","Email"]
    };

    new ngxCsv(this.listresponsables,"Rapport",options);
   
  }
}