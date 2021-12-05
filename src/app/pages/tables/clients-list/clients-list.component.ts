import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ClientService } from '../../../services/client.service';
import { SmartTableData } from '../../../@core/data/smart-table';
import { Client } from '../../../entities/Clients';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
})
export class ClientslistComponent {
  Client : Client;
  listclients : any;
  settings = {
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

  constructor(private service: SmartTableData,
              private clientService : ClientService) {
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
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
