import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http : HttpClient) { }


  get(endpoint : string): Observable<any> {
    return this.http.get(`${API_URL}${endpoint}`)
  }

  getById(endpoint : string, id : number): Observable<any> {
    return this.http.get(`${API_URL}${endpoint}/${id}`)
  }

  post(endpoint : string, object): Observable<any> {
    return this.http.post<any>(`${API_URL}${endpoint}`, object)
  }

  put(endpoint, id, object): Observable<any> {
    return this.http.put(`${API_URL}${endpoint}/${id}`, object)
     
  }

  delete(endpoint, id): Observable<any> {
  return this.http.delete<any>(`${API_URL}${endpoint}/${id}`)
  }


}
