import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2';
import { Author } from '../Models/Author';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent implements OnInit {
  userForm: FormGroup;
  imageBase64: string | null = null; // Store the Base64 string of the image
  authors: Array<Author> | null = null;
  authorNames: Array<{ id: string, name: string }> = [];

  sizes = [
    '5x8', '5.5x8.5', '6x9', '8.5x11', 'Pocket Book'
  ];

  ngOnInit(): void {
    // Fetch authors after component initializes
    this.webapi.getAllAuthors().subscribe({
      next: (data: any) => {
        if (data.statusCode == 400) {
          Swal.fire({
            title: data.validation[0].title,
            text: data.validation[0].details,
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        } else {
          this.authors = data.result;
          if (this.authors) {
            // Map the authors to an array of objects {id, name}
            this.authorNames = this.authors.map((author) => ({
              id: author.authorId, // Ensure the correct attribute names are used
              name: author.name,
            }));
          }
        }
      },
      error: (error) => {
        console.error('Error fetching authors:', error);
      }
    });
  }

  constructor(private fb: FormBuilder, private webapi: ApiService) {

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

  // Access form controls for validation
  get f() {
    return this.userForm.controls;
  }

  // Form submission handler
  onSubmit() {
    if (this.userForm.valid) {
      const formData = { ...this.userForm.value };
      formData.image = this.imageBase64;

      let addBook = this.webapi.addBook(formData);
      addBook.subscribe((data: any) => {
        if (data.statusCode == 400) {
          Swal.fire({
            title: data.validation[0].title,
            text: data.validation[0].details,
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
        else {
          this.userForm.reset();
          this.imageBase64 = null;
          Swal.fire({
            title: data.message,
            icon: "success"
          });
        }
      })
    } else {
      this.userForm.markAllAsTouched();
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
}
