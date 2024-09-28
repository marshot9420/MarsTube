import dotenv from 'dotenv'
import path from 'path'

import { CONFIGS } from '@/constants'

export const initializeEnv = () => {
  const envFilePath =
    process.env.NODE_ENV === CONFIGS.NODE_ENV.DEVELOPMENT
      ? path.resolve(process.cwd(), '.env.development')
      : path.resolve(process.cwd(), '.env.production')

  dotenv.config({ path: envFilePath })
  console.log(`✅ 환경 변수가 초기화되었습니다.`)
}

export const handleServerListener = () => {
  console.log(`✅ 서버 수신중: ${CONFIGS.HOST}:${CONFIGS.PORT} 🚀`)
}
