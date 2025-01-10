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

  // Dynamic field definitions
  fields = [
    {
      key: 'name',
      label: 'Name',
      type: 'text',
      placeholder: 'Enter your name',
      validators: [Validators.required, Validators.minLength(3)],
      errors: [
        { key: 'required', message: 'Name is required' },
        { key: 'minlength', message: 'Name must be at least 3 characters' },
      ],
    },
    {
      key: 'dob',
      label: 'Date of Birth',
      type: 'date',
      placeholder: '',
      validators: [Validators.required],
      errors: [{ key: 'required', message: 'Date of Birth is required' }],
    },
    {
      key: 'gender',
      label: 'Gender',
      type: 'select',
      options: ['Female', 'Male', 'Other'],
      validators: [Validators.required],
      errors: [{ key: 'required', message: 'Gender is required' }],
    },
    {
      key: 'image',
      label: 'Profile Image',
      type: 'file',
      placeholder: '',
      validators: [this.imageFileValidator()],
      errors: [
        { key: 'invalidFileType', message: 'Only .jpg and .jpeg files are allowed' },
      ],
    },
    {
      key: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Enter your email',
      validators: [Validators.required, Validators.email],
      errors: [
        { key: 'required', message: 'Email is required' },
        { key: 'email', message: 'Invalid email format' },
      ],
    },
    {
      key: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Enter your password',
      validators: [Validators.required, Validators.minLength(6)],
      errors: [
        { key: 'required', message: 'Password is required' },
        { key: 'minlength', message: 'Password must be at least 6 characters' },
      ],
    },
    {
      key: 'mobile',
      label: 'Mobile Number',
      type: 'tel',
      placeholder: 'Enter your mobile number',
      validators: [Validators.required, Validators.pattern('^[0-9]{10}$')],
      errors: [
        { key: 'required', message: 'Mobile number is required' },
        { key: 'pattern', message: 'Mobile number must be 10 digits' },
      ],
    },
    {
      key: 'bio',
      label: 'Bio',
      type: 'textarea',
      placeholder: 'Write about yourself',
      validators: [],
      errors: [],
    },
    {
      key: 'addressLine1',
      label: 'Address Line 1',
      type: 'text',
      placeholder: 'Enter address line 1',
      validators: [Validators.required],
      errors: [{ key: 'required', message: 'Address Line 1 is required' }],
    },
    {
      key: 'addressLine2',
      label: 'Address Line 2',
      type: 'text',
      placeholder: 'Enter address line 2',
      validators: [Validators.required],
      errors: [{ key: 'required', message: 'Address Line 2 is required' }],
    },
    {
      key: 'city',
      label: 'City',
      type: 'text',
      placeholder: 'Enter city',
      validators: [Validators.required],
      errors: [{ key: 'required', message: 'City is required' }],
    },
    {
      key: 'state',
      label: 'State',
      type: 'select',
      options: ['Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu & Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'],
      validators: [Validators.required],
      errors: [{ key: 'required', message: 'State is required' }],
    },
    {
      key: 'pincode',
      label: 'Pincode',
      type: 'text',
      placeholder: 'Enter pincode',
      validators: [Validators.required, Validators.pattern('^[0-9]{6}$')],
      errors: [
        { key: 'required', message: 'Pincode is required' },
        { key: 'pattern', message: 'Pincode must be 6 digits' },
      ],
    },
    {
      key: 'bankName',
      label: 'Bank Name',
      type: 'text',
      placeholder: 'Enter bank name',
      validators: [Validators.required],
      errors: [{ key: 'required', message: 'Bank name is required' }],
    },
    {
      key: 'bankAccountHolder',
      label: 'Bank Account Holder',
      type: 'text',
      placeholder: 'Enter Bank Account Holder',
      validators: [Validators.required],
      errors: [{ key: 'required', message: 'Bank Account Holder is required' }],
    },
    {
      key: 'bankAccountType',
      label: 'Bank Account Type',
      type: 'text',
      placeholder: 'Enter Bank Account Type',
      validators: [Validators.required],
      errors: [{ key: 'required', message: 'Bank Account Type is required' }],
    },
    {
      key: 'bankAccountNumber',
      label: 'Bank Account Number',
      type: 'text',
      placeholder: 'Enter account number',
      validators: [Validators.required, Validators.pattern('^[0-9]{9,18}$')],
      errors: [
        { key: 'required', message: 'Account number is required' },
        { key: 'pattern', message: 'Account number must be 9-18 digits' },
      ],
    },
    {
      key: 'bankIFSCCode',
      label: 'IFSC Code',
      type: 'text',
      placeholder: 'Enter IFSC code',
      validators: [Validators.required, Validators.pattern('^[A-Z]{4}0[A-Z0-9]{6}$')],
      errors: [
        { key: 'required', message: 'IFSC code is required' },
        { key: 'pattern', message: 'Invalid IFSC code format' },
      ],
    },
    {
      key: 'facebookLink',
      label: 'Facebook Link',
      type: 'url',
      placeholder: 'Enter your Facebook profile URL',
      validators: [Validators.pattern('https?://.+')],
      errors: [{ key: 'pattern', message: 'Enter a valid URL starting with http/https' }],
    },
    {
      key: 'instagramLink',
      label: 'Instagram Link',
      type: 'url',
      placeholder: 'Enter your Instagram profile URL',
      validators: [Validators.pattern('https?://.+')],
      errors: [{ key: 'pattern', message: 'Enter a valid URL starting with http/https' }],
    },
    {
      key: 'youtubeLink',
      label: 'YouTube Link',
      type: 'url',
      placeholder: 'Enter your YouTube channel URL',
      validators: [],
      errors: [],
    },
    {
      key: 'twitterLink',
      label: 'Twitter Link',
      type: 'url',
      placeholder: 'Enter your Twitter profile URL',
      validators: [],
      errors: [],
    },
    {
      key: 'personalBlogLink',
      label: 'Personal Blog Link',
      type: 'url',
      placeholder: 'Enter your personal blog URL',
      validators: [],
      errors: [],
    }
  ];

  constructor(private fb: FormBuilder, private webapi: ApiService) {
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
