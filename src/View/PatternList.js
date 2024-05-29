import React from 'react'
import { Link } from 'react-router-dom'

export default function PatternList({data}) {
  return (
    <div>
      {data.patterns.data.map(item => {
        const pattern = item.attributes;

        return (
          <div key={item.id} className="pattern-card">
            <div className='pattern-id'>Pattern id: {item.id}</div>
            <Link to={`/dettagli/${item.id}`}><h2>{pattern.titolo}</h2></Link>
            <br></br>
          </div>
        );
      })}
    </div>
  )
}