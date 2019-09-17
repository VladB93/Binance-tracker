import { TestBed } from '@angular/core/testing';

import { WebSocketKlineService } from './websocket-kline.service';

describe('WebSocketKlineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebSocketKlineService = TestBed.get(WebSocketKlineService);
    expect(service).toBeTruthy();
  });
});
