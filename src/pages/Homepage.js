import React from 'react'
import { useQuery, gql } from '@apollo/client'
import PatternList from '../View/PatternList'

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

export default function Homepage() {
  const { loading, error, data } = useQuery(PATTERNS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  console.log(data)

  return (
    <PatternList data={data} />
  )
}