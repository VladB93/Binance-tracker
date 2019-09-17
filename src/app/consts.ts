export const PROXY = 'https://cors-anywhere.herokuapp.com';
export const REST_API_BASE_ENDPOINT = `${PROXY}/https://api.binance.com`;
export const REST_API_PING_ENDPOINT = 'api/v1/ping';
export const REST_API_EXCHANGE_INFO_ENDPOINT = '/api/v1/exchangeInfo';
export const REST_API_SERVER_TIME_ENDPOINT = '/api/v1/time';
export const REST_API_KLINES_ENDPOINT = '/api/v1/klines';

export const WS_API_BASE_ENDPOINT = 'wss://stream.binance.com:9443';
export const WS_API_MULTISTREAM = '/stream?streams=';
export const WS_ALL_MARKETS_DAILY_STREAM = '!ticker@arr';

export const MAIN_SYMBOL = 'BTC';
export const LIMIT = 500; // max 1000;
