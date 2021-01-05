const fetch = require('node-fetch');

const appUrl = "https://www.validators.app/api/v1/validators/";
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Token: process.env.VALIDATORS_APP_TOKEN
}

const getValidators = (cluster) => {
  return fetch(appUrl + `${cluster}.json`, {
    method: 'GET',
    headers
  }).then(response => response.json())
  .then(data => {
    if(!data || !Array.isArray(data)) {
      return [];
    }
    return data.map(v => {
      return v.keybase_id
    }).filter(a => !!a);
  })
}

const getKeybaseList = () => {
  const promises = [
    getValidators('testnet'),
    getValidators('mainnet'),
  ]
  return Promise.all(promises).then(data => {
    // get a list of unique keybase ids
    const ids = new Set([
      ...data[0],
      ...data[1],
    ]);

    return Array.from(ids)    
  })
}

module.exports = {
  getKeybaseList
}