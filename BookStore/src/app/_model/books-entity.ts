import { BookAuthorEntity } from "./book-author-entity";
import { BookLanguageEntity } from "./book-language-entity";

export class BooksEntity {
  constructor(
    public bookID?:number,
public title?:string,
public publisherID?:number,
public publisherName?:string,
public publicationDate?:Date,
public isbn?:string,
public isbN13?:string,
public numberPages?:number,
public avgRating?:number,
public ratingCount?:number,
public textRreviewsCount?:number,
public bookAuth?:Array<BookAuthorEntity>,
public bookLang?:Array<BookLanguageEntity>

  ) { }

}

