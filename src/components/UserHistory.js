import React from 'react'

function UserHistory({
  history //array of quotes
}) {
  return(
    <div>
      {
        history.map((e,i) => <li key={i}>{e.symbol}:{e.companyName}</li>)
      }
    </div>
  )
}

export default UserHistory