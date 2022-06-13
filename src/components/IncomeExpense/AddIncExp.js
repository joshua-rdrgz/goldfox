import React from 'react'

function AddIncExp(props) {
  return (
    <div className={`${props.type}__add`}>
      <div className={`${props.type}__add-item`}>
        <label htmlFor="item" />
        <input type="text" name="item" id="item" placeholder='item'/>
      </div>
      <div className={`${props.type}__add-category`}>
        <label htmlFor="category" />
        <input type="text" name="category" id="category" placeholder='category'/>
      </div>
      <div className={`${props.type}__add-amount`}>
        <label htmlFor="amount" />
        <input type="number" name="amount" id="amount" placeholder='amount'/>
      </div>
    </div>
  )
}

export default AddIncExp