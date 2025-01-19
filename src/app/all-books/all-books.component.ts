import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Book } from '../Models/Book';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-books',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-books.component.html',
  styleUrl: './all-books.component.css'
})
export class AllBooksComponent {
  
  allBooks: Array<Book> = [];

  constructor(private webapi: ApiService, private router: Router) {
    this.webapi.getAllBooks().subscribe({
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
          console.log(this.allBooks);
          // Sort the allBooks array based on the 'title' property
          this.allBooks.sort((a, b) => a.title.localeCompare(b.title));
        }
      }
    });
  }

  updateBook(bookId: string) {
    this.webapi.setBookId(bookId);
    this.router.navigate(['/updateBook'], { skipLocationChange: true });
  }
}