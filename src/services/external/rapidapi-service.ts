import axios from 'axios'
import logger from '@shared/logger'
import { RAPID_API_YAHOO_FINANCE_ANALYSIS_ENDPOINT, RAPID_API_YAHOO_NEWS_ENDPOINT } from '@shared/api-endpoints'
import { DEFAULT_REGION, RAPID_API_KEY, RAPID_API_QUERY_PARAMS, RAPID_API_REQUEST_HEADERS } from '@shared/constants'
import { rapidApiCache } from '@shared/cache/rapidapi-cache'

export const getAnalysis = async (symbol: string, bypassCache?: boolean) => {
  const cacheKey = 'analysis_' + symbol
  try {
    const cachedResponse = rapidApiCache.get(cacheKey)
    if (!bypassCache && cachedResponse) {
      logger.info(`Cache hit for /get-analysis API, cache key: ${cacheKey}`)
      return { response: cachedResponse, cacheHit: true }
    }
    const url = _getAnalysisURLWithQueryParams(symbol)
    const headers = _getRequestHeaders(url)
    logger.info(`Invoking RapidAPI /get-analysis API: ${url}`)
    const response = await axios.get(url.href, { headers })
    if (response.status === 200) rapidApiCache.set(cacheKey, response.data)
    return { response: response.data, cacheHit: false }
  } catch (e) {
    logger.error('Error fetching data from RapidAPI', { errMessage: e.message, stack: e.stack })
    throw Error('Error fetching data from RapidAPI')
  }
}


export const getNews = async (symbol: string, bypassCache?: boolean) => {
  const cacheKey = 'news_' + symbol
  try {
    const cachedResponse = rapidApiCache.get(cacheKey)
    if (!bypassCache && cachedResponse) {
      logger.info(`Cache hit for /get-news API, cache key: ${cacheKey}`)
      return { response: cachedResponse, cacheHit: true }
    }
    const url = _getNewsURLWithQueryParams(symbol)
    const headers = _getRequestHeaders(url)
    logger.info(`Invoking RapidAPI /get-news API: ${url}`)
    const response = await axios.get(url.href, { headers })
    if (response.status === 200) rapidApiCache.set(cacheKey, response.data)
    return { response: response.data, cacheHit: false }
  } catch (e) {
    logger.error('Error fetching data from RapidAPI', { errMessage: e.message, stack: e.stack })
    throw Error('Error fetching data from RapidAPI')
  }
}

const _getAnalysisURLWithQueryParams = (symbol: string) => {
  const url = new URL(RAPID_API_YAHOO_FINANCE_ANALYSIS_ENDPOINT)
  url.searchParams.set(RAPID_API_QUERY_PARAMS.REGION, DEFAULT_REGION)
  url.searchParams.set(RAPID_API_QUERY_PARAMS.SYMBOL, symbol)
  return url
}


const _getNewsURLWithQueryParams = (symbol: string) => {
  const url = new URL(RAPID_API_YAHOO_NEWS_ENDPOINT)
  url.searchParams.set(RAPID_API_QUERY_PARAMS.REGION, DEFAULT_REGION)
  url.searchParams.set(RAPID_API_QUERY_PARAMS.CATEGORY, symbol)
  return url
}

const _getRequestHeaders = (url: URL) => {
  const headers: any = {}
  headers[RAPID_API_REQUEST_HEADERS.HOST] = url.host
  headers[RAPID_API_REQUEST_HEADERS.RAPID_API_KEY] = RAPID_API_KEY
  return headers
}
