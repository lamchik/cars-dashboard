import React from 'react'
import './styles.css'

const Error = ({error}) => {
  return (
    <p className="error">{error.toString()}</p>
  )
}

export default Error;