import { logger } from '@/libs'

export const successInterceptor = (request, response, next) => {
  const originalSend = response.send
  const originalJson = response.json

  response.send = (data) => {
    const contentType = response.get('Content-Type')

    if (
      !contentType ||
      contentType.includes('text/html') ||
      contentType.includes('text/plain')
    ) {
      originalSend.call(response, data)
      return
    }

    try {
      const parsedData = typeof data === 'string' ? JSON.parse(data) : data
      const formattedResponse = parsedData?.status
        ? parsedData
        : { status: 'success', data: parsedData }
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
    const formattedResponse = data?.status ? data : { status: 'success', data }
    logger.info(
      `✅ ${request.method} ${request.originalUrl} - 응답 데이터: ${JSON.stringify(formattedResponse)}`,
    )
    originalJson.call(response, formattedResponse)
  }

  next()
}
