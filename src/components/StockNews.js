import React from 'react'

export function StockNews({
  articles
}) {
  console.log(articles)
  return(
    <div>
      {
        articles.map((article) => (
          <div className='bs1 pl1 bordershadow marginbottom'>

            <div className='articletimestamp'>
              ({article.datetime})
            </div>

            <h3> <a href={article.url}>{article.headline} </a></h3>

            <details>
              <summary className='articleheadline'>
                preview
              </summary>
                {article.summary}
            </details>

          </div>
        ))
      }
    </div>
  )
}

// below is an example of what you get, an array of these

// datetime: "2017-11-29T21:36:38-05:00"
// headline: "Price-Earnings Ratio Expansion Explained - And Why You Should Care"
// related: "AAPL,DIV31061119,IND310,IND31061,MMM,NASDAQ01"
// source: "SeekingAlpha"
// summary: "    The market is more expensive today than it was a year ago.    We all hear that, but do we really know what they are talking about? When we read about the average market price-earnings ratio (PE ratio) going up, what does that really mean? You pay more than you used to. This phenomenon is call…"
// url: "https://api.iextrading.com/1.0/stock/aapl/article/5800616347191357"