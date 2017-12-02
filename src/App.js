import React, { Component } from 'react';
import StockInfo from './components/StockInfo';
import StockLogo from './components/StockLogo';
import UserHistory from './components/UserHistory';
import { fetchQuoteForStock, fetchLogoForStock, fetchNewsForStock } from './api/iex';
import './App.css';
import { StockNews } from './components/StockNews';


fetchQuoteForStock('nflx')
.then((res) => {//using .then because the request will take some time to fetch
    //from the api server
  return res.data
})

class App extends Component {
  state = {
    quote: null, //the information returned by the api on a stocks price
    error: null, //the error, if any, in attempting to retrieve the quote
    logo: null, 
    logoerror: null, //the error, if any, in attempting to retrieve the logos url
    enteredSymbol: 'AAPL', //starting default stock
    history: [], //the users search history
    articles: null, // news articles returned by the api
    articlesError: null, // error, if any, returned by api for articles request
    historyPosition: 0 // set current position in history backtracking to coincide with history arrays one and only element.
  }

  // the first time our component is rendered
  // this method is called:
  componentDidMount(){
    this.loadQuote()
  }

  loadQuote = () => {
    //before attempting to load a new quote, reset state (except history) to null
    this.setState({
      error: null,
      quote: null,
      logo: null,
      logoerror: null,
      articles: null,
      articlesError: null
    }) 

    const { enteredSymbol, history } = this.state

    fetchLogoForStock(enteredSymbol)
      .then((logo) => {
        this.setState({logo: logo, logoerror: null})
      })
      .catch((error) => {
        this.setState({logoerror: error})
      })

    fetchNewsForStock(enteredSymbol, 6)
      .then((articles) => {
        this.setState({articles: articles})
      })
      .catch((error)=>{
        this.setState({articlesError: error})
      })

    fetchQuoteForStock(enteredSymbol)
    .then((quote) => {//using .then because the request will take some time to fetch
      //from the api server
      const {history} = this.state
      history.push(quote)
      const newHistoryPosition = history.length - 1
      this.setState({quote: quote, error: null, history: history, historyPosition: newHistoryPosition})
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
  onKeyUpEnteredSymbol = (keyboardEvent) => {
    //on keyup here indicates user pushed a keyboard key down, then released it and the key went back UP
    //it is triggered by ANY keyboard key, not just the up arrow...(though that is one of the two keys that in this case matters!)
    const {historyPosition, history} = this.state
    if (keyboardEvent.key === 'Enter'){
      this.loadQuote()
    }
    else if (keyboardEvent.key === 'ArrowUp'){
      //attempt to decrement the historyPosition variable by one unless it is currently zero.
      let currentPositionInHistory = 0
      if (historyPosition > 0){
        currentPositionInHistory = historyPosition - 1
      }

      //set the input elements content to match whatever the symbol was for history[currentPositionInHistory]
      const pastInput = history[currentPositionInHistory].symbol
      //set the state to set historyPosition to its new value, so a subsequent up arrow key press will cycle to the previous input once more. and also set the entered symbol in the input field to match the appropriate historical input.
      this.setState({enteredSymbol: pastInput, historyPosition: currentPositionInHistory})

    }
    else if(keyboardEvent.key === 'ArrowDown'){
      const {historyPosition, history} = this.state
      let currentPositionInHistory = history.length - 1
      if (historyPosition < currentPositionInHistory){
        currentPositionInHistory = historyPosition + 1
      }
      const pastInput = history[currentPositionInHistory].symbol
      this.setState({enteredSymbol: pastInput, historyPosition: currentPositionInHistory})
    }
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
    const { quote, error, logo, enteredSymbol, history, articles, articlesError } = this.state //'sugar' syntax for above.
    return (
      <div className="App">
          <h1 className="App-title">Wolf of React</h1>
          <input 
          value={ enteredSymbol } 
          placeholder='Add api symbol here eg NFLX'
          onChange = { this.onChangeEnteredSymbol }
          onKeyUp = { this.onKeyUpEnteredSymbol }
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
          (!!quote) ? ( ///if the quote is there then load it
            <div>
              <StockInfo 
                {...quote} //means my key value pairs become the props.
              />
              <StockLogo
                
                logo={logo} //passing through the actual object
                // {...logo} //passing through the objects keyvalue pairs as the props
              />
            </div>

          ) : ( //otherwise just display loading but not if the response has returned and it was an error.
            !error && <p>Loading...</p>
          )
        }
        <UserHistory
          history={history}
        />
        <br/><br/>
        {
          !!articles ? (

            <StockNews
            articles={articles}
            />
          ) : (
            !!articlesError ? (
              `There was an issue fetching the news articles for this stock: ${articlesError.message}`
            ) : 'Loading articles...'
          )
        }
      </div>
    );
  }
}

export default App;
