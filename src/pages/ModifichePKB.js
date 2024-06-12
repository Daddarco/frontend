import React from 'react'
import PatternList from '../View/PatternList';
import { getPatternsBuffer } from '../Model/Query';

export default function ModifichePKB() {
  return (
    <div>
      <PatternList filtri={null} query={getPatternsBuffer}/>
    </div>
  )
}