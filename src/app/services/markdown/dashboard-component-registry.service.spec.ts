import { TestBed } from '@angular/core/testing';

import { DashboardComponentRegistryService } from './dashboard-component-registry.service';

describe('DashboardComponentRegistryService', () => {
  let service: DashboardComponentRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardComponentRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
