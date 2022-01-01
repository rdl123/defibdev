import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
import {
  NbActionsModule,
  NbButtonModule,
  NbCheckboxModule,
  NbDatepickerModule, 
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { TablesRoutingModule, routedComponents } from './tables-routing.module';
import { FsIconComponent } from './tree-grid/tree-grid.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { FormsModule as ngFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    NbActionsModule,
    NbButtonModule,
    NbCheckboxModule,
    NbDatepickerModule, 
    NbRadioModule,
    NbSelectModule,
    NbUserModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    TablesRoutingModule,
    Ng2SmartTableModule,
    ngFormsModule
    // FormGroup,
    // FormBuilder
  ],
  declarations: [
    ...routedComponents,
    FsIconComponent,
    ClientDetailsComponent,
  ],
})
export class TablesModule { }
