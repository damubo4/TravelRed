import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  // url = 'http://localhost:3000/reservas/';
  url = 'https://travelred.herokuapp.com/reservas/listar_reservas';

  constructor(private http:HttpClient) { }

  getReservas(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  getReserva(id): Observable<any> {
    return this.http.get<any>(this.url + id);
  }

  addReserva(reserva): Observable<any> {
    return this.http.post(this.url, reserva)
  }

  editReserva(id: any, reserva): Observable<any> {
    return this.http.put(this.url + id, reserva);
  }

  deleteReserva(id: any): Observable<any> {
    return this.http.delete(this.url + id);
  }
}
