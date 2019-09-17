import { Injectable } from '@angular/core';
import { CoinKlines, BinanceKline } from 'src/app/interfaces';
import { WS_API_BASE_ENDPOINT, WS_API_MULTISTREAM } from 'src/app/consts';
import { KlineIntervals } from 'src/app/enums';
import { Subject } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { convertBinanceKlineToWebSocketKline } from 'src/app/helpers';

@Injectable({
  providedIn: 'root'
})
export class WebSocketKlineService {
  public wsKlineStream = new Subject();

  constructor() {}

  private createWebSocketConnectionString(coinKlines: Array<CoinKlines>) {
    let wsConnectionString = `${WS_API_BASE_ENDPOINT}${WS_API_MULTISTREAM}`;

    for (const coinKline of coinKlines) {
      wsConnectionString += `${coinKline.coin.symbol.toLowerCase()}@kline_${KlineIntervals['1m']}/`;
    }

    // remove last dash
    wsConnectionString = wsConnectionString.substring(0, wsConnectionString.length - 1);

    return wsConnectionString;
  }

  public streamKlines(coinKlines: Array<CoinKlines>) {
    const wsConnectionString = this.createWebSocketConnectionString(coinKlines);
    const socketStream = webSocket(wsConnectionString);

    socketStream.subscribe((e: BinanceKline) => {
      const wsStream = convertBinanceKlineToWebSocketKline(e);
      if (wsStream.Kline.Closed) {
        this.wsKlineStream.next(convertBinanceKlineToWebSocketKline(e));
      }
    });
  }
}
