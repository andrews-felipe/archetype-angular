import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from '../services/auth.service';
import { LoginComponent } from './login/login.component';

import { PublicRoutingModule } from './public-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from '../interceptors/error.interceptor';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    HttpClientModule
  ],
  providers : [
    AuthService, 
    {
      provide : HTTP_INTERCEPTORS,
      useClass : HttpErrorInterceptor,
      multi : true
    }
  ]
})
export class PublicModule { }
