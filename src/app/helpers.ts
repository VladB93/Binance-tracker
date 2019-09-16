import { WebSocketK } from './interfaces';

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

export function convertRestKlineToWebSocketK(data: Array<any>) {
  const webSocketK: WebSocketK = {
    StartTime: data[0],
    OpenPrice: data[1],
    HighPrice: data[2],
    LowPrice: data[3],
    BaseVolume: data[4],
    QuoteVolume: data[5],
    NumberOfTrades: data[6],
    TakerBaseVolume: data[7],
    TakerQuoteVolume: data[8]
  };

  return webSocketK;
}
