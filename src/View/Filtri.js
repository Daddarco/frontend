import React, { useState, useEffect } from 'react';
import Accordion from '../components/Accordion';
import useFetch from '../hooks/useFetch';

export default function Filtri() {
  const { data, error, loading } = useFetch('http://localhost:1337/api/patterns?populate=*');
  /*
  const [uniqueFields, setUniqueFields] = useState({});

  //console.log(data);

  useEffect(() => {
    if (data) {
      const uniqueFieldsMap = new Map();

      // per ogni pattern
      data.forEach(item => {
        // per ogni sezione del pattern
        Object.keys(item.attributes).forEach(field => {
          // se nella mappa non c'è già la sezione, la aggiunge
          if (!uniqueFieldsMap.has(field)) {
            uniqueFieldsMap.set(field, new Set());
          }

          const fieldValue = item.attributes[field];
          //console.log(fieldValue.data);

          // se la sezione è un oggetto e la sezione non è nulla
          if (typeof fieldValue === 'object' && fieldValue !== null) {
            // per ogni sottosezione della sezione
            Object.keys(fieldValue.data).forEach(subField => {
              //console.log(subField.attributes[0]);
              uniqueFieldsMap.get(field).add(subField.attributes.nome);
            });
          } else {
            uniqueFieldsMap.get(field).add(fieldValue);
          }
        });
      });

      const uniqueFieldsObj = {};
      uniqueFieldsMap.forEach((value, key) => {
        uniqueFieldsObj[key] = Array.from(value);
      });

      setUniqueFields(uniqueFieldsObj);
    }
  }, [data]);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  console.log(uniqueFields);
  
  return (
    <div>
    <h1>Filtra i pattern per le tue esigenze</h1>
    {Object.keys(uniqueFields).map(field => (
      <Accordion key={field} title={field}>
      <ul>
      {uniqueFields[field].map((value, index) => (
        <li key={index}>{value}</li>
      ))}
      </ul>
      </Accordion>
    ))}
    </div>
  );
  */
  
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

  console.log(uniqueFields);

  return (
    <div>
      Filtra i pattern per le tue esigenze
    </div>
  );
}