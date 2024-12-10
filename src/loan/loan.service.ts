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

  getLoans(pageable: Pageable): Observable<LoanPage> {
    return this.http.post<LoanPage>(this.baseUrl, {pageable: pageable});
    /* return of(LOAN_DATA_PAGE); */
  }

  saveLoan(loan: Loan): Observable<void> {
    return of(null);
  }

  deleteLoan(idLoan: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${idLoan}`);
  }
}
