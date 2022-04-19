import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AhorroService {

  url = 'http://localhost:3000/ahorro/';

  constructor(private http: HttpClient) { }

  getAhorros(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  getAhorro(id): Observable<any> {
    return this.http.get<any>(this.url + id);
  }

  addAhorro(ahorro): Observable<any> {
    return this.http.post(this.url, ahorro)
  }

  editAhorro(id: any, ahorro): Observable<any> {
    return this.http.put(this.url + id, ahorro);
  }

  deleteAhorro(id: any): Observable<any> {
    return this.http.delete(this.url + id);
  }
}
