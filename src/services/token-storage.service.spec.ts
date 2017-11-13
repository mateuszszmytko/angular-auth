import { TestBed, inject } from '@angular/core/testing';

import { TokenStorageService } from './token-storage.service';

describe('MyServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenStorageService]
    });
  });

  it('should be created', inject([TokenStorageService], (service: TokenStorageService) => {
    expect(service).toBeTruthy();
  }));
});
