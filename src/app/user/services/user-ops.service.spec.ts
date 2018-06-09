import { TestBed, inject } from '@angular/core/testing';

import { UserOpsService } from './user-ops.service';

describe('UserOpsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserOpsService]
    });
  });

  it('should be created', inject([UserOpsService], (service: UserOpsService) => {
    expect(service).toBeTruthy();
  }));
});
