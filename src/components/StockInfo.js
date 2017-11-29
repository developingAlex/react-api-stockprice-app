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