import express from 'express'

import { URLS } from '@/constants'
import { homePageController } from '@/controllers'

const clientRouter = express.Router()

clientRouter.get(URLS.CLIENT.HOME, homePageController)

export { clientRouter }
