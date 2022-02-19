import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BooksEntity } from 'src/app/_model/books-entity';
import { BooksService } from 'src/app/_service/books.service';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.css']
})
export class AllBooksComponent implements OnInit {
  books!: Array<BooksEntity>;

 displayedColumns = [ 'name', 'avgRating' , 'iSBN' ,'publisher','Action'];
  dataSource! :MatTableDataSource<BooksEntity>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private bookService: BooksService) {
    this.getAllBooks();
  }

  ngOnInit(): void {
  }
 getAllBooks(){
    this.bookService.getAllBooks().subscribe(result=>{
      this.books = result;
      console.log(result)
      this.dataSource = new MatTableDataSource<BooksEntity>(this.books);
      this.dataSource.paginator = this.paginator;
    });
  }
}
