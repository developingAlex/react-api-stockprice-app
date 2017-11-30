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
      week52High,
      week52Low
    }) {
      return (
        <div>
          <h2>{ symbol }: { companyName }</h2>
          <h3>{ latestPrice }({ latestSource })</h3> 
          <dl>
            <dt> Week 52 high </dt>
            <dd>{ week52High }</dd>

            <dt> Week 52 low </dt>
            <dd>{ week52Low }</dd>
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
        .then((res)=>{ //this is like going down a level because what we get returned is one level above what we wanted, ie, this gives us the json data instead of an object comprising that data
          return res.data
        })
    }
    ```
1. You can see now that the above two steps, taken together, reproduce the required api URL.    
1. you can bring that function into your App.js file with the following import line:
    ```javascript
    import { fetchQuoteForStock } from './api/iex';
    ```
1. The following code added to the App.js file just above the `class App ...` line can help us to test our function if you console log it:
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
1. Adding a function in App.js (just below where we define the state within the Class App block) for when the component is initially mounted:
    ```javascript
    // the first time our component is rendered
    // this method is called:
    componentDidMount(){
      fetchQuoteForStock('nflx')
        .then((quote) => {
          this.setState({quote: quote})
        })
        .catch((error) =>{
          console.error(error)
        })
    }
    ```
1. Now you can remove the function declared previously in App.js at step 18: 
    ```javascript
    fetchQuoteForStock('nflx')
    .then((res) => {//using .then because the request will take some time to fetch
        //from the api server
      return res.data
    })
    ```    
1. Add error handling to let the user know if something went wrong
1. edit our state to:
    ```javascript
    state = {
      quote: null,
      error: null
    }
    ```
1. amend componentDidMount to:
    ```javascript
    // the first time our component is rendered
    // this method is called:
    componentDidMount(){
      fetchQuoteForStock('nflx')
        .then((quote) => {
          this.setState({quote: quote})
        })
        .catch((error) =>{
          this.setState({error: error})
          console.error('Error loading quote', error)
        })
    }
    ```    
1. Amend your App.js code as follows:
    ```javascript
    const { quote, error } = this.state //'sugar' syntax for above.
    
    return (
      <div className="App">
          <h1 className="App-title">Wolf of React</h1>
        {
          !!error && 
            <p> { error.message } </p>
          
        }
        {
    ```    
1. Add an input box for user entered symbols:
    ```
    <div className="App">
        <h1 className="App-title">Wolf of React</h1>
        <input value={ enteredSymbol } placeholder='Add api symbol here eg nflx' />
    ```
1. Add a new variable to the state for the entered symbol:
    ```javascript
    state = {
      quote: null,
      error: null,
      enteredSymbol: 'Add api symbol here eg nflx'
    }
    ```
1. At this point your field will not be editable.
1. Add an event handler to handle when the field changes:
    ```javascript
    onChangeEnteredSymbol = (event) => {
      const input = event.target.value
      //now change state to reflect new value.
      // we don't need to do anything in this case that relies on the previous
      // state so we are just saying to set the value to the new value:
      this.setState({
        enteredSymbol: input
      })
    }
    ```
1. Bring it together with the input box by amending the input box html code as follows:
    ```javascript
    <input 
      value={ enteredSymbol } 
      placeholder='Add api symbol here eg nflx'
      onChange = { this.onChangeEnteredSymbol }
    />
    ```
1. We want to ensure they do not enter spaces so amend the event handler as follows:
    ```javascript
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
    ```
1. Add a button below our code for our input field:
    ```html
    <button>
      Load Quote
    </button>
    ```
    As well as some styling in index.css which now looks like this:
    ```css
    html{
      font-size: 30px;
    }
    body {
      margin: 0;
      padding: 0;
      font-family: sans-serif;
    }

    input{
      font-size: 1rem;
    }

    button {
      font-size: 1rem;
      color: white;
      background: #222; 
      border: none;
    }
    ```
1. now create the event handling ability for the button:
    ```html
    <button
      className = 'ml-1'
      onClick= {this.loadQuote}>
      Load Quote
    </button>
    ```
    added to index.css:
    ```css
    .ml-1{
      margin-left: 0.25rem;
    }
    ```
1. then create the event handler itself:
    ```javascript
    loadQuote = () => {
      const { enteredSymbol } = this.state
      fetchQuoteForStock(enteredSymbol)
      .then((quote) => {//using .then because the request will take some time to fetch
        //from the api server
        this.setState({quote: quote})
      })
      .catch((error) =>{
        this.setState({error: error})
        console.error(`The stock symbol '${enteredSymbol}' does not exist`, error)
      })
    }
    ```
1. Ensure that your default symbol in the field is set to a valid symbol, eg AAPL
    ```javascript
    state = {
      quote: null,
      error: null,
      enteredSymbol: 'AAPL'
    }
    ```
    and then we can now remove the repeated code in component mount function as it basically does the same thing as load quote, so it now looks like this:
    ```javascript
    // the first time our component is rendered
    // this method is called:
    componentDidMount(){
      this.loadQuote()
    }
    ```
