export enum KlineIntervals {
  '1m' = '1m',
  '3m' = '3m',
  '5m' = '5m',
  '15m' = '15m',
  '30m' = '30m',
  '1h' = '1h',
  '2h' = '2h',
  '4h' = '4h',
  '6h' = '6h',
  '8h' = '8h',
  '12h' = '12h',
  '1d' = '3d',
  '1w' = '1w',
  '1M' = '1M'
}

export enum SymbolStatus {
  PRE_TRADING = 'PRE_TRADING',
  TRADING = 'TRADING',
  POST_TRADING = 'POST_TRADING',
  END_OF_DAY = 'END_OF_DAY',
  HALT = 'HALF',
  AUCTION_MATCH = 'AUCTION_MATCH',
  BREAK = 'BREAK'
}

export enum FilterType {
  price = 'Price',
  volume = 'Volume'
}

export enum ComparisonType {
  'moreOrEqual' = 'More or Equal',
  'lessOrEqual' = 'Less or Equal',
}
