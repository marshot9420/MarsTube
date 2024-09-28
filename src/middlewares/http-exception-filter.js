import { HttpException, logger } from '@/libs'

export const httpExceptionFilter = (error, request, response, next) => {
  if (error instanceof HttpException) {
    logger.error(
      `❌ HTTP 예외 발생: ${error.name}: ${error.message} - ${request.method} ${request.originalUrl}`,
    )

    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
      statusCode: error.statusCode,
    })
  }

  logger.error(
    `❌ 서버 오류: ${error.message}: ${error.message} - ${request.method} ${request.originalUrl}`,
    error,
  )

  return response.status(500).json({
    status: 'error',
    message: '서버 내부 오류가 발생했습니다.',
    statusCode: 500,
  })
}
