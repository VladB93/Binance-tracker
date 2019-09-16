import { Injectable } from '@angular/core';
import { Subject, Observable, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { REST_API_BASE_ENDPOINT, REST_API_EXCHANGE_INFO_ENDPOINT, PROXY, REST_API_KLINES_ENDPOINT, MAIN_SYMBOL } from '../../consts';
import { ExchangeInfo, TradingSymbol, CoinKlines } from '../../interfaces';
import { convertRestKlineToWebSocketK, toBeTagged } from 'src/app/helpers';


@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  private mainSymbolCoins;

  constructor(private http: HttpClient) {
  }

  public loadExchangeInfo() {
    this.http.get(`${REST_API_BASE_ENDPOINT}${REST_API_EXCHANGE_INFO_ENDPOINT}`)
      .subscribe((data: ExchangeInfo) => {
        this.mainSymbolCoins = data.symbols.filter((e: TradingSymbol) => e.symbol.includes(MAIN_SYMBOL));
        this.loadKlines();

    });
  }

  private loadKlines() {
    const requests = this.mainSymbolCoins.map((e: TradingSymbol) =>
      this.http.get(`${REST_API_BASE_ENDPOINT}${REST_API_KLINES_ENDPOINT}?symbol=${e.symbol}&interval=1m`));

    forkJoin(requests).subscribe((e: Array<Array<any>>) => {
      const klinesForMainSymbolCoins = this.mainSymbolCoins.map((name: string, i: number) => {
        const convertedKLines = e[i].map((kline: Array<any>) => convertRestKlineToWebSocketK(kline)); // convert from array to WebSocketK
        let coinKlines: CoinKlines;
        coinKlines = {
          name,
          data: convertedKLines,
          tagged: toBeTagged(convertedKLines),
        }
        return coinKlines;
      });
      return klinesForMainSymbolCoins.filter((e: CoinKlines) => e.tagged);
    })

  }
}
