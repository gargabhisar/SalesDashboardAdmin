import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddAuthorComponent } from './add-author/add-author.component';
import { AddBookComponent } from './add-book/add-book.component';
import { AllAuthorsComponent } from './all-authors/all-authors.component';

export const routes: Routes = [
    { path: '', component: LoginComponent, pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: '', component: HomeComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'addAuthor', component: AddAuthorComponent },
            { path: 'addBook', component: AddBookComponent },
            { path: 'allAuthors', component: AllAuthorsComponent }
        ]
    }
];
