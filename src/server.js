import express from 'express'

import { handleServerListener, initializeEnv } from '@/configs'
import { CONFIGS } from '@/constants'

initializeEnv()

const app = express()

app.get('/', (request, response) => {
  response.send('Hello World!')
})

app.listen(CONFIGS.PORT, handleServerListener)
