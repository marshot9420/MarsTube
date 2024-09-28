import { logger } from '@/libs'

export const successInterceptor = (request, response, next) => {
  const originalSend = response.send
  const originalJson = response.json

  response.send = (data) => {
    try {
      const parsedData = typeof data === 'string' ? JSON.parse(data) : data

      const formattedResponse = {
        status: 'success',
        data: parsedData,
      }

      logger.info(
        `✅ ${request.method} ${request.originalUrl} - 응답 데이터: ${JSON.stringify(formattedResponse)}`,
      )
      originalSend.call(response, JSON.stringify(formattedResponse))
    } catch (error) {
      logger.error(`❌ JSON 파싱 오류: ${error.message}`)
      originalSend.call(response, data)
    }
  }

  response.json = (data) => {
    const formattedResponse = {
      status: 'success',
      data,
    }
    logger.info(
      `✅ ${request.method} ${request.originalUrl} - 응답 데이터: ${JSON.stringify(formattedResponse)}`,
    )
    originalJson.call(response, formattedResponse)
  }

  next()
}
