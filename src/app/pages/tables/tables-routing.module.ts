import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablesComponent } from './tables.component';
import { ClientslistComponent } from './clients-list/clients-list.component';
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
      path: 'tree-grid',
      component: TreeGridComponent,
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
  TreeGridComponent,
];
