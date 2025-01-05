import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2';
import { AuthorDetails } from '../Models/Author';

@Component({
  selector: 'app-all-authors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-authors.component.html',
  styleUrl: './all-authors.component.css'
})
export class AllAuthorsComponent {

  authorDetails: Array<AuthorDetails> = [];

  constructor(private webapi: ApiService) {
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
          this.authorDetails = data.result;
          // Sort the authorDetails array based on the 'name' property
          this.authorDetails.sort((a, b) => a.name.localeCompare(b.name));
        }
      }
    });
  }
}
