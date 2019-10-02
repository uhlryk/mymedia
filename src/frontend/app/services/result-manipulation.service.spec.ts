import { TestBed } from '@angular/core/testing';

import { ResultManipulationService } from './result-manipulation.service';

describe('ResultManipulationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResultManipulationService = TestBed.get(ResultManipulationService);
    expect(service).toBeTruthy();
  });
});
