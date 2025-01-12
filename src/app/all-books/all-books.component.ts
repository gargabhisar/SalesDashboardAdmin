import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Book } from '../Models/Book';

@Component({
  selector: 'app-all-books',
  standalone: true,
  imports: [],
  templateUrl: './all-books.component.html',
  styleUrl: './all-books.component.css'
})
export class AllBooksComponent {

  allBooks : Array<Book> = [];

  constructor(private webapi: ApiService, private router: Router) {
    this.webapi.getAllAuthorDetails().subscribe({
      next: (data: any) => {
        if (data.statusCode == 400) {
          Swal.fire({
            title: data.validation[0].title,
            text: data.validation[0].details,
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
        else {
          this.allBooks = data.result;
          // Sort the authorDetails array based on the 'name' property
          this.allBooks.sort((a, b) => a.title.localeCompare(b.title));
        }
      }
    });
  }
}