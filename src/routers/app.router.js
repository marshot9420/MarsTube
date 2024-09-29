import express from 'express'
import { URLS } from '../constants'

const appRouter = express.Router()

appRouter.get(URLS.API.ROOT, (request, response) => {
  response.send('🚀 API 서버 동작 중')
})

appRouter.get(URLS.API.ERROR, (request, response) => {
  response
    .status(400)
    .send({ status: 'error', message: '일반적인 예외가 발생했습니다.' })
})

appRouter.get(URLS.API.UNEXPECTED_ERROR, (request, response) => {
  JSON.parse('유효하지 않은 JSON입니다.')
})

export default appRouter
