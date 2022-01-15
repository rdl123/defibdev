import { Component, ComponentFactoryResolver } from '@angular/core';
import { Client } from '../../../entities/Clients';

import { ClientService } from '../../../services/ClientService/client.service';

@Component({
  selector: 'ngx-form-inputs',
  styleUrls: ['./form-inputs.component.scss'],
  templateUrl: './form-inputs.component.html',

})
export class FormInputsComponent{
   
    Client: Client;
    show_success:  boolean;
    show_warning:  boolean;
    

  constructor(private clientService : ClientService) {
    this.Client = new Client();
}




add() {
  this.clientService.addClient(this.Client).subscribe(
    data => {
      this.show_success = true;
         
    },
    err => 
      {
        this.show_warning= true;
       

      } );
 
}


}
