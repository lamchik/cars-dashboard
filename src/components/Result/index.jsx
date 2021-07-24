import React from 'react'
import "./styles.css"
import '../../fonts/IBM_Plex_Mono/IbmPlexMono.css'

const Result = ({text}) => {
  return (
    <div className="result">{text}</div>
  )
}

export default Result;