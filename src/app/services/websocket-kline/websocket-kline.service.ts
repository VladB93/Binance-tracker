import { Injectable } from "@angular/core";
import { CoinKlines, BinanceKline, ObjectKlines, WebSocketKline } from "src/app/interfaces";
import { WS_API_BASE_ENDPOINT, WS_API_MULTISTREAM } from "src/app/consts";
import { KlineIntervals, WebSocketFeed } from "src/app/enums";
import { Subject } from "rxjs";
import { webSocket } from "rxjs/webSocket";
import { convertBinanceKlineToWebSocketKline, toBeTagged, convertToDailyVolume } from "src/app/helpers";

@Injectable({
  providedIn: "root"
})
export class WebSocketKlineService {
  private objectKlines;
  private pairs;
  public wsKlineStream = new Subject();

  constructor() {}

  private createWebSocketConnectionString(objectKlines: ObjectKlines, type: WebSocketFeed) {
    let wsConnectionString = `${WS_API_BASE_ENDPOINT}${WS_API_MULTISTREAM}`;

    if (type === WebSocketFeed.klines) {

      for (const pair of this.pairs) {
        wsConnectionString += `${pair.toLowerCase()}@kline_${KlineIntervals["1m"]}/`;
      }
    }
    else if (type === WebSocketFeed.dailyVolume){

      for (const pair of this.pairs) {
        wsConnectionString += `${pair.toLowerCase()}@miniTicker/`;
      }
    }

    // remove last dash from connection string
    wsConnectionString = wsConnectionString.substring(0, wsConnectionString.length - 1);

    return wsConnectionString;
  }

  public streamKlines(objectKlines: ObjectKlines) {
    this.pairs = Object.keys(objectKlines);
    this.objectKlines = objectKlines;
    const wsKlinesConnectionString = this.createWebSocketConnectionString(this.objectKlines, WebSocketFeed.klines);
    const klinesStream = webSocket(wsKlinesConnectionString);
    const wsVolumeConnectionString = this.createWebSocketConnectionString(this.objectKlines, WebSocketFeed.dailyVolume);
    const volumeStream = webSocket(wsVolumeConnectionString);

    // this socket feeds klines information
    klinesStream.subscribe((e: BinanceKline) => {
      const wsKline = convertBinanceKlineToWebSocketKline(e);
      if (wsKline.Kline.Closed) {
        const symbolName = wsKline.Kline.SymbolName;
        // the pair is updated in the past minute
        this.objectKlines[symbolName].updatedInThePastMinute = true;
        // update the data in the object klines with the newest socket candle
        this.updateObjectKlinesWithNewData(wsKline);
        if (this.checkAllPairsForUpdatesInPastMinute()) {
          this.wsKlineStream.next(this.objectKlines);
          // set all pairs back to not updated in the past minute after sending the whole batch of updates
          this.setAllPairsToNotUpdated();
        }
      }
    });

    // this socket feeds daily volume updates;
    volumeStream.subscribe((e: BinanceKline) => {
      const wsDailyVolume = convertToDailyVolume(e);
      this.objectKlines[wsDailyVolume.SymbolName].dailyVolume = wsDailyVolume.DailyVolume;
    })
  }

  private checkAllPairsForUpdatesInPastMinute() {
    for (const pair of this.pairs) {
      if (!this.objectKlines[pair].updatedInThePastMinute) {
        return false;
      }
    }
    return true;
  }

  private setAllPairsToNotUpdated() {
    for (const pair of this.pairs) {
      this.objectKlines[pair].updatedInThePastMinute = false;
    }
  }

  private updateObjectKlinesWithNewData(wsKline: WebSocketKline) {
    const symbolName = wsKline.Kline.SymbolName;
    const newData = this.objectKlines[symbolName].data;
    newData.shift();
    newData.push(wsKline.Kline);
    this.objectKlines[symbolName].data = newData;
    this.objectKlines[symbolName].tagged = toBeTagged(newData);
  }
}
