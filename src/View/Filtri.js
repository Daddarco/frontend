import React, { useState, useEffect } from 'react';
import Accordion from '../components/Accordion';
import useFetch from '../hooks/useFetch';

export default function Filtri() {
  const { data, error, loading } = useFetch('http://localhost:1337/api/patterns?populate=*');

  //console.log(data);
  
  const [uniqueFields, setUniqueFields] = useState({});

  useEffect(() => {
    if (data) {
      const fields = {};

      // per ogni pattern
      data.forEach(item => {
        // per ogni campo del pattern
        Object.entries(item.attributes).forEach(([field, value]) => {
          // se il campo ha dati nidificati
          if (value && value.data) {
            // esplora i dati nidificati
            value.data.forEach(nestedItem => {
              // per ogni sottocampo
              Object.entries(nestedItem.attributes).forEach(([subField, subValue]) => {
                // aggiungi solo il valore del sottocampo 'nome'
                if (subField === 'nome') {
                  if (!fields[field]) {
                    fields[field] = new Set();
                  }
                  fields[field].add(subValue);
                }
              });
            });
          } // se non ha campi annidati, inizializza il campo come Set
          //else { fields[field] = new Set(); }
        });
      });

      // Converte gli Set in array e li ordina
      const uniqueFieldsObject = Object.entries(fields).reduce((acc, [field, subValues]) => {
        acc[field] = Array.from(subValues).sort();
        return acc;
      }, {});

      setUniqueFields(uniqueFieldsObject);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  //console.log(uniqueFields);

  return (
    <div>
      Filtra i pattern per le tue esigenze
      <Accordion items={uniqueFields} keepOthersOpen={true} />
    </div>
  );
}