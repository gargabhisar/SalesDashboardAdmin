import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ApiService } from '../services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';


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
          }
        }
      } else {
        console.error("some thing else happened");
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
