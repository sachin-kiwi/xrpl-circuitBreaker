function xrplFallBackMechanism(params) {
  /*
    we will simply throw error that connection is not stable for now
  */
  const {serverUrl,dated=''} = params
  return new Promise((resolve, reject) => {
    reject(`Currently,Xrpl connection is not stable : server: ${serverUrl} and so disabling connection`)
  });
}

module.exports = {
  xrplFallBackMechanism
}
