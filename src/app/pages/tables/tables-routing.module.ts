import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablesComponent } from './tables.component';
import { ClientslistComponent } from './clients-list/clients-list.component';
import { FormationslistComponent } from './formations-list/formations-list.component';
import { SubscriptionslistComponent } from './subscriptions-list/subscriptions-list.component';
import {ClientDetailsComponent} from './client-details/client-details.component';
import { TreeGridComponent } from './tree-grid/tree-grid.component';

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
  FormationslistComponent,
  SubscriptionslistComponent
];
