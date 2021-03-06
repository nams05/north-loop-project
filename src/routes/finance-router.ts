import { Request, Response, Router } from 'express'
import { ERROR } from '@shared/constants'
import { createFailureResponse, successResponse, failureResponse } from '@shared/functions'
import { getAnalysisForSymbol, getNewsForSymbol } from '../services/internal/finance-service'
import _ from 'lodash'
import { RAPID_API_YAHOO_FINANCE_ANALYSIS_ENDPOINT, RAPID_API_YAHOO_NEWS_ENDPOINT } from '@shared/api-endpoints'

const router = Router();

router.get('/get/news', async (req: Request, res: Response) => {
  const { symbol, bypass } = _sanitizeParams(req)
  if (_.isEmpty(symbol)) {
    return res.status(ERROR.BAD_REQUEST).json(createFailureResponse(new Error('Missing query param: symbol')))
  }
  try {
    const bypassCache: boolean = bypass === 'true'
    const { response, cacheHit } = await getNewsForSymbol(symbol, bypassCache)
    const responseData = !_isResponseEmpty(response)
        ? successResponse(response, RAPID_API_YAHOO_NEWS_ENDPOINT, cacheHit)
        : failureResponse(response, RAPID_API_YAHOO_NEWS_ENDPOINT, cacheHit)
    return res.json(responseData)
  } catch (e) {
    return res.status(ERROR.INTERNAL_SERVER_ERROR).json( createFailureResponse(e) )
  }
})

router.get('/get/analysis', async (req: Request, res: Response) => {
  const { symbol, bypass } = _sanitizeParams(req)
  if (_.isEmpty(symbol)) {
    return res.status(ERROR.BAD_REQUEST).json(createFailureResponse(new Error('Missing query param: symbol')))
  }
  try {
    const bypassCache: boolean = bypass === 'true'
    const { response, cacheHit } = await getAnalysisForSymbol(symbol, bypassCache)
    const responseData = !_isResponseEmpty(response)
        ? successResponse(response, RAPID_API_YAHOO_NEWS_ENDPOINT, cacheHit)
        : failureResponse(response, RAPID_API_YAHOO_NEWS_ENDPOINT, cacheHit)
    return res.json(responseData)
  } catch (e) {
    return res.status(ERROR.INTERNAL_SERVER_ERROR).json( createFailureResponse(e) )
  }
})

const _sanitizeParams = (req: Request) => {
  const symbol: string = _.get(req, 'query.symbol', '').toUpperCase()
  const bypass: string = _.get(req, 'query.bypassCache', 'false').toLowerCase()
  return { symbol, bypass }
}

const _isResponseEmpty = (result: any) => {
  return _.isEmpty((result)) || (result.items && _.isEmpty(result.items.results))
}

export default router
