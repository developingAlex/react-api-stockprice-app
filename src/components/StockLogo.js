import React from 'react'

function StockLogo({
  logo
}) {
  // const logourl = logo.url
  console.log('this is what the stocklogo component got to work with')
  console.log(logo)
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

export default StockLogo