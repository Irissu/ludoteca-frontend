import { Injectable } from '@angular/core';
import { Pageable } from '../core/model/page/Pageable';
import { Observable, of } from 'rxjs';
import { LoanPage } from './model/LoanPage';
import { Loan } from './model/Loan';
import { LOAN_DATA_PAGE } from './model/mock-loans-page';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private http: HttpClient) { 
  }

  private baseUrl = 'http://localhost:8080/loan';

  getAllLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(this.baseUrl);
  }


    getLoans(
      pageable: Pageable,
      idGame?: number,
      idClient?: number,
      date?: string
    ): Observable<LoanPage> {
      const payload = {
        pageable: pageable,
        idGame: idGame,
        idClient: idClient,
        date: date,
      };
      return this.http.post<LoanPage>(this.baseUrl, payload); 
    }

  getLoan(idLoan: number): Observable<Loan> {
    return this.http.get<Loan>(`${this.baseUrl}/${idLoan}`);
  }

  saveLoan(loan: Loan): Observable<Loan> {

    return this.http.put<Loan>(this.baseUrl, loan); 


  }

  deleteLoan(idLoan: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${idLoan}`);
  }
}
