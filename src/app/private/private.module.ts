import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { HttpService } from '../services/http.service';
import { AuthGuard } from '../guards/auth.guard';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule
  ],
  providers : [HttpService]
})
export class PrivateModule { }
