import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
/**
 *  Guarda de carregamento de módulos e rotas
 */
export class AuthGuard implements CanActivate, CanLoad{
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;

  constructor(private auth : AuthService, private router : Router){}

  /**
   * Método para guarda de rotas
   * @param route 
   * @param state 
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean{
    return this.isloggedin()
  }

  /**
   * Método para restrição de carregamento de módulos
   * @param route 
   */
  canLoad(route : Route): Observable<boolean> | Promise<boolean> | boolean{
    return this.isloggedin()
  } 

  /**
   * método que verifica se o usuário está logado, usando o auth service
   */
  private isloggedin(){
    if(this.auth.loggedIn){
      return true
    }
    this.router.navigate(['login'])
    return false
  }

  
}
