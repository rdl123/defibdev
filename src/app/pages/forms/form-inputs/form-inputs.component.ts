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
           console.log(data);
         
    },
    err => {
      console.log(err.status)
      if(err.status == 200){
   
       this.show_success = true;
     

      }
      else{
        this.show_warning= true;
       

      }
    }

  );
 
}


}
