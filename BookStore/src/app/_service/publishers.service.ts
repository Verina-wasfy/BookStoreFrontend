import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { basicUrl } from '../basicUrl/basic-url';
import { PublishersEntity } from '../_model/publishers-entity';

@Injectable({
  providedIn: 'root'
})
export class PublishersService {
basicURL: string = basicUrl;
  headers: any;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  getAllPubs() {
    return this.http.get<PublishersEntity[]>(this.basicURL+"Publishers/Publishers");
  }
}
