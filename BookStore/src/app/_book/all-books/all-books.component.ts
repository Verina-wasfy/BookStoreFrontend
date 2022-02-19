import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BooksEntity } from 'src/app/_model/books-entity';
import { BooksService } from 'src/app/_service/books.service';
import { ConfirmDialogComponent } from 'src/app/_shared/confirm-dialog/confirm-dialog.component';
import { NotifyDialogComponent } from 'src/app/_shared/notify-dialog/notify-dialog.component';
import { DetailsComponent } from '../details/details.component';
import { SaveBookComponent } from '../save-book/save-book.component';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.css']
})
export class AllBooksComponent implements OnInit {
  books!: Array<BooksEntity>;
  addBook:BooksEntity=new BooksEntity();
 displayedColumns = [ 'name', 'avgRating' , 'iSBN' ,'publisher','Action'];
  dataSource! :MatTableDataSource<BooksEntity>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private bookService: BooksService,public dialog: MatDialog,) {
    this.getAllBooks();
  }

  ngOnInit(): void {
  }
 getAllBooks(){
    this.bookService.getAllBooks().subscribe(result=>{
      this.books = result;
      // console.log(result)
      this.dataSource = new MatTableDataSource<BooksEntity>(this.books);
      this.dataSource.paginator = this.paginator;
    });
 }

 bookDetails(book:BooksEntity){
    const dialogRef = this.dialog.open(DetailsComponent ,{
      data: book
    });
 }

  deleteBook(id: any) {
    // debugger;
    const dialogRef = this.dialog.open(ConfirmDialogComponent , {
      data:"Are you sure you want to delete this book?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result ==1){
        this.bookService.deleteBook(id).subscribe(result =>{
          if(result == 1){
            this.dialog.open( NotifyDialogComponent , {
              data:  { message: "The book is successfully deleted." , status: 1}
            });
            this.getAllBooks();
          }else{
            this.dialog.open( NotifyDialogComponent , {
              data: { message: "Something went wrong, please try again." , status: 2}
            });
          }
        })
      }
     });
  }

  editBook(book: BooksEntity) {
 const dialogRef = this.dialog.open(SaveBookComponent , {
      data: book
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
        this.addBook= result as BooksEntity;
        this.bookService.saveBook(this.addBook).subscribe(result=>{
        if(result == 1){
            this.dialog.open( NotifyDialogComponent , {
              data:  { message:  "Book is edited successfully", status: 1}
            });
          this.getAllBooks();
          }else{
            this.dialog.open( NotifyDialogComponent , {
              data:  { message: "Something went wrong please try again" , status: 2}
            });
          }
        })
    }
    });
  }

  newBook() {
    // debugger;
const dialogRef = this.dialog.open(SaveBookComponent, {
      data: new BooksEntity()
    });
    dialogRef.afterClosed().subscribe(result => {
      // debugger;
      // console.log(result);
      if(result){
        this.addBook = result;
        this.bookService.saveBook(this.addBook).subscribe(requestResult=>{
          if(requestResult == 1){
            this.dialog.open( NotifyDialogComponent , {
              data:   { message: "Book is added successfully" , status: 1}
            });
          this.getAllBooks();
          }else{
            this.dialog.open( NotifyDialogComponent , {
              data: { message: "Something went wrong, please try agian later."    , status: 2}
            });
          }
        })
    }
    });
  }
}
