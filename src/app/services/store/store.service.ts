import { Injectable } from '@angular/core';
import { RestApiService } from '../rest-api/rest-api.service';
import { Subject } from 'rxjs';
import { WebSocketKlineService } from '../websocket-kline/websocket-kline.service';
import { CoinKlines, ObjectKlines, WebSocketKline } from 'src/app/interfaces';
import { convertArrayKlineToObject, toBeTagged } from 'src/app/helpers';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private coinKlinesData: ObjectKlines;
  public coinKlinesSubject = new Subject();

  constructor(private restApiService: RestApiService, private webSocketKlineService: WebSocketKlineService) {
    this.restApiService.klinesForMainSymbolCoins.subscribe((e: Array<CoinKlines>) => {
      this.coinKlinesData = convertArrayKlineToObject(e);
      this.webSocketKlineService.streamKlines(e);
      this.coinKlinesSubject.next(this.coinKlinesData);
      this.webSocketKlineService.wsKlineStream.subscribe((wsStream: WebSocketKline) => {
        this.handleStream(wsStream);
      });
    });
  }

  public init() {
    this.restApiService.loadExchangeInfo();
  }

  private handleStream(wsStream: WebSocketKline) {
    const streamName = wsStream.Kline.SymbolName;
    const newData = this.coinKlinesData[streamName].data;
    newData.shift();
    newData.push(wsStream.Kline);
    this.coinKlinesData[streamName].data = newData;
    this.coinKlinesData[streamName].tagged = toBeTagged(newData);
    this.coinKlinesSubject.next(this.coinKlinesData);
  }
}
