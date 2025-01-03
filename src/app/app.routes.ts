import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BooksComponent } from './books/books.component';
import { BookUpdateComponent } from './book-update/book-update.component';

export const routes: Routes = [
    { path: '', component: LoginComponent, pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: '', component: HomeComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'books', component: BooksComponent },
            { path: 'bookupdate', component: BookUpdateComponent }
        ]
    }
];
