const CircuitBreaker = require('opossum');
const { logs } = require('../../logger');
const {getXrplCredentials,getXrplClient} = require('../../utils/xrplUtils');
const { xrplFallBackMechanism } = require('./fallback');
const { xrplCBOptions } = require('./options');

const initXrplServiceCB = new CircuitBreaker(getXrplClient,xrplCBOptions)

initXrplServiceCB.fallback(async ()=>{
    try {
        const info = getXrplCredentials()
        await xrplFallBackMechanism(info)
    } catch (error) {
        logs('error','Failed to handle fallBack',`${error.stack}`)
        throw error
    }
})

module.exports=initXrplServiceCB
