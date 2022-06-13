import React from 'react'

function AddIncExp() {
  return (
    <div>
      <label htmlFor="item" /><input type="text" name="item" id="item" placeholder='item'/>
      <label htmlFor="category" /><input type="text" name="category" id="category" placeholder='category'/>
      <label htmlFor="amount" /><input type="text" name="amount" id="amount" placeholder='amount'/>
    </div>
  )
}

export default AddIncExp