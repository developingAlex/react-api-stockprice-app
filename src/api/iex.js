import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.iextrading.com/1.0'
})

export function fetchQuoteForStock(symbol) { //the fetch instead of get because 
  // get implies immediate return, fetch will take some time to complete..

  return api.get(`/stock/${symbol}/quote`)
}