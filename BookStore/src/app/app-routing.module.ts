import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllBooksComponent } from './_book/all-books/all-books.component';
import { HomeComponent } from './_book/home/home.component';
import { NotFoundComponent } from './_shared/not-found/not-found.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
  },
   {
    path:'allBooks',
    component:AllBooksComponent,
  },
     {path : "**" , component:NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
