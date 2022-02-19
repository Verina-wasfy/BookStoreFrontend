import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { basicUrl } from '../basicUrl/basic-url';
import { BookLanguageEntity } from '../_model/book-language-entity';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {
basicURL: string = basicUrl;
  headers: any;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  getAllLangs() {
    return this.http.get<BookLanguageEntity[]>(this.basicURL+"Languages/Languages");
  }
}
