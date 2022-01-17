import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule, NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { FormsRoutingModule } from './forms-routing.module';
import { FormsComponent } from './forms.component';
import { FormInputsComponent } from './form-inputs/form-inputs.component';
import { FormInputsFormationComponent } from './form-inputs-formation/form-inputs-formation.component';
import { FormInputsSubsComponent } from './form-inputs-subs/form-inputs-subs.component';
import { FormLayoutsComponent } from './form-layouts/form-layouts.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { FormsModule as ngFormsModule } from '@angular/forms';
import {NbStepperModule} from '@nebular/theme';
import { FormInputsFormateurComponent } from './form-inputs-formateur/form-inputs-formateur.component';
import { FormInputsResponsableComponent } from './form-inputs-responsable/form-inputs-responsable.component';

@NgModule({
  imports: [
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    FormsRoutingModule,
    NbSelectModule,
    NbIconModule,
    NbAlertModule,
    ngFormsModule,
    NbStepperModule,
  ],
  declarations: [
    FormsComponent,
    ButtonsComponent,
    FormInputsComponent,
    FormInputsFormationComponent,
    FormInputsSubsComponent,
    FormLayoutsComponent,
    DatepickerComponent,
    FormInputsFormateurComponent,
    FormInputsResponsableComponent,
  ],
})
export class FormsModule { }
