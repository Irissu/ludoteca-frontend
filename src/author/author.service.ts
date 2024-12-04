import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Author } from './model/Author';
import { Pageable } from '../core/model/page/Pageable';
import { SortPage } from '../core/model/page/SortPage';
import { AuthorPage } from './model/AuthorPage';
import { AUTHOR_DATA } from './model/mock-authors';
import { HttpClient } from '@angular/common/http';
import { AUTHOR_DATA_LIST } from './model/mock-authors-list';
@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) { }
  private baseUrl = 'http://localhost:8080/author';

  getAuthors(pageable: Pageable): Observable<AuthorPage> { // se envia como parametro Objeto tipo Pageable
    /*  return of(AUTHOR_DATA); */
    return this.http.post<AuthorPage>(this.baseUrl, { pageable: pageable });
  }

  saveAuthor(author: Author): Observable<Author> {
    const { id } = author;
    const url = id ? `${this.baseUrl}/${id}` : this.baseUrl;
    return this.http.put<Author>(url, author);
  }

  deleteAuthor(idAuthor: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${idAuthor}`);
  }

  getAllAuthors(): Observable<Author[]> {
    /* return of(AUTHOR_DATA_LIST); */
    return this.http.get<Author[]>(this.baseUrl);
  }
}
