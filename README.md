# Alex Notes
## Todays lesson 20171130
making a react app that takes use of backend and frontend and uses a stock price api
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
1. 