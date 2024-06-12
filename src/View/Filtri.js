import React, { useState, useEffect } from 'react';
import Accordion from '../components/Accordion';
import useFetch from '../hooks/useFetch';

export default function Filtri() {
  const { data, loading, error } = useFetch('http://localhost:1337/api/patterns?populate=*');
  const [uniqueFields, setUniqueFields] = useState([]);

  console.log(data);

  useEffect(() => {
    if (data) {
      const fields = {};

      data.forEach(item => {
        Object.entries(item.attributes).forEach(([field, value]) => {
          // Skip the 'user' and 'pattern-buffers' field
          if (field === 'user' || field === 'pattern-buffers') {
            return;
          }

          if (value?.data) {
            const dataArray = Array.isArray(value.data) ? value.data : [value.data];
            dataArray.forEach(nestedItem => {
              Object.entries(nestedItem.attributes).forEach(([subField, subValue]) => {
                if (subField === 'nome') {
                  if (!fields[field]) {
                    fields[field] = new Set();
                  }
                  fields[field].add(subValue);
                }
              });
            });
          }
        });
      });

      const uniqueFieldsArray = Object.entries(fields).map(([field, subValues], index) => {
        let label;
        switch (field) {
          case 'strategias':
            label = 'Strategia';
            break;
          case 'collocazione_mvcs':
            label = 'Collocazione MVC';
            break;
          case 'fase_isos':
            label = 'Fase ISO';
            break;
          case 'articolo_gdprs':
            label = 'Articolo GDPR';
            break;
          case 'principio_pbds':
            label = 'Principio PbD';
            break;
          case 'categoria_owasps':
            label = 'Categoria OWASP';
            break;
          case 'cwe_associata_a_categoria_owasps':
            label = 'CWE';
            break;
          default:
            label = field;
        }
        return {
          id: index,
          label: label,
          campi: Array.from(subValues).sort()
        };
      });

      setUniqueFields(uniqueFieldsArray);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  //console.log(uniqueFields)

  return (
    <div>
      <Accordion items={uniqueFields} keepOthersOpen={true} />
    </div>
  );
}
