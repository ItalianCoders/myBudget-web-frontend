import {Inject, Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthConfig, AuthTokenConfig} from '@core';

@Injectable()
export class TokenInterceptorService {

  constructor(@Inject(AuthConfig) private config: AuthTokenConfig) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    debugger;
    const token = localStorage.getItem('app_token');
    if (!request.url.startsWith(this.config.ApiUrl)
      || (request.url.startsWith(this.config.ApiUrl + '/public'))
      || !token) {
      return next.handle(request);
    }
    const clonedRequest = request.clone(
      {headers: request.headers.set('x-auth-token', JSON.parse(token)['app_token'])});
    return next.handle(clonedRequest);
  }

}
