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
      type: 'text',
      placeholder: 'Enter Size (5x8, 5.5x8.5, 6x9, 8.5x11, Pocket Book)',
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
      options: [] as { id: string; name: string }[],
      validators: [Validators.required],
      errors: [{ key: 'required', message: 'Author is required' }],
    },
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

            // Update the options for the 'authorid' field
            const authorField = this.fields.find((field) => field.key === 'authorid');
            if (authorField) {
              authorField.options = this.authorNames; // Assign the mapped author objects
            }
          }
        }
      },
      error: (error) => {
        console.error('Error fetching authors:', error);
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
      formData.image = this.imageBase64;
      console.log(formData);
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
