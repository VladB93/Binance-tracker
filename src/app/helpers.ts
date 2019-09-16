import { WebSocketK } from "./interfaces";
import { LIMIT } from "./consts";

/*
KLine format from REST API

[
    1499040000000,      // Open time
    "0.01634790",       // Open
    "0.80000000",       // High
    "0.01575800",       // Low
    "0.01577100",       // Close
    "148976.11427815",  // Volume
    1499644799999,      // Close time
    "2434.19055334",    // Quote asset volume
    308,                // Number of trades
    "1756.87402397",    // Taker buy base asset volume
    "28.46694368",      // Taker buy quote asset volume
    "17928899.62484339" // Ignore.
  ]

*/

export function convertRestKlineToWebSocketK(data: Array<any>): WebSocketK {
  const webSocketK: WebSocketK = {
    StartTime: data[0],
    OpenPrice: data[1],
    HighPrice: data[2],
    LowPrice: data[3],
    ClosePrice: data[4],
    BaseVolume: data[5],
    CloseTime: data[6],
    QuoteVolume: data[7],
    NumberOfTrades: data[8],
    TakerBaseVolume: data[9],
    TakerQuoteVolume: data[10]
  };

  return webSocketK;
}

/*
Req:
1) % price change on 1min > 1%
2) price change over 3 mins > 3%
3) or price change over 15 mins > 5%

*/

export function toBeTagged(klines: Array<WebSocketK>) {
  const l = LIMIT - 1; // match last of array;
  const last1 = 1;
  const last3 = 3;
  const last15 = 15;
  // list criteria here
  if (
    calcPercentage(
      Number(klines[l - last1].ClosePrice),
      Number(klines[l].ClosePrice)
    ) > 1 ||
    calcPercentage(
      Number(klines[l - last3].ClosePrice),
      Number(klines[l].ClosePrice)
    ) > 3 ||
    calcPercentage(
      Number(klines[l - last15].ClosePrice),
      Number(klines[l].ClosePrice)
    ) > 5
  ) {
    return true;
  }
  return false;
}

export function calcPercentage(startNum: number, endNum: number): number {
  return ((endNum - startNum) / startNum) * 100;
}
