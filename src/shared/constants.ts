
export const paramMissingError = 'One or more of the required parameters was missing.';

export const enum ERROR {
  INTERNAL_SERVER_ERROR = 500,
  BAD_REQUEST = 400
}

export const enum RAPID_API_QUERY_PARAMS {
  REGION = 'region',
  SYMBOL = 'symbol',
  CATEGORY = 'category'
}

export const enum RAPID_API_REQUEST_HEADERS {
  HOST = 'x-rapidapi-host',
  RAPID_API_KEY = 'x-rapidapi-key',
}

export const RAPID_API_KEY = process.env.RAPID_API_KEY

export const DEFAULT_REGION: string = process.env.DEFAULT_REGION!
