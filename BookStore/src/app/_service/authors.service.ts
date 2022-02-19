import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { basicUrl } from '../basicUrl/basic-url';
import { BookAuthorEntity } from '../_model/book-author-entity';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
basicURL: string = basicUrl;
  headers: any;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  getAllAuths() {
    return this.http.get<BookAuthorEntity[]>(this.basicURL+"Authors/Authors");
  }
}
