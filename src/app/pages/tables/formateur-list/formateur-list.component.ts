import { Component, ViewChild } from '@angular/core';
import { Ng2SmartTableComponent,LocalDataSource } from 'ng2-smart-table';
import { FormateurService } from '../../../services/FormateurService/formateur.service';
import { FileService } from '../../../services/FiIeUploadService/file.service';
import { SmartTableData } from '../../../@core/data/smart-table';
import { Formateur } from '../../../entities/Formateur';
import { Router } from '@angular/router';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { ngxCsv } from 'ngx-csv/ngx-csv';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
})
export class FormateurListComponent   {

  show_success:  boolean;
  show_warning:  boolean;
  Formateur: Formateur;
  listformateurs : any;
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
  public editFormateur: Formateur;
  constructor(private service: SmartTableData,
              private formateurService : FormateurService,
              private fileService : FileService,
              private router: Router,
              // private formBuilder: FormBuilder
              ) {
    this.editFormateur = new Formateur();
    this.Formateur = new Formateur();
    const data = this.service.getData();
    //console.log(data);
    this.source.load(data);
  }

  ngOnInit(){
    this.formateurService.findAllFormateurs().subscribe( data =>{
      this.listformateurs = data;
      //console.log(this.listclients)
      this.source.load(this.listformateurs);
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
    this.formateurService.deleteFormateur(e.data.id);
  }

  public onOpenModal(e : any, mode : string){
    const container = document.getElementById('container')
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle','modal');
    if (mode == 'edit'){
      this.editFormateur = e;
      this.fileService.getFormateur64file(this.editFormateur.photo).subscribe( data =>{
        this.imgUrl = "data:image/png;base64," + data;
      })
      button.setAttribute('data-target','#editFormateurModal');
    }
    container.appendChild(button);
    button.click();

  }

  Editer() {
    //const myId = getUniqueId(1);
   // this.Client.id = myId;
    this.formateurService.editFormateur(this.editFormateur).subscribe(
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
      headers: ["Identifient","Nom", "Pr??nom", "CIN", "GSM","Email"]
    };

    new ngxCsv(this.listformateurs,"Rapport",options);
   
  }
}