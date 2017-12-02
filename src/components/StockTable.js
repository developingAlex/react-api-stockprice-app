import React from 'react'

export function StockTable ({
  stockData //an array of objects consisting of data as bottom example comment shows
}){

  


  return(
    <div className='stockTable'>
      <table>
        <tbody>
          <tr>
            <th>Date</th>
            <th>Open</th>
            <th>High</th>
            <th>Low</th>
            <th>Close</th>
            <th>Volume</th>
            <th>Unadjusted Volume</th>
            <th>Change</th>
            <th>Change %</th>
            <th>VWAP (Volume Weighted Average Price)</th>
            <th>Change over Time</th>
          </tr>
          {
            stockData.map((dayOfData) => (
              <tr>
                <td>{dayOfData.date}</td>
                <td>{dayOfData.open}</td>
                <td>{dayOfData.high}</td>
                <td>{dayOfData.low}</td>
                <td>{dayOfData.close}</td>
                <td>{dayOfData.volume}</td>
                <td>{dayOfData.unadjustedVolume}</td>
                <td>{dayOfData.change}</td>
                <td>{dayOfData.changePercent}</td>
                <td>{dayOfData.vwap}</td>
                <td>{dayOfData.changeOverTime}</td>   
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

//example JSON response data
// date	"2017-06-01"
// open	153.17
// high	153.33
// low	152.22
// close	153.18
// volume	16404088
// unadjustedVolume	16404088
// change	0.42
// changePercent	0.275
// vwap	152.884
// label	"Jun 1, 17"
// changeOverTime	0