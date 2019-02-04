import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';

const routes: Routes = [
  // LazyLoad
  { path : 'login', loadChildren : '../public/public.module#PublicModule'},
  { path : 'home', loadChildren : '../private/private.module#PrivateModule'},
  { path : '', redirectTo : 'login', pathMatch : 'full'},
  { path : '**', component : PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
