import React from 'react'

export default function QuizGeneratorForm({categories,handleSubmit,amountEl,categoryEl}) {

  return (
      <form
          className="header"
          onSubmit={handleSubmit}
      >
          <div className="form-group">
              <label htmlFor="category">Category</label>
              <select id="category" ref={categoryEl} >
                  {/*Rendering Category List from Category Array */}
                  {
                      categories.map(category => {
                          return <option value={category.id} key={category.id} > {category.name} </option>
                      })
                  }
              </select>
          </div>
          <div className="form-group">
              <label htmlFor="amount"> No. of Question </label>
              <input type="number" id='amount' min='1' step='1' defaultValue={10} ref={amountEl} />
          </div>
          <div className="form-group">
              <button className="btn">Generate</button>
          </div>
      </form>
  )
}

