import { TestBed } from '@angular/core/testing';

import { GameRestService } from './game-rest-service.service';

describe('GameRestServiceService', () => {
  let service: GameRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
