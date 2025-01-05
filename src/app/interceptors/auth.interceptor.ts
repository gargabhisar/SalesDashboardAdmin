import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ApiService } from '../services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  // Inject the Router, API Servicec
  const router = inject(Router);
  const apiService = inject(ApiService);
  const spinnerService = inject(NgxSpinnerService);

  // Get the token from sessionStorage
  const authToken = apiService.getToken();

  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: authToken ? `Bearer ${authToken}` : '', // Add your token or custom header
    },
  });

  // Show the spinner
  spinnerService.show();

  return next(clonedRequest).pipe(
    catchError((error) => {
      // console.log('error is intercept')
      // console.error(error);
      if (error instanceof HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          console.error("Error Event");
        } else {
          console.log(`error status : ${error.status} ${error.statusText}`);
          switch (error.status) {
            case 401:      //login
              router.navigateByUrl("/login");
              break;
            case 403:     //forbidden
              router.navigateByUrl("/unauthorized");
              break;
            case 400:
              // Extract validation errors
              const validationErrors = error.error.errors;
              let errorMessage = 'Validation errors occurred:\n';
              for (const field in validationErrors) {
                if (validationErrors.hasOwnProperty(field)) {
                  errorMessage += `${field}: ${validationErrors[field].join(', ')}\n`;
                }
              }

              // Show error message with SweetAlert
              Swal.fire({
                title: 'Validation Error',
                text: errorMessage,
                icon: 'error',
                confirmButtonText: 'OK',
              });
          }
        }
      } else {
        Swal.fire({
          title: 'Error',
          text: error.message || 'An unexpected error occurred.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
      return throwError(error.message);
    }),
    finalize(
      () => {
        spinnerService.hide();
      }
    )
  );
};
