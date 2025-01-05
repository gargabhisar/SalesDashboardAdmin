import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm = new FormGroup({
    useremail: new FormControl('', [Validators.required, Validators.email]),
    userpassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    publicationid: new FormControl('677800910b61ed7b0b6b6e71')
  });

  constructor(private formBuilder: FormBuilder, private router: Router, private webapi: ApiService) { 
    
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    let loginresult = this.webapi.login(this.loginForm.value);

    loginresult.subscribe((data: any) => {
      if(data.statusCode == 400)
      {
        Swal.fire({
          title: data.validation[0].title,
          text: data.validation[0].details,
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
      else{
        sessionStorage.setItem('result', JSON.stringify(data.result));
        this.router.navigateByUrl('/dashboard')
      }
    })
  }
}
