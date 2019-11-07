import { KlineIntervals, SymbolStatus, FilterType, ComparisonType } from './enums';

export interface WebSocketKlineStream {
  stream: string;
  data: WebSocketKline;
}

export interface WebSocketKline {
  EventType: string;
  EventTime: number;
  StreamName: string;
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

export interface BinanceKline {
  data: any;
  stream: any;
}

export interface ObjectKlines {
  [prop: string]: CoinKlines;
}

export interface TaggedGridEntry {
  Ticker?: string;
  Price?: number;
  'Daily Vol'?: number;
  'Price Spike'?: number;
  '% change(3m)'?: number;
  '% change(15m)'?: number;
  '% change(1h)'?: number;
  '% change(4h)'?: number;
}

export interface Filter {
  type?: FilterType;
  interval?: number;
  comparison?: ComparisonType;
  percentage?: number;
  apply?: boolean;
}