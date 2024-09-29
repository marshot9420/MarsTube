import * as fs from 'fs'
import * as path from 'path'

import winston, { format, transports } from 'winston'
import 'winston-daily-rotate-file'

winston.addColors({
  info: 'cyan',
  warn: 'yellow',
  error: 'red',
  debug: 'magenta',
  http: 'blue',
})

const logFileOptions = {
  dataPattern: 'YYYY-MM-DD',
  maxFiles: 30,
  json: false,
  zippedArchive: true,
}

const logFileDirectory = path.resolve(__dirname, '../../logs')
if (!fs.existsSync(logFileDirectory)) {
  fs.mkdirSync(logFileDirectory)
}

const INFO = 'info'
const WARN = 'warn'
const ERROR = 'error'

const consoleFormat = format.combine(
  format.colorize({ all: true }),
  format.errors({ stack: true }),
  format.label({ label: 'Express.js - Winston' }),
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.ms(),
  format.printf(({ label, timestamp, level, message, context, stack, ms }) => {
    const wrappedContext = context ? ` [${context}]` : ''
    return `[${label}] [${level}] ${timestamp}${wrappedContext} (${ms}) ${stack || message}`
  }),
)

const fileFormat = format.combine(
  format.label({ label: 'Express.js - Winston' }),
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.ms(),
  format.errors({ stack: true }),
  format.json(),
)

export const logger = winston.createLogger({
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
  },
  level: 'info',
  format: format.errors({ stack: true }),
  transports: [
    new transports.Console({
      level: 'http',
      format: consoleFormat,
    }),
    new transports.DailyRotateFile({
      ...logFileOptions,
      level: INFO,
      dirname: `${logFileDirectory}/${INFO}`,
      filename: '%DATE%.log',
      format: fileFormat,
    }),
    new transports.DailyRotateFile({
      ...logFileOptions,
      level: WARN,
      dirname: `${logFileDirectory}/${WARN}`,
      filename: `%DATE%.${WARN}.log`,
      format: fileFormat,
    }),
    new transports.DailyRotateFile({
      ...logFileOptions,
      level: ERROR,
      dirname: `${logFileDirectory}/${ERROR}`,
      filename: `%DATE%.${ERROR}.log`,
      format: fileFormat,
      handleExceptions: true,
    }),
  ],
})

export const morganStream = {
  write: (message) => {
    logger.http(message.trim())
  },
}
