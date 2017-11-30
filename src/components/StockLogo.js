import React from 'react'

function StockLogo({
  logo
}) {
  //check that the logo is not null. as this code may be invoked in situations where logo hasn't yet loaded and so is still null.
  const logourl = !!logo ? logo.url : ''

  console.log('this is what the stocklogo component got to work with')
  console.log(logo)
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