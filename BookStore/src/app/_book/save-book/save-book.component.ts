import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookAuthorEntity } from 'src/app/_model/book-author-entity';
import { BooksEntity } from 'src/app/_model/books-entity';
import { PublishersEntity } from 'src/app/_model/publishers-entity';
import { LanguagesService } from 'src/app/_service/languages.service';
import { PublishersService } from 'src/app/_service/publishers.service';
import { BookLanguageEntity } from 'e:/Udacity/BookstoreFrontend/BookStore/src/app/_model/book-language-entity';

@Component({
  selector: 'app-save-book',
  templateUrl: './save-book.component.html',
  styleUrls: ['./save-book.component.css']
})
export class SaveBookComponent implements OnInit {
  book: BooksEntity;
  langs?:Array<BookLanguageEntity>;
  pubs?: Array<PublishersEntity>;
  arrAuth: Array<BookAuthorEntity>=[];
 bookForm = new FormGroup({
   bookID: new FormControl(''),
   title: new FormControl('', Validators.required,),
    publisherID: new FormControl('',Validators.required),
    publicationDate: new FormControl('',Validators.required),

    isbn: new FormControl('',[Validators.required,Validators.pattern("^[0-9]{10}$")]),
    isbN13: new FormControl('',[Validators.required,Validators.pattern("^[0-9]{13}$")]),
    numberPages: new FormControl('',Validators.required),
    avgRating: new FormControl('',[Validators.required,Validators.pattern("^[0-9]+(.[0-9]{0,2})?$"),Validators.max(5.00)]),
    ratingCount: new FormControl('',Validators.required),
    textRreviewsCount: new FormControl('',Validators.required),
    langID: new FormControl('',Validators.required),
  });
  constructor(@Inject(MAT_DIALOG_DATA) public data: BooksEntity,
    private dialogRef: MatDialogRef<SaveBookComponent>, private langService: LanguagesService,
  private publishersService:PublishersService) {
 this.getAllLangs();
    this.getAllPubs();
    this.book = data;
    //  console.log(this.book);
    if (this.book != undefined) {
      this.bookForm.controls['bookID'].setValue(this.book.bookID);
      this.bookForm.controls['title'].setValue(this.book.title);
      this.bookForm.controls['isbn'].setValue(this.book.isbn);
      this.bookForm.controls['isbN13'].setValue(this.book.isbN13);
      this.bookForm.controls['numberPages'].setValue(this.book.numberPages);
      this.bookForm.controls['avgRating'].setValue(this.book.avgRating);
      this.bookForm.controls['ratingCount'].setValue(this.book.ratingCount);
      this.bookForm.controls['textRreviewsCount'].setValue(this.book.textRreviewsCount);
      this.bookForm.controls['publicationDate'].setValue(this.book.publicationDate);
      this.bookForm.controls['publisherID'].setValue(this.book.publisherID);
      this.bookForm.controls['langID'].setValue(this.book.langID );


    }
   }

  ngOnInit(): void {

  }
  get publishDate() {   return new DatePipe('en').transform(this.bookForm.get('publicationDate')?.value , 'dd/MM/yyyy')}

  getAllLangs() {
    this.langService.getAllLangs().subscribe(result => {
      this.langs = result;
      console.log(this.langs)
    });
  }

   getAllPubs() {
    this.publishersService.getAllPubs().subscribe(result => {
      this.pubs = result;
      // console.log(this.pubs)

    });
  }

  onSubmit(form: any) {
    var avg = parseFloat(form.controls['avgRating'].value);
    // console.log(typeof(avg));
    // debugger;
    // console.log(form);
   if(!this.bookForm.invalid){
     this.book = new BooksEntity();
      this.book.bookID=form.controls['bookID'].value,
      this.book.title=form.controls['title'].value,
      this.book.publisherID=form.controls['publisherID'].value,
      this.book.isbn=form.controls['isbn'].value,
      this.book.isbN13=form.controls['isbN13'].value,
      this.book.numberPages=form.controls['numberPages'].value,
     this.book.avgRating=avg,
      this.book.ratingCount=form.controls['ratingCount'].value,
      this.book.textRreviewsCount=form.controls['textRreviewsCount'].value,
     this.book.publicationDate = this.publishDate || '';
     this.book.langID = form.controls['langID'].value;
     //testing

     var authEntity = new BookAuthorEntity();
     authEntity.authorID = 1;
     this.arrAuth.push(authEntity);
     this.book.bookAuth = this.arrAuth;

    //  end of testing
    //  console.log(this.book);
    //  debugger;
      this.dialogRef.close(this.book);
   }else{
    this.validateAllFields(this.bookForm);
   }
  }
  validateAllFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
        const control = formGroup.get(field);
        if (control instanceof FormControl) {
            control.markAsTouched({ onlySelf: true });
        } else if (control instanceof FormGroup) {
            this.validateAllFields(control);
        }
    });
  }

  getControl(controlName:string){
   return this.bookForm.get(controlName) as FormControl
  }

  onNoClick(): void {
    this.dialogRef.close(undefined);
  }
}
