import { Injectable } from '@angular/core';
import { RestApiService } from '../rest-api/rest-api.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  public coinKlines = new Subject();

  constructor(private restApiService: RestApiService) {
    this.restApiService.klinesForMainSymbolCoins.subscribe(e => {
      this.coinKlines.next(e);
    });
  }

  public init() {
    this.restApiService.loadExchangeInfo();
  }
}
