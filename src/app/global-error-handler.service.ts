import { ErrorHandler, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler{
  constructor(private router: Router) { }


  handleError(error: any): void {
    let status = error.status != null ? error.status : '0';
    this.router.navigate(['/error/' + status]);
  }
}
