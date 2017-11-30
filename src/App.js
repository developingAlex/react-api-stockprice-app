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
    enteredSymbol: 'Add api symbol here eg nflx'
  }

    // the first time our component is rendered
    // this method is called:
    componentDidMount(){
      fetchQuoteForStock('nflx')
        .then((quote) => {//using .then because the request will take some time to fetch
          //from the api server
          this.setState({quote: quote})
        })
        .catch((error) =>{
          this.setState({error: error})
          console.error('Error loading quote', error)
        })
    }

  onChangeEnteredSymbol = (event) => {
    const input = event.target.value
  }

  render() {
    // const quote = this.state.quote
    const { quote, error, enteredSymbol } = this.state //'sugar' syntax for above.
    
    return (
      <div className="App">
          <h1 className="App-title">Wolf of React</h1>
          <input value={ enteredSymbol } placeholder='Add api symbol here eg nflx' />
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
