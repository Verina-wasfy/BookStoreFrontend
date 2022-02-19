import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { basicUrl } from '../basicUrl/basic-url';
import { BooksEntity } from '../_model/books-entity';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  basicURL: string = basicUrl;
  headers: any;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  getAllBooks() {
    return this.http.get<BooksEntity[]>(this.basicURL+"Books/Books");
  //  return this.http.get<BooksEntity[]>( this.basicURL +"Books/Books",{ headers : this.headers });
  }

 saveBook(book:BooksEntity){

   return  this.http.post( this.basicURL +"Books/SaveBook" ,book);
  }

  deleteBook(id:number){
    debugger;
    return  this.http.delete( this.basicURL +"Books/DeleteBook?id="+id);
  }
}
