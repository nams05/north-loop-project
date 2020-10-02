/**
 * This is an internal service which can be used to transform the data or calculate some additional information based
 * on the data received from the external service: rapidapi
 */


import { getAnalysis, getNews } from '../external/rapidapi-service'
import logger from '@shared/logger'

export const getAnalysisForSymbol = async (symbol: string, bypassCache: boolean) => {
  const startTime = Date.now()
  const response = await getAnalysis(symbol, bypassCache)
  logger.info(`Time taken by RapidAPI /get-analysis API: ${Date.now() - startTime} ms`)
  return response
}

export const getNewsForSymbol = async (symbol: string, bypassCache: boolean) => {
  const startTime = Date.now()
  const response = await getNews(symbol, bypassCache)
  logger.info(`Time taken by RapidAPI /get-news API: ${Date.now() - startTime} ms`)
  return response
}
