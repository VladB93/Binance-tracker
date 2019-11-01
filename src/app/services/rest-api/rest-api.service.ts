import { Injectable } from "@angular/core";
import { forkJoin, Subject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { REST_API_BASE_ENDPOINT, REST_API_EXCHANGE_INFO_ENDPOINT, PROXY, REST_API_KLINES_ENDPOINT, MAIN_SYMBOL, REST_API_DAILY_VOLUME } from "../../consts";
import { ExchangeInfo, TradingSymbol, CoinKlines } from "../../interfaces";
import { convertRestKlineToWebSocketK, toBeTagged } from "src/app/helpers";
import { SymbolStatus, KlineIntervals } from "src/app/enums";

@Injectable({
  providedIn: "root"
})
export class RestApiService {
  public klinesForMainSymbolCoins = new Subject();
  private mainSymbolCoins;

  constructor(private http: HttpClient) {}

  public loadExchangeInfo() {
    return this.http.get(`${REST_API_BASE_ENDPOINT}${REST_API_EXCHANGE_INFO_ENDPOINT}`).subscribe((data: ExchangeInfo) => {
      this.mainSymbolCoins = data.symbols
        .filter((e: TradingSymbol) => e.symbol.includes(MAIN_SYMBOL) && e.status === SymbolStatus.TRADING)
      this.loadKlinesAndVolume();
    });
  }

  private loadKlinesAndVolume() {
    const requests = this.mainSymbolCoins.map((e: TradingSymbol) =>
      this.http.get(`${REST_API_BASE_ENDPOINT}${REST_API_KLINES_ENDPOINT}?symbol=${e.symbol}&interval=${KlineIntervals["1m"]}`)
    );

    return forkJoin(requests).subscribe((kline: Array<Array<any>>) => {

      this.loadDailyVolume().subscribe((dailyVolume: Array<any>) => {
        const result = this.mainSymbolCoins.map((coin: TradingSymbol, i: number) => {
          const convertedKLines = kline[i].map((kline: Array<any>) => convertRestKlineToWebSocketK(kline)); // convert from array to WebSocketK
          const dv = dailyVolume.find((e:any) => e.symbol === coin.symbol);
          let coinKlines: CoinKlines;
          coinKlines = {
            coin,
            data: convertedKLines,
            tagged: toBeTagged(convertedKLines),
            dailyVolume: dv ? Number(dv.quoteVolume) : 0
          };
          return coinKlines;
        });
        this.klinesForMainSymbolCoins.next(result);
      })
    });
  }

  private loadDailyVolume(): Observable<Object> {
    return this.http.get(`${REST_API_BASE_ENDPOINT}${REST_API_DAILY_VOLUME}`);
  }
}
