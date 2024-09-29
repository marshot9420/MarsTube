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

const logFormat = format.printf(
  ({ label, timestamp, level, message, context, stack, ms }) => {
    const wrappedContext = context ? ` [${context}]` : ''
    return `[${label}] [${level}] ${timestamp}${wrappedContext} (${ms}) ${stack ? stack : message}`
  },
)

export const logger = winston.createLogger({
  format: format.combine(
    format.colorize({ all: true }),
    format.errors({ stack: true }),
    format.label({ label: 'Express.js - Winston' }),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.ms(),
    logFormat,
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize({ all: true }),
        format.label({ label: 'Express.js - Winston' }),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.ms(),
        format.errors({ stack: true }),
        logFormat,
      ),
    }),
    new transports.DailyRotateFile({
      ...logFileOptions,
      level: INFO,
      dirname: `${logFileDirectory}/${INFO}`,
      filename: '%DATE%.log',
    }),
    new transports.DailyRotateFile({
      ...logFileOptions,
      level: WARN,
      dirname: `${logFileDirectory}/${WARN}`,
      filename: `%DATE%.${WARN}.log`,
    }),
    new transports.DailyRotateFile({
      ...logFileOptions,
      level: ERROR,
      dirname: `${logFileDirectory}/${ERROR}`,
      filename: `%DATE%.${ERROR}.log`,
      handleExceptions: true,
    }),
  ],
})

export const morganStream = {
  write: (message) => {
    logger.http(message.trim())
  },
}
