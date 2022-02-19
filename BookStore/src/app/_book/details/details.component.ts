import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BooksEntity } from 'src/app/_model/books-entity';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  book: BooksEntity;
  constructor(@Inject(MAT_DIALOG_DATA) public data: BooksEntity, private dialogRef: MatDialogRef<DetailsComponent>) {
    this.book = data;
    //console.log(data);
  }

  ngOnInit(): void {
  }

}
