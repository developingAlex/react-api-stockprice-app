import React from 'react'

function StockLogo({
  logo
}) {
  //check that the logo is not null. as this code may be invoked in situations where logo hasn't yet loaded and so is still null.
  const logourl = !!logo ? logo.url : ''

  return (
    <div>
       <img 
       className='stock-logo' 
       src={logourl} 
       alt='no logo found'
       aria-label='logo for the displayed company'
       /> 
    </div>
  )
}

export default StockLogo