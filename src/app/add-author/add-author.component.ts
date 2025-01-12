import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-author',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-author.component.html',
  styleUrl: './add-author.component.css'
})
export class AddAuthorComponent {
  userForm: FormGroup;
  imageBase64: string | null = null; // Store the Base64 string of the image
  states = [
    'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar',
    'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Goa',
    'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu & Kashmir', 'Jharkhand', 'Karnataka',
    'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya',
    'Mizoram', 'Nagaland', 'Odisha', 'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  constructor(private fb: FormBuilder, private webapi: ApiService,) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      image: ['', [this.imageFileValidator()]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      bio: ['', Validators.required],
      addressLine1: ['', Validators.required],
      addressLine2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      bankName: ['', Validators.required],
      bankAccountHolder: ['', Validators.required],
      bankAccountType: ['', Validators.required],
      bankAccountNumber: ['', [Validators.required, Validators.pattern('^[0-9]{9,18}$')]],
      bankIFSCCode: ['', [Validators.required, Validators.pattern('^[A-Z]{4}0[A-Z0-9]{6}$')]],
      facebookLink: ['', [Validators.pattern('https?://.+')]],
      instagramLink: ['', [Validators.pattern('https?://.+')]],
      youtubeLink: ['', [Validators.pattern('https?://.+')]],
      twitterLink: ['', [Validators.pattern('https?://.+')]],
      personalBlogLink: ['', [Validators.pattern('https?://.+')]]
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
