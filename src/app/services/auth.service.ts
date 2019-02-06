import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL, ENDPOINT } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/index.model';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http : HttpClient) { }

  /**
   * Método login com captura de token
   * @param email 
   * @param password 
   * @returns função login
   */
  login(email : string, password : string){
    return this.http.post(`${API_URL}${ENDPOINT.LOGIN}`, {email : email , password : password})
          .pipe(
            tap((res:HttpHeaders)=>{
              localStorage.setItem("acessToken", res.get("Authorization"))
            })
          )
  }

  /**
   * Verificando se o usuário ainda está logado
   */
  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }

  /**
   * Método para acessar o valor do objeto que armazena o usuário
   * @returns Usuário Atual
   */
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }


  /**
   * Método para limpar o token do local storage
   */
  cleanStorage(){
    localStorage.removeItem("acessToken")
  }


  /**
   * Método para decodificar o token
   * @param token 
   */
	getDecodedAccessToken(token) {
		try {
			return jwt_decode(token);
		} catch (Error) {
			return null;
		}
  }
  
  /**
   * Método para transformar o token Expiration ( Dado em segundos ) em um Date()
   * @returns date
   * @param secounds 
   */
	timeToken(secounds) {
		let dateTransform = new Date();
		dateTransform.setSeconds(secounds);
		return dateTransform;
	}



}
