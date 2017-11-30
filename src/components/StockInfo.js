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