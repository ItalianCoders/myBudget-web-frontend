import { TestBed, inject } from '@angular/core/testing';

import { TokenInterceptorServiceService } from './token-interceptor-service.service';

describe('TokenInterceptorServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenInterceptorServiceService]
    });
  });

  it('should be created', inject([TokenInterceptorServiceService], (service: TokenInterceptorServiceService) => {
    expect(service).toBeTruthy();
  }));
});
