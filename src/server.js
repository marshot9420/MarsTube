import express from 'express'

import morgan from 'morgan'

import { handleServerListener, initializeEnv } from '@/configs'
import { CONFIGS, URLS } from '@/constants'
import { logger, HttpException, morganStream } from '@/libs'
import { httpExceptionFilter, successInterceptor } from '@/middlewares'

initializeEnv()

const app = express()

app.use(
  morgan(
    (tokens, request, response) => {
      return [
        tokens.method(request, response),
        tokens.url(request, response),
        tokens.status(request, response),
        tokens.res(request, response, 'content-length'),
        '-',
        tokens['response-time'](request, response),
        'ms',
      ].join(' ')
    },
    { stream: morganStream },
  ),
)

logger.info('✅ 서버 초기화 완료')

app.use(successInterceptor)

app.get(URLS.API.HOME, (request, response) => {
  response.send(JSON.stringify({ message: 'Hello World!' }))
})

app.get(URLS.API.ERROR, (request, response) => {
  throw new HttpException('❌ 일반적인 예외가 발생했습니다.', 400)
})

app.get(URLS.API.UNEXPECTED_ERROR, (request, response) => {
  JSON.parse('❌ 유효하지 않은 JSON')
})

app.use(httpExceptionFilter)

try {
  app.listen(CONFIGS.PORT, () => {
    logger.info(`✅ 서버가 포트 ${CONFIGS.PORT}에서 시작되었습니다.`)
    handleServerListener()
  })
} catch (error) {
  logger.error(`❌ 서버 실행 중 오류 발생: ${error.message}`, error)
}
