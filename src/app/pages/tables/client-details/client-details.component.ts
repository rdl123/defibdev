import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../../entities/Clients';
import { ClientService } from '../../../services/ClientService/client.service';

@Component({
  selector: 'ngx-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {

  @Input()
  data


  id !: number;
  client !: Client;
  firstName : string = "";
  starRate = 2;
  heartRate = 4;
  radioGroupValue = 'This is value 2';
  constructor(private activated : ActivatedRoute,
              private router : Router,
              private clientService : ClientService) { 
    this.client = new Client();

              }
              

  
  ngOnInit(): void {
    console.log(this.data.nom + "this is from parent");
    this.clientService.clientSelected.subscribe( a =>{
      this.client = a;
      console.log(this.client);
      this.firstName = this.client.prenom;
     })
  }
  ngAfterViewInit(){

   

    
  }

  onClicki(){
    this.firstName = "adxa";
  }

}
