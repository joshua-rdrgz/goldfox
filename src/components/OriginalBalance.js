import React from 'react'

function OriginalBalance() {
  return (
    <section>
      <label htmlFor="original-balance">
        <h2>Original Balance</h2>
      </label>
      <input type="text" name="original-balance" id="original-balance" placeholder='$1,234'/>
      <span>Beginning Amount: $1,234</span>
    </section>
  )
}

export default OriginalBalance