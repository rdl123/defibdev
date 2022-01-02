import { Component, ViewChild } from '@angular/core';
import { Ng2SmartTableComponent,LocalDataSource } from 'ng2-smart-table';

import { FormationService } from '../../../services/FormationService/formation.service';
import { SmartTableData } from '../../../@core/data/smart-table';
import { Client } from '../../../entities/Clients';
import { Router } from '@angular/router';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { Formation } from '../../../entities/Formation';
import { ngxCsv } from 'ngx-csv';
// import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
})
export class FormationslistComponent {
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
  formation : Formation;
  listFormations : any;
  listFormationsformatted : any;
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
      nom: {
        title: 'Nom de la formation',
        type: 'string',
      },
      categorie : {
        title: 'Categorie de la formation',
        type: 'string',
      },
      description: {
        title: 'Description',
        type: 'string',
      }
    },
  };
    

  source: LocalDataSource = new LocalDataSource();

  @ViewChild('table')
  smartTable: Ng2SmartTableComponent;
  public editFormation: Formation;
  constructor(private service: SmartTableData,
              private formationService : FormationService,
              private router: Router,
              // private formBuilder: FormBuilder
              ) {
    this.editFormation = new Formation();
    this.formation = new Formation();
    const data = this.service.getData();
    //console.log(data);
    this.source.load(data);
  }

  ngOnInit(){
    this.formationService.findAllFormations().subscribe( data =>{
      console.log(data);
      this.listFormationsformatted = data;
      this.listFormations = data;
      this.listFormationsformatted.forEach(item => item.categorie = item.categorie.nom);
      this.source.load(this.listFormationsformatted);
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
    this.formationService.deleteFormation(e.data.id);
    window.location.reload();
  }

  public onOpenModal(e : any, mode : string){
    const container = document.getElementById('container')
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle','modal');
    if (mode == 'edit'){
      this.editFormation = e;
      button.setAttribute('data-target','#editFormationModal');
    }
    container.appendChild(button);
    button.click();

  }

  Editer() {
    var oldcategorie = this.editFormation.categorie ;
    this.editFormation.categorie = null;
     this.formationService.editFormation(this.editFormation).subscribe(
       data => {
              console.log(data);   
       },
       err => {
        this.editFormation.categorie = oldcategorie;
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
  headers: ["Identifient","Nom de la formation", "Catégorie", "Description"]
};

new ngxCsv(this.listFormationsformatted,"Rapport",options);

}

}
