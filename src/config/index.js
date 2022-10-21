const dotEnv = require('dotenv')
const os = require('os')

dotEnv.config()
const { env } = process
const isProd = !['dev', 'qa', 'stage'].includes(process.env.EXEC_ENV)
const hostName = os.hostname()
const IS_TESTNET = env.IS_TESTNET === 'true'
const IS_TESTING = env.IS_TESTING === 'true'

module.exports = {
  EXEC_ENV: env.EXEC_ENV,
  PORT: 5005,
  IS_TESTNET,
  IS_TESTING,
  PINO_LOG_LEVEL: env.PINO_LOG_LEVEL,
  IS_DEBUG: env.IS_DEBUG === 'true',
  XRPL_SERVER_URL: isProd ? env.XRPL_MAINNET : env.XRPL_NFT_DEVNET,
  SERVICE_NAME: env.APP_NAME || 'Demo App',
  HOSTNAME: hostName,
  ISXRPL_SUPPORTED: env.ISXRPL_SUPPORTED === 'true',
  DB_URL: IS_TESTING ? env.TEST_MONGODB_URI : env.MONGODB_URI,
  TEST_DB_URL: env.TEST_MONGODB_URI
}
