import axios from 'axios'

import { JUPITER_URL, JUPITER_FEE_CALCULATE_URL } from 'config'

const apiAxios = axios.create({
  baseURL: JUPITER_URL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})

apiAxios.interceptors.response.use((response) => {
  return response.data;
});

const getAccountByPassphrase = async (passphrase) => {
  return await apiAxios.get(`/nxt?requestType=getAccountId&secretPhrase=${passphrase}`)
}

const getAccountByAccountID = async (account) => {
  return await apiAxios.get(`/nxt?requestType=getAccount&account=${account}`)
}

const setAccountInfo = async (params) => {
  const defaultURL = `/nxt?requestType=setAccountInfo&name=${params.name}&description=${params.description}&secretPhrase=${params.secretPhrase}&publicKey=${params.publicKey}&deadline=24`;

  const feeNQTURL = `${defaultURL}${JUPITER_FEE_CALCULATE_URL}`;
  const response = await apiAxios.post(feeNQTURL)

  const { transactionJSON: { feeNQT = 0 } = {} } = response;
  const url = `${defaultURL}&feeNQT=${feeNQT}`;
  return await apiAxios.post(url)
}

const getDGSGoods = async (params) => {
  return await apiAxios.get(`/nxt?requestType=getDGSGoods&firstIndex=${params.first}&lastIndex=${params.last}`)
}

const createNFTToken = async (params) => {
  const defaultURL = `/nxt?requestType=dgsListing&name=${params.name}&description=${params.description}&tags=${params.tags}&quantity=${params.quantity}&priceNQT=${params.price}&secretPhrase=${params.secretPhrase}&publicKey=${params.publicKey}&deadline=24`;

  const feeNQTURL = `${defaultURL}${JUPITER_FEE_CALCULATE_URL}`;
  const response = await apiAxios.post(feeNQTURL)

  const { transactionJSON: { feeNQT = 0 } = {} } = response;
  const url = `${defaultURL}&feeNQT=${feeNQT}`;
  return await apiAxios.post(url)
}

export {
  getAccountByPassphrase,
  getAccountByAccountID,
  setAccountInfo,
  getDGSGoods,
  createNFTToken
};