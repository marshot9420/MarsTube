import express from 'express'

import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import morgan from 'morgan'
import path from 'path'

import { corsConfig } from '@/configs'
import { CONFIGS, URLS } from '@/constants'
import { logger, morganStream } from '@/libs'
import { httpExceptionFilter, successInterceptor } from '@/middlewares'

export default class Application {
  constructor() {
    this.app = express()
  }

  initializeEnv() {
    const envFilePath =
      process.env.NODE_ENV === CONFIGS.NODE_ENV.DEVELOPMENT
        ? path.resolve(process.cwd(), '.env.development')
        : path.resolve(process.cwd(), '.env.production')

    dotenv.config({ path: envFilePath })
    logger.info(`🌍 환경 변수 초기화가 완료되었습니다. [경로: ${envFilePath}]`)
  }

  async configureDatabase() {
    try {
      logger.info(`🔌 MongoDB 연결 시도: ${process.env.MONGO_URI}`)
      await mongoose.connect(process.env.MONGO_URI)
      logger.info('✅ MongoDB에 성공적으로 연결되었습니다!')
    } catch (error) {
      logger.error(`❌ MongoDB 연결 오류 발생: ${error.message}`)
      process.exit(1)
    }
  }

  configureLogger() {
    this.app.use(
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
    logger.info('🔍 로거 설정 완료')
  }

  configureMiddleware() {
    this.app.use(express.json())
    this.app.use(cookieParser())
    logger.info('🧩 미들웨어 설정 완료')

    try {
      const corsOptions = corsConfig()
      this.app.use(cors(corsOptions))
      logger.info(`🌐 CORS 설정 완료: ${JSON.stringify(corsOptions)}`)
    } catch (error) {
      logger.error(`⚠️ CORS 설정 중 오류 발생: ${error.message}`)
    }
  }

  configureViewEngine() {
    this.app.set('views', path.resolve(__dirname, 'views'))
    this.app.set('view engine', 'pug')
    logger.info('🖼️ 뷰 엔진(Pug) 설정 완료')
  }

  configureInterceptors() {
    this.app.use(successInterceptor)
    this.app.use(httpExceptionFilter)
    logger.info('🛠️ 글로벌 인터셉터 및 예외 필터 설정 완료')
  }

  configureRoutes() {
    this.app.get(URLS.API.HOME, (request, response) => {
      response.render('index', {
        title: 'Hello Pug!',
        message: 'Welcome to Pug Template!',
      })
    })

    this.app.get(URLS.API.ERROR, (request, response) => {
      throw new HttpException('❌ 일반적인 예외가 발생했습니다.', 400)
    })

    this.app.get(URLS.API.UNEXPECTED_ERROR, (request, response) => {
      JSON.parse('❌ 유효하지 않은 JSON')
    })

    logger.info('🛣️ 라우트 설정 완료')
  }

  async initialize() {
    this.initializeEnv()
    await this.configureDatabase()
    this.configureLogger()
    this.configureMiddleware()
    this.configureViewEngine()
    this.configureInterceptors()
    this.configureRoutes()
  }

  start() {
    this.app.listen(CONFIGS.PORT, () => {
      logger.info(`🚀 서버 수신 중: ${CONFIGS.HOST}:${CONFIGS.PORT}`)
    })
  }
}
