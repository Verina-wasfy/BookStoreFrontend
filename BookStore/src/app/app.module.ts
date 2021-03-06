import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './app.material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './_book/home/home.component';
import { AllBooksComponent } from './_book/all-books/all-books.component';
import { NavBarComponent } from './_shared/nav-bar/nav-bar.component';
import { FooterComponent } from './_shared/footer/footer.component';
import { NotFoundComponent } from './_shared/not-found/not-found.component';
import { DetailsComponent } from './_book/details/details.component';
import { HttpClientModule } from '@angular/common/http';
import { NotifyDialogComponent } from './_shared/notify-dialog/notify-dialog.component';
import { ConfirmDialogComponent } from './_shared/confirm-dialog/confirm-dialog.component';
import { SaveBookComponent } from './_book/save-book/save-book.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AllBooksComponent,
    NavBarComponent,
    FooterComponent,
    NotFoundComponent,
    DetailsComponent,
    NotifyDialogComponent,
    ConfirmDialogComponent,
    SaveBookComponent
  ],
  imports: [
    MatNativeDateModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
