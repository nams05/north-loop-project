import NodeCache from 'node-cache'

export const rapidApiCache = new NodeCache({ stdTTL: 300, checkperiod: 280, deleteOnExpire: true })
