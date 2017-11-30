import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.iextrading.com/1.0'
})

export function fetchQuoteForStock(symbol) { //the fetch instead of get because 
  // get implies immediate return, fetch will take some time to complete..

  return api.get(`/stock/${symbol}/quote`)
    .then((res)=>{ //this is like going down a level because what we get returned is one level above what we wanted, ie, this gives us the json data instead of an object comprising that data
      return res.data
    })
}

export function fetchLogoForStock(symbol){
  return api.get(`stock/${symbol}/logo`)
    .then((res) => {
      console.log(res.data.url)
      return res.data
    })
}