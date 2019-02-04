import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL, ENDPOINT } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/index.model';


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
   */
  login(email : string, password : string){
    return this.http.post(`${API_URL}${ENDPOINT.LOGIN}`, {email : email , password : password})
          .pipe(
            map((res:HttpHeaders)=>{
              localStorage.setItem("acessToken", res.get("Authorization"))
            })
          )
  }

  /**
   * Método para acessar o valor do objeto que armazena o usuário
   */
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }


  /**
   * Método para limpar o acess token do local storage
   */
  cleanStorage(){
    localStorage.removeItem("acessToken")
  }




}
