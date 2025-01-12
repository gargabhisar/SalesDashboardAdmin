import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Author } from '../Models/Author';

@Component({
  selector: 'app-update-book',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-book.component.html',
  styleUrl: './update-book.component.css'
})
export class UpdateBookComponent implements OnInit {
  bookId: string = ''; // To store the author ID
  userForm: FormGroup;
  imageBase64: string | null = null; // Store the Base64 string of the image
  authors: Array<Author> | null = null;
  authorNames: Array<{ id: string, name: string }> = [];
  sizes = [
    '5x8', '5.5x8.5', '6x9', '8.5x11', 'Pocket Book'
  ];
  constructor(
    private fb: FormBuilder,
    private webapi: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      title: ['', [Validators.required]],
      isbn: ['', [Validators.required, Validators.pattern('^[0-9]{13}$')]],
      size: ['', Validators.required],
      pages: ['', [Validators.required, Validators.pattern('^[1-9][0-9]*$')]],
      pricePaperback: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      priceKindle: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      image: ['', [this.imageFileValidator()]],
      description: ['', Validators.required],
      authorid: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.bookId = this.webapi.getBookId();
    if (this.bookId) {
      this.webapi.getAllAuthors().subscribe({
        next: (data: any) => {
          this.authors = data.result;
          if(this.authors)
          {
            this.authorNames = this.authors.map((author) => ({
              id: author.authorId.toString(),
              name: author.name,
            }));  
          }
          console.log(this.authorNames);
          
          // Load book data after authors are populated
          this.loadBookData();
        },
        error: (error) => {
          console.error('Error fetching authors:', error);
        }
      });
    }
  }

  // Load book data to prefill the form
  loadBookData() {
    this.webapi.getBookDetailsByBookId(this.bookId).subscribe(
      (data: any) => {
        if (data && data.result) {
          const book = data.result;

          this.userForm.patchValue(book);

          // Set the existing image (Base64 or URL) for preview
          this.imageBase64 = book.image; // Use for preview purposes
        } else {
          Swal.fire('Error', 'Author not found', 'error');
          this.router.navigate(['/allAuthors']);
        }
      },
      (error) => {
        console.error('Error loading author data:', error);
        Swal.fire('Error', 'Failed to load author data', 'error');
      }
    );
  }

  get f() {
    return this.userForm.controls;
  }

  // Handle image file change
  onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageBase64 = reader.result as string; // Store the Base64 string
      };
      reader.onerror = (error) => {
        console.error('Error converting image to Base64:', error);
      };
      reader.readAsDataURL(file); // Convert the file to Base64
    }
  }

  imageFileValidator() {
    return (control: any) => {
      if (control && control.value) {
        const fileInput = (document.getElementById('image') as HTMLInputElement)?.files?.[0];
        if (fileInput) {
          const fileType = fileInput.type;
          if (!['image/jpeg'].includes(fileType)) {
            return { invalidFileType: true }; // Error if not JPEG
          }
        }
      }
      return null; // No error
    };
  }
}
