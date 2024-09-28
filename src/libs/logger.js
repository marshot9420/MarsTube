import winston, { format, transports } from 'winston'
import 'winston-daily-rotate-file'
import * as path from 'path'
import * as fs from 'fs'

const logFormat = format.printf(
  ({ label, timestamp, level, message, context, stack, ms }) => {
    const wrappedContext = context ? ` [${context}]` : ''
    return `[${label}] [${level}] ${timestamp}${wrappedContext} (${ms}) ${
      stack ? stack : message
    }`
  },
)

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

const colorizer = format.colorize()

export const logger = winston.createLogger({
  format: format.combine(
    format.errors({ stack: true }),
    format.label({ label: 'Express.js - Winston' }),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.ms(),
    logFormat,
  ),

  transports: [
    new transports.Console({
      format: format.combine(
        format.label({ label: 'Express.js - Winston' }),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.ms(),
        format.errors({ stack: true }),
        format.printf(({ level, message, label, timestamp }) =>
          colorizer.colorize(
            level,
            `[${label}] [${level}] ${timestamp} ${message}`,
          ),
        ),
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
    logger.info(message.trim())
  },
}
