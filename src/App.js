import React, { Component } from 'react';
import StockInfo from './components/StockInfo';
import './App.css';


fetchQuoteForStock('nflx')
  .then((res) => {

  })

class App extends Component {
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

  render() {
    // const quote = this.state.quote
    const { quote } = this.state //'sugar' syntax for above.
    return (
      <div className="App">
        
          <h1 className="App-title">Wolf of React</h1>
          <StockInfo 
            {...quote}
          />
      </div>
    );
  }
}

export default App;
