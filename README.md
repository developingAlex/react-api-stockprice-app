# How to run
This is a react app so to run it you may need to ensure you have the necessary software installed

`yarn` is what we use in development so if you install that then navigate to this projects folder on your computer in a terminal and execute:
```
yarn start
```
it will boot up a server by default at http:///localhost:3000 and open your default browser to that page.

There may be some other software that is required that I've missed but hopefully if you have yarn installed at least, attempting to run `yarn start` will hopefully provide some helpful output if there is anything else required.

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
1. an example of the data received for a stock: https://api.iextrading.com/1.0/stock/nflx/quote
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
                week52High={188.15}
                week52Low={188.15}
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
          week52High:188.15,  
          week52Low:188.15
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
      week52High={188.15}
      week52Low={188.15}
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
1. found the axios api, instructions are to use `npm install axios` but we are using yarn and the command is the same `yarn install axios` (when we run that in the terminal reminds us to use `yarn add` instead of `yarn install`)
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
        .then((res)=>{ 
          return res.data //this is like going down a level because what we get returned is one level above what we wanted, ie, this gives us the json data instead of an object comprising that data
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
1. At this point is where the follow along ends and we start working on the challenges, if you need to view my solutions to the challenges you can check out the various commits starting around commit &lsquo;[Add company logo display](https://github.com/developingAlex/react-api-stockprice-app/commit/d65f3e8ba51716a14b51e56e08e896d979e6b143)&rsquo;
### Set challenges to work through
1. Load and display logo for symbol using: https://iextrading.com/developer/docs/#logo
2. Add a history of previously loaded quotes
3. Add list of recent news using: https://iextrading.com/developer/docs/#news
4. Add 6 month table using: https://iextrading.com/developer/docs/#chart
5. Add 6 month chart using: https://iextrading.com/developer/docs/#chart

    Nice charting library in React: http://recharts.org/#/en-US/guide/getting-started

## Notes on struggles and tricky parts I encountered
#### or in other words: dumb stuff I did that I can look back on one day and laugh at!

### How to pass data through to a component.
I made a component to provide the code to display an image, using the url for the stock's company's logo. In the App.js file I was getting the logo's url as a returned json object {url: 'https://...'}
but when I was calling on the component to render, I was using this notation
```html
<StockLogo
  {...logo}
/>
```
And what that means is the logo objects key-value pairs are what get passed through as the components **props**, not the logo object itself.

In my StockLogo component's code I had this:
```javascript
  function StockLogo({
    logo
  }) {
    return (
      <div>
        <img 
        className='stock-logo' 
        src={logo.url} 
        alt='no logo found'
        aria-label='logo for the displayed company'
        /> 
      </div>
    )
  }
```
Which is going to be problematic because I've got **logo** there instead of **url**

As my code was at that point, the quickest solution to fix it would have been to just change the invocation of the StockLogo component to this code:
```html
<StockLogo
  logo={logo}
/>
```

Alternatively, if I wanted to keep the syntax of `{...logo}` then my StockLogo component code would need to change to be like this:
```javascript
  function StockLogo({
    url
  }) {
    return (
      <div>
        <img 
        className='stock-logo' 
        src={url} 
        alt='no logo found'
        aria-label='logo for the displayed company'
        /> 
      </div>
    )
  }
```
### How to determine whether a piece of html code renders or not
I found myself trying to remove the 'loading...' message once the browser had already received a valid response. The way the program logic was initially meant that if the response was the data for a particular stock then when that loaded the loading message would be removed. But when the response is an error that the searched stock could not be found then the 'loading...' message remained.

My issue was that a ternery operator had been employed to determine if the  'loading...' message would display or if the stock data would display based on the test of whether the stock data was null or not. 

I initially thought I could use an if statement or another ternary in that part somehow to additionally check that error was also null before displaying the message or not but found that that didn't work with the ternary syntax. 

In the end a different approach was employed similar to one used for [hiding elements](https://eddyerburgh.me/toggle-visibility-with-react) where you use an expression like what is used in an if statement: **this && that**, **that** only runs if **this** resolves to true.

shout-out to [Glenn](https://github.com/Gurenax) for thinking of that one!

The code now looks like this:

```javascript
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

) : ( //otherwise just display loading
    !error && <p>Loading...</p>
)
```
The reason this was so hard was that the ternary operator was going to execute one or the other of it's two possible outcomes, but in the event that an error is returned because the entered symbol wasn't found by the API then neither of the ternary's outcomes were appropriate.

**Update:** *I had thought that it was not allowed to nest ternary operators but later found that if you're careful with your parentheses you can actually do just that with no problem.*
### Tracking history challenge
This was not as straight forward as it initially seemed, there were two things that were tricky with this.
1. Adding results to the history list, and
1. displaying the history by iterating through.
Adding results was tricky because for a beginner it was easy to write it in such a way that it wouldn't work and it wasn't immediately obvious why.

And iterating through the results to display them would have likely taken me a long time to figure out if I hadn't seen a colleague solve it already.

#### Potential pitfalls in adding the results to the history list

the code below works:
```javascript
//example 1
const {history} = this.state
history.push(quote)
this.setState({quote: quote, error: null, history: history}) 
```
So does the below variation:
```javascript
//example 2
this.setState({quote: quote, error: null, history: [...history, quote]}) 
```
but the below **doesn't work**:
```javascript
//example 3
this.setState({quote: quote, error: null, history: history.push(quote)}) 
```
and neither does this:
```javascript
//example 4
const {history} = this.state
newHistory = history.push(quote)
this.setState({quote: quote, error: null, history: newHistory}) 
```
If I had tried to tackle this myself the first thing I would have tried would have been example 3. That would have failed because the setState method only expects to be given objects, not code to evaluate. One day I'm sure I will know why `history: [...history, quote]` is not also considered in the same vein.

The reason I included example 4 as something not to do is because it's something I might've done. I mistakenly believed the .push method on an array would have returned a new array but that's not its behaviour at all, it modifies the array and does something like returns the resulting length of the array. This gave me some headaches with errors such as '*variable* does not have a function .push'. It goes without saying that reading the documentation on the push method would have sufficed.

#### rendering the history list from your component
Below is the code that worked:
```javascript
return(
  <div>
    {
      history.map((e,i) => <li key={i}>{e.symbol}:{e.companyName}</li>)
    }
  </div>
)
```  
Again the reason I didn't *think* this would have worked is my flawed understanding of the map function. I thought that the map function would have modified the existing array, but inspecting the documentation reveals that it does return a new resulting array.

The other thing to note with return statements such as above is that the return statement **can only return one html element**, it's ok if that element contains many other elements but the following is not valid:
```javascript
return(
  <div>
    {
      history.map((e,i) => <li key={i}>{e.symbol}:{e.companyName}</li>)
    }
  </div>
  <div>
    this div is not valid
  </div>
)
```  
If that's what you had you would have to wrap it all in another element like so:
```javascript
return(
  <div>
    <div>
      {
        history.map((e,i) => <li key={i}>{e.symbol}:{e.companyName}</li>)
      }
    </div>
    <div>
      this div is not valid
    </div>
  </div>
)
```  
