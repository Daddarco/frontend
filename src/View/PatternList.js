import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { getPatterns } from '../Model/Query';

const filterPatterns = (patterns, filtri) => {
  if (!filtri || filtri.length === 0) {
    return patterns;
  }

  return patterns.filter(pattern => {
    return filtri.every(filtro => {
      const attributeName = filtro.label.toLowerCase().replace(/\s/g, '_') + 's';
      let patternField = pattern.attributes[attributeName];

      // Controllo per i casi speciali come 'CWE'
      if (filtro.label === 'CWE') {
        patternField = pattern.attributes.cwe_associata_a_categoria_owasps;
      }
      
      if (!patternField || !patternField.data) return false;

      const patternFieldValues = patternField.data.map(item => item.attributes.nome);
      return filtro.checkedItems.every(item => patternFieldValues.includes(item));
    });
  });
};

export default function PatternList({ filtri, query }) {
  const { loading, error, data } = useQuery(query);
  
  //console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const filteredPatterns = filterPatterns(
    query === getPatterns ?
    data.patterns.data :
    data.patternBuffers.data,
    filtri);

  if (query !== getPatterns) {
    return (
      <div className='pattern-list'>
        {filteredPatterns.map(item => {
          const pattern = item.attributes;

          return (
            <div key={item.id} className="pattern-card">
              <div className='pattern-id'>Pattern id: {item.id}</div>
                <Link to={`/amministratore/modifiche-pkb/dettagli/${item.id}`}><h2>{pattern.titolo}</h2></Link>
              <br></br>
            </div>
          );
        })}
      </div>
    )
  }

  return (
    <div className='pattern-list'>
      {filteredPatterns.length === 0 ? (
        <p>Nessun pattern corrisponde ai filtri selezionati</p>
      ) : (
        filteredPatterns.map(item => {
          const pattern = item.attributes;

          return (
            <div key={item.id} className="pattern-card">
              <div className='pattern-id'>Pattern id: {item.id}</div>
                <Link to={`/dettagli/${item.id}`}><h2>{pattern.titolo}</h2></Link>
              <br></br>
            </div>
          );
        })
      )}
    </div>
  );
}
