import express from 'express'

import { URLS } from '@/constants'
import {
  getRootMessage,
  getErrorMessage,
  getUnexpectedError,
} from '@/controllers'

const appRouter = express.Router()

appRouter.get(URLS.API.ROOT, getRootMessage)
appRouter.get(URLS.API.ERROR, getErrorMessage)
appRouter.get(URLS.API.UNEXPECTED_ERROR, getUnexpectedError)

export { appRouter }
