import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { HttpService } from '../services/http.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './dashboard/components/users/users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VisitantsComponent } from './dashboard/components/visitants/visitants.component';
import { BeaconsComponent } from './dashboard/components/beacons/beacons.component';
import { AuthService } from '../services/auth.service';

@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    VisitantsComponent,
    BeaconsComponent
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [HttpService, AuthService]
})
export class PrivateModule { }
