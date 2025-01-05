import { Component } from '@angular/core';
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
export class AddBookComponent {
  userForm: FormGroup;
  imageBase64: string | null = null; // Store the Base64 string of the image
  authors: Array<Author> | null = null;
  authorNames: string[] | null = null;

  // Dynamic field definitions
  fields = [
    {
      key: 'title',
      label: 'Title',
      type: 'text',
      placeholder: 'Enter Title',
      validators: [Validators.required, Validators.minLength(1)],
      errors: [
        { key: 'required', message: 'Title is required' },
        { key: 'minlength', message: 'Title must be at least 1 characters' },
      ],
    },
    {
      key: 'isbn',
      label: 'ISBN',
      type: 'text',
      placeholder: 'Enter ISBN',
      validators: [Validators.required, Validators.pattern('^[0-9]{13}$')],
      errors: [
        { key: 'required', message: 'ISBN is required' },
        { key: 'pattern', message: 'ISBN must be 13 digits' },
      ],
    },
    {
      key: 'size',
      label: 'Size',
      type: 'select',
      options: ['5x8', '5.5x8.5', '6x9', '8.5x11', 'Pocket Book'],
      validators: [Validators.required],
      errors: [{ key: 'required', message: 'Size is required' }],
    },
    {
      key: 'pages',
      label: 'Pages',
      type: 'text',
      placeholder: 'Enter Pages',
      validators: [Validators.required, Validators.minLength(1), Validators.maxLength(3)],
      errors: [
        { key: 'required', message: 'Pages is required' },
        { key: 'minLength', message: 'Pages must be greater than 0' },
        { key: 'maxLength', message: 'Pages must be less than 999' }
      ],
    },
    {
      key: 'pricePaperback',
      label: 'Price (Paperback)',
      type: 'text',
      placeholder: 'Enter Price of Paperback',
      validators: [Validators.required, Validators.minLength(1)],
      errors: [
        { key: 'required', message: 'Price is required' },
        { key: 'minLength', message: 'Price must be greater than 0' }
      ],
    },
    {
      key: 'priceKindle',
      label: 'Price (Kindle)',
      type: 'text',
      placeholder: 'Enter Price of Kindle',
      validators: [Validators.required, Validators.minLength(1)],
      errors: [
        { key: 'required', message: 'Price is required' },
        { key: 'minLength', message: 'Price must be greater than 0' }
      ],
    },
    {
      key: 'image',
      label: 'Book Image',
      type: 'file',
      placeholder: '',
      validators: [this.imageFileValidator()],
      errors: [
        { key: 'invalidFileType', message: 'Only .jpg and .jpeg files are allowed' },
      ],
    },
    {
      key: 'description',
      label: 'Description',
      type: 'textarea',
      placeholder: 'Book Blurb/Synopsis',
      validators: [],
      errors: [],
    },
    {
      key: 'authorid',
      label: 'Author',
      type: 'select',
      options: this.authorNames,
      validators: [Validators.required],
      errors: [{ key: 'required', message: 'Author is required' }],
    },
  ];

  ngOnit(){
    this.webapi.getAllAuthors().subscribe({
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
          this.authors = data.result;
          if (this.authors != null) {
            this.authorNames = this.authors.map(author => author.name);
          }
        }
      }
    });
  }

  constructor(private fb: FormBuilder, private webapi: ApiService,) {
    
    // Explicitly define the type for the group object
    const group: { [key: string]: any } = {};

    // Dynamically create form controls based on field definitions
    this.fields.forEach((field) => {
      group[field.key] = ['', field.validators];
    });

    // Initialize the form group with the dynamically created controls
    this.userForm = this.fb.group(group);
  }

  // Access form controls for validation
  get f() {
    return this.userForm.controls;
  }

  // Form submission handler
  onSubmit() {
    if (this.userForm.valid) {
      const formData = { ...this.userForm.value };
      formData.image = this.imageBase64; // Add the Base64 image to form data

      let updateBookStatus = this.webapi.addAuthor(formData);
      updateBookStatus.subscribe((data: any) => {
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
      console.log('Form is invalid. Please check the highlighted fields.');
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
