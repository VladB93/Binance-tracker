import { KlineIntervals, SymbolStatus } from './enums';

export interface WebSocketKlineStream {
  stream: string;
  data: WebSocketKline;
}

export interface WebSocketKline {
  EventType: string;
  EventTime: number;
  SymbolName: string;
  Kline: WebSocketK;
}

export interface WebSocketK {
  StartTime?: number;
  CloseTime?: number;
  SymbolName?: string;
  Interval?: KlineIntervals;
  FirstTradeId?: number;
  LastTradeId?: number;
  OpenPrice?: string;
  ClosePrice?: string;
  HighPrice?: string;
  LowPrice?: string;
  BaseVolume?: string;
  NumberOfTrades?: number;
  Closed?: boolean;
  QuoteVolume?: string;
  TakerBaseVolume?: string;
  TakerQuoteVolume?: string;
}

export interface ExchangeInfo {
  serverTime: number;
  symbols: Array<any>;
}

export interface TradingSymbol {
  symbol: string;
  status: SymbolStatus;
}

export interface CoinKlines {
  coin: TradingSymbol;
  data: Array<WebSocketK>;
  tagged: boolean;
}
