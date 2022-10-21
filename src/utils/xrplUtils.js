const xrpl = require('xrpl')
const { XRPL_SERVER_URL, ISXRPL_SUPPORTED } = require('../config')

let XRPL_CLIENT = null
const { logs } = require('../logger')

const getXrplCredentials = () => ({ serverUrl: XRPL_SERVER_URL })
const getXrplClient = async () => {
  try {
    logs('info', '[getXrplClient]', 'checking for xrpl connection status')
    if (XRPL_CLIENT === null || !XRPL_CLIENT.isConnected()) {
      logs('error', '[getXrplClient]', 'Attempting reconnect xrpl')
      await initXrplService()
    }
  } catch (error) {
    logs('error', '[getXrplClient]', `${error.stack}`)
    throw new Error(error.message)
  }
  return XRPL_CLIENT
}

const disconnectXrpl = () => {
  try {
    XRPL_CLIENT != null
      ? XRPL_CLIENT.disconnect()
      : logs('info', '[disconnectXrpl]', 'XRPL is already disconnected now')
    XRPL_CLIENT = null
  } catch (error) {
    logs('error', '[disconnectXrpl]', `${error.stack || error}`)
  }
}

const initXrplService = async () => {
  const { serverUrl } = getXrplCredentials()
  try {
    if (ISXRPL_SUPPORTED) {
      XRPL_CLIENT = new xrpl.Client(serverUrl)
      await XRPL_CLIENT.connect()
      logs(
        'info',
        '[initXrplService]',
        `Connected to xrpl service ${serverUrl}`
      )
      return XRPL_CLIENT
    } else {
      logs('info', '[initXplService]', 'Xrpl is disable at env level')
    }
  } catch (error) {
    logs(
      'error',
      '[initXrplService]',
      `Trying to connect at url : ${serverUrl} Error: ${error.stack || error}`
    )
    throw error
  }
}

module.exports = {
  getXrplCredentials,
  getXrplClient,
  disconnectXrpl,
  initXrplService
}
