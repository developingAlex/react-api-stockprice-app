import React, { Component } from 'react';
import StockInfo from './components/StockInfo';
import { fetchQuoteForStock } from './api/iex';
import './App.css';


fetchQuoteForStock('nflx')
.then((res) => {//using .then because the request will take some time to fetch
    //from the api server
  return res.data
})

class App extends Component {
  state = {
    quote: null,
    error: null,
    enteredSymbol: 'AAPL'
  }

  // the first time our component is rendered
  // this method is called:
  componentDidMount(){
    this.loadQuote()
  }

  loadQuote = () => {
    const { enteredSymbol } = this.state
    fetchQuoteForStock(enteredSymbol)
    .then((quote) => {//using .then because the request will take some time to fetch
      //from the api server
      this.setState({quote: quote})
    })
    .catch((error) =>{
      let helpfulError = error
      if (helpfulError.response.data ==='Unknown symbol')
      {
        helpfulError.message=`The stock symbol '${enteredSymbol}' does not exist`
      }
      this.setState({error: helpfulError})      
    })
  }
  onChangeEnteredSymbol = (event) => {
    const input = event.target
    const value = input.value.trim().toUpperCase() //do not allow spaces and make all uppercase
    //now change state to reflect new value.
    // we don't need to do anything in this case that relies on the previous
    // state so we are just saying to set the value to the new value:
    this.setState({
      enteredSymbol: value
    })
  }

  render() {
    // const quote = this.state.quote
    const { quote, error, enteredSymbol } = this.state //'sugar' syntax for above.
    
    return (
      <div className="App">
          <h1 className="App-title">Wolf of React</h1>
          <input 
          value={ enteredSymbol } 
          placeholder='Add api symbol here eg nflx'
          onChange = { this.onChangeEnteredSymbol }
          />
          <button
          className = 'ml-1'
          onClick= {this.loadQuote}>
            Load Quote
          </button>
        {
          !!error && 
            <p> { error.message } </p>
          
        }
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
  }
}

export default App;
