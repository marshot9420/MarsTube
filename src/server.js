import express from 'express'

import morgan from 'morgan'

import { handleServerListener, initializeEnv } from '@/configs'
import { CONFIGS, URLS } from '@/constants'
import { logger, morganStream } from '@/libs'

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
app.get(URLS.API.HOME, (request, response) => {
  response.send('Hello World!')
})

try {
  app.listen(CONFIGS.PORT, () => {
    logger.info(`✅ 서버가 포트 ${CONFIGS.PORT}에서 시작되었습니다.`)
    handleServerListener()
  })
} catch (error) {
  logger.error(`❌ 서버 실행 중 오류 발생: ${error.message}`, error)
}
