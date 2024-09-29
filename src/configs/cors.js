import { CONFIGS } from '@/constants'
import { logger } from '@/libs'

export const corsConfig = () => {
  const corsOriginList = CONFIGS.DEV_MODE
    ? '*'
    : process.env.CORS_ORIGIN_LIST.split(',').map((origin) => origin.trim())

  logger.info(
    `✅ CORS 설정: ${CONFIGS.DEV_MODE ? '모든 출처 허용' : corsOriginList.join(', ')}`,
  )

  return {
    origin: corsOriginList,
    credentials: true,
  }
}
