import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { Link } from 'react-router-dom'

const PATTERNS = gql`
  query getPatterns {
    patterns(pagination: {limit: -1}) {
      data {
        id
        attributes {
          titolo
        }
      }
    }
  }
`

export default function PatternList({filtri}) {
  const { loading, error, data } = useQuery(PATTERNS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      {/* Visualizza i valori dei filtri */}
      {filtri && filtri.map((filtro, index) => (
        <div key={index}>
          <h3>{filtro.label}</h3>
          <ul>
            {filtro.checkedItems.map((campo, index) => (
              <li key={index}>{campo}</li>
            ))}
          </ul>
        </div>
      ))}
      
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