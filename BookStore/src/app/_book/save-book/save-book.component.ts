import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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

 bookForm = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('',Validators.required,),
    isbn: new FormControl('',[Validators.required,Validators.pattern("^[0-9]*$")]),
    isbn13: new FormControl('',[Validators.required,Validators.pattern("^[0-9]*$")]),
    numPages: new FormControl('',Validators.required),
    avgRating: new FormControl('',[Validators.required,Validators.pattern("\d+([.]\d+)?")]),
    ratingCount: new FormControl('',Validators.required),
    textReviewsCount: new FormControl('',Validators.required),
    publicationDate: new FormControl('',Validators.required),
    publisherID: new FormControl('',Validators.required),
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
      this.bookForm.controls['id'].setValue(this.book.bookID);
      this.bookForm.controls['title'].setValue(this.book.title);
      this.bookForm.controls['isbn'].setValue(this.book.isbn);
      this.bookForm.controls['isbn13'].setValue(this.book.isbN13);
      this.bookForm.controls['numPages'].setValue(this.book.numberPages);
      this.bookForm.controls['avgRating'].setValue(this.book.avgRating);
      this.bookForm.controls['ratingCount'].setValue(this.book.ratingCount);
      this.bookForm.controls['textReviewsCount'].setValue(this.book.textRreviewsCount);
      this.bookForm.controls['publicationDate'].setValue(this.book.publicationDate);
      this.bookForm.controls['publisherID'].setValue(this.book.publisherID);
      for (var i = 0; i > (this.book.bookLang?.length || 0); i++){
      //this.bookForm.controls['langID'].setValue(this.book.bookLang[i].langID );

      }
      //this.bookForm.controls['langID'].setValue((this.book?.bookLang[].langID || 0));
    }
   }

  ngOnInit(): void {
   // this.bookForm.controls['langID'].setValue(0);

  }
  getAllLangs() {
    this.langService.getAllLangs().subscribe(result => {
      this.langs = result;
      console.log(this.langs)
    });
  }

   getAllPubs() {
    this.publishersService.getAllPubs().subscribe(result => {
      this.pubs = result;
      console.log(this.pubs)

    });
  }

  onSubmit(form: any) {
    var avg = parseFloat(form.controls['avgRating'].value);

    // debugger;
    // console.log(form);
   if(!this.bookForm.invalid){
    this.book = new BooksEntity(
      form.controls['id'].value,
      form.controls['title'].value,
      form.controls['isbn'].value,
      form.controls['isbn13'].value,
      form.controls['numPages'].value,
     form.controls['avgRating'].value,
      form.controls['ratingCount'].value,
      form.controls['textReviewsCount'].value,
      form.controls['publicationDate'].value,
      form.controls['publisherID'].value,
      form.controls['langID'].value)

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
