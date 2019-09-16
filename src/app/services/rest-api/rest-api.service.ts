import { Injectable } from '@angular/core';
import { Subject, Observable, of, from, forkJoin } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { REST_API_BASE_ENDPOINT, REST_API_EXCHANGE_INFO_ENDPOINT, PROXY, REST_API_KLINES_ENDPOINT, MAIN_SYMBOL } from '../../consts';
import { ExchangeInfo, TradingSymbol } from '../../interfaces';


@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  private pairsToBeLoaded;

  constructor(private http: HttpClient) {
  }

  public loadExchangeInfo() {
    this.http.get(`${REST_API_BASE_ENDPOINT}${REST_API_EXCHANGE_INFO_ENDPOINT}`)
      .subscribe((data: ExchangeInfo) => {
        this.pairsToBeLoaded = data.symbols.filter((e: TradingSymbol) => e.symbol.includes(MAIN_SYMBOL));
        console.log(this.pairsToBeLoaded)
        this.loadKlines();

    });
  }

  private loadKlines() {
    const requests = this.pairsToBeLoaded.map((e: TradingSymbol) =>
      this.http.get(`${REST_API_BASE_ENDPOINT}${REST_API_KLINES_ENDPOINT}?symbol=${e.symbol}&interval=1m`));

    forkJoin(requests).subscribe(e => {
      const result = this.pairsToBeLoaded.map((name: string, i: number) => {
        return {
          name,
          data: e[i]
        };
      });
    });

  }
}
