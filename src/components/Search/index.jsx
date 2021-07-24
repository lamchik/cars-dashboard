import React, {useState} from 'react'
import "./styles.css"

const Search = ({onSubmit}) => {
  const [query, setQuery] = useState("")

  const submitHandler = (e) => {
    e.preventDefault()
    onSubmit(query)
  }

  const onInputChangeHandler = (e) => {
    setQuery(e.target.value)
  }

  return (
    <div>
      <form onSubmit={submitHandler} className="search-form">
        <input onChange={onInputChangeHandler} placeholder="Поиск" className="search-form__input" type="text" />
        <button className="search-form__button" type="submit">Найти</button>
      </form>
    </div>
  )
}

export default Search;