import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth';

@Injectable()
export class TokenInterceptorService {
  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.authService.isWhitelisted(request.url)) {
      return next.handle(request);
    }

    const clonedRequest = request.clone({
      headers: request.headers.set('x-auth-token', this.authService.token)
    });

    return next.handle(clonedRequest);
  }
}
