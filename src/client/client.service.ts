import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { CLIENT_DATA } from './model/mock-clients';
import { Client } from './model/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  private url = 'http://localhost:8080/client';

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.url).pipe(
      catchError(() => { 
       
        return of(CLIENT_DATA);
      })
    );
  }

  saveClient(client: Client): Observable<Client> {
    const { id } = client;
    const url = id ? `${this.url}/${id}` : this.url;
    return this.http.put<Client>(url, client);
  }

  deleteClient(client: number): Observable<any> { 
    return this.http.delete(`${this.url}/${client}`);
  }

}
