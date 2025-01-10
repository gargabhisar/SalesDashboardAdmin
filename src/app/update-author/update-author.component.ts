import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-author',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-author.component.html',
  styleUrl: './update-author.component.css'
})
export class UpdateAuthorComponent implements OnInit {
  userForm: FormGroup;
  imageBase64: string | null = null; // Store the Base64 string of the image
  authorId: string = ''; // To store the author ID
  states = [
    'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar',
    'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Goa',
    'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu & Kashmir', 'Jharkhand', 'Karnataka',
    'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya',
    'Mizoram', 'Nagaland', 'Odisha', 'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  ];


  constructor(
    private fb: FormBuilder,
    private webapi: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      image: [''],
      email: ['', [Validators.required, Validators.email]],
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
      personalBlogLink: ['', [Validators.pattern('https?://.+')]],
    });
  }

  ngOnInit(): void {
    this.authorId = this.webapi.getAuthorId();
    if (this.authorId) {
      this.loadAuthorData();
    }
  }

  // Load author data to prefill the form
  loadAuthorData() {
    this.webapi.getAuthorDetailsById(this.authorId).subscribe(
      (data: any) => {
        if (data && data.result) {
          const author = data.result;

          // Format the date to yyyy-MM-dd
          if (author.dob) {
            author.dob = new Date(author.dob).toISOString().split('T')[0];
          }

          this.userForm.patchValue(author);
          this.imageBase64 = author.image; // Load existing image
        } else {
          Swal.fire('Error', 'Author not found', 'error');
          this.router.navigate(['/authors']);
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

  onUpdate(): void {
    if (this.userForm.valid) {
      const formData = new FormData();
      Object.keys(this.userForm.value).forEach(key => {
        formData.append(key, this.userForm.value[key]);
      });
      console.log(formData);
      // this.authorService.updateAuthor(this.authorId, formData).subscribe({
      //   next: () => this.router.navigate(['/authors']),
      //   error: err => console.error('Update failed', err)
      // });
    }
  }
}
