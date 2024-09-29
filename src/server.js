import Application from './app'
import { logger } from './libs'

const app = new Application()

try {
  app.initialize().then(() => {
    app.start()
  })
} catch (error) {
  logger.error(`❌ 애플리케이션 초기화 중 오류 발생: ${error.message}`)
}
