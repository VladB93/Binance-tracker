import { Injectable } from '@angular/core';
import { RestApiService } from '../rest-api/rest-api.service';
import { Subject } from 'rxjs';
import { WebSocketKlineService } from '../websocket-kline/websocket-kline.service';
import { CoinKlines, ObjectKlines } from 'src/app/interfaces';
import { convertArrayKlineToObject } from 'src/app/helpers';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private coinKlinesData: ObjectKlines;
  public coinKlinesSubject = new Subject();

  constructor(private restApiService: RestApiService, private webSocketKlineService: WebSocketKlineService) {
    this.restApiService.klinesForMainSymbolCoins.subscribe((e: Array<CoinKlines>) => {
      this.coinKlinesData = convertArrayKlineToObject(e);
      console.log(this.coinKlinesData, 'created');
      this.webSocketKlineService.streamKlines(this.coinKlinesData);
      this.coinKlinesSubject.next(this.coinKlinesData);
      this.webSocketKlineService.wsKlineStream.subscribe((wsStream: ObjectKlines) => {
        this.coinKlinesData = wsStream;
        console.log(wsStream, 'updated');
        this.coinKlinesSubject.next(this.coinKlinesData);
      });
    });
  }

  public init() {
    this.restApiService.loadExchangeInfo();
  }

}
