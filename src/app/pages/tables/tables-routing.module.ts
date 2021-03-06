import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablesComponent } from './tables.component';
import { ClientslistComponent } from './clients-list/clients-list.component';
import { FormationslistComponent } from './formations-list/formations-list.component';
import { FormateurListComponent } from './formateur-list/formateur-list.component';
import { SubscriptionslistComponent } from './subscriptions-list/subscriptions-list.component';
import { ResponsableListComponent } from './responsable-list/responsable-list.component';
import {ClientDetailsComponent} from './client-details/client-details.component';
import { TreeGridComponent } from './tree-grid/tree-grid.component';
import { ParticipantListComponent } from './participant-list/participant-list.component';

const routes: Routes = [{
  path: '',
  component: TablesComponent,
  children: [
    {
      path: 'clients-list',
      component: ClientslistComponent,
    },
    {
      path: 'client-details',
      component: ClientDetailsComponent,
    },
    {
      path: 'formations-list',
      component: FormationslistComponent,
    },
     {
      path: 'formateur-list',
      component: FormateurListComponent,
    },
    {
      path: 'participant-list',
      component: ParticipantListComponent,
    },
    {
      path: 'responsables-list',
      component: ResponsableListComponent,
    },
    {
      path: 'subscriptions-list',
      component: SubscriptionslistComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesRoutingModule { }

export const routedComponents = [
  TablesComponent,
  ClientslistComponent,
  ClientDetailsComponent,
  TreeGridComponent,
  FormateurListComponent,
  FormationslistComponent,
  SubscriptionslistComponent,
  ParticipantListComponent,
  ResponsableListComponent
];
