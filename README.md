# Alex Notes
## Todays lesson 20171130
making a react app that takes use of backend and frontend and uses a stock price api

This will link our knowledge with React front end so far with NodeJS backend from the previous week.

## Steps taken
1. create a new react app
    ```
    yarn create react-app wolfofreact
    ```
1. replace most content in the app.js render and leave a single h1
1. using from this api: https://api.iextrading.com/1.0/stock/aapl/quote
1. create a components folder and create a component file StockInfo.js
    ```javascript
    import React from 'react'

    function StockInfo({
      symbol,
      companyName,
      primaryExchange,
      latestPrice,
      latestSource,
      week52high,
      week52low
    }) {
      return (
        <div>
          <h2>{ symbol }: { companyName }</h2>
          <h3>{ latestPrice }({ latestSource })</h3> 
          <dl>
            <dt> Week 52 high </dt>
            <dd>{ week52high }</dd>

            <dt> Week 52 low </dt>
            <dd>{ week52low }</dd>
          </dl>
        </div>
      )
    }

    export default StockInfo
    ```
1. initially just to get it to render on the page, just hard code some data for the component usage in App.js
    ```javascript
    import React, { Component } from 'react';
    import StockInfo from './components/StockInfo';
    import './App.css';

    class App extends Component {
      render() {
        return (
          <div className="App">
            
              <h1 className="App-title">Wolf of React</h1>
              <StockInfo 
                symbol='NFLX'
                companyName='Netflix inc'
                primaryExchange='Nasdaq Global Select'
                latestPrice={188.15}
                latestSource='Close'
                week52high={188.15}
                week52low={188.15}
              />
          </div>
        );
      }
    }

    export default App;

    ```
1. above `render (){` in App.js added the following code to represent state:
    ```javascript
    state = {
        quote: {
          symbol: 'NFLX',
          companyName:'Netflix inc',
          primaryExchange:'Nasdaq Global Select',
          latestPrice:188.15,
          latestSource:'Close',
          week52high:188.15,  
          week52low:188.15
        }
      }
    ```  
1. In App/js add in the line ` const { quote } = this.state` within the render() block    
1. replace the App.js render hard coded data to take advantage of our state:
    ```javascript
    <StockInfo 
      symbol='NFLX'
      companyName='Netflix inc'
      primaryExchange='Nasdaq Global Select'
      latestPrice={188.15}
      latestSource='Close'
      week52high={188.15}
      week52low={188.15}
    />
    ```
    becomes
    ```javascript
    <StockInfo 
      {...quote}
    />
    ```
1. Now we need some way to get the data from the API we chose
1. https://github.com/axios/axios we'll be using this for handling the http GET requests (making use of the API)
1. found the axios api, instructions are to use `npm install axios` but we are using yarn and the command is the same `yarn install axios` (when we run that the terminal reminds us to use `yarn add` instead of `yarn install`)
1. make a folder in src called **api**
1. make an **iex.js** file in the **api** folder
1. with the following code:
    ```javascript
    import axios from 'axios'

    const api = axios.create({
      baseURL: 'https://api.iextrading.com/1.0'
    })
    ```
    which is the url before the /stock part 
1. Add the following function in iex.js file to handle the rest of the url:
    ```javascript
    export function fetchQuoteForStock(symbol) { //the fetch instead of get because 
      // get implies immediate return, fetch will take some time to complete..

      return api.get(`/stock/${symbol}/quote`)
    }
    ```
1. You can see now that the above two steps, taken together, reproduce the required api URL.    
1. you can bring that function into your App.js file with the following import line:
    ```javascript
    import { fetchQuoteForStock } from './api/iex';
    ```
1. Add the following code to the App.js file just above the `class App ...` line:
    ```javascript
    fetchQuoteForStock('nflx')
      .then((res) => {//using .then because the request will take some time to fetch
          //from the api server
        return res.data
      })
    ```
1. remove our hardcoded values in the state part of App.js:
    ```javascript
    state = {
      quote: null
    }
    ```        
1. change the App.js return statement to handle when quote is null
    ```javascript
    return (
          <div className="App">
              <h1 className="App-title">Wolf of React</h1>
            {
              !!quote ? ( ///if the quote is there then load it
                <StockInfo 
                  {...quote}
                />

              ) : ( //otherwise just display loading
                <p>Loading...</p>
              )
            }
          </div>
        );
    ``` 
1. you should now have a loading screen that never changes. Now we move onto making the loading actually load the data and display it.
1. Adding a function for when the component is initially mounted:
    ```javascript
    // the first time our component is rendered
    // this method is called:
    componentDidMount(){
      fetchQuoteForStock('nflx')
        .then((quote) => {
          this.setState({quote: quote})
        })
    }
    ```
1.     