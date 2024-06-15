import React, { useEffect, useState } from 'react'
import AccordionResponsabile from '../components/AccordionResponsabile';
import { getCampiUnici } from '../helpers';
import useFetch from '../hooks/useFetch';
import { useParams } from 'react-router-dom';

export default function DettagliElemento() {
  const { data, loading, error } = useFetch('http://localhost:1337/api/patterns?populate=*');
  const [uniqueFields, setUniqueFields] = useState([]);
  const [singlePattern, setSinglePattern] = useState(null);
  const { id } = useParams();

  //console.log(data);

  useEffect(() => {
    if (data) {
      const fields = getCampiUnici(data);
  
      const uniqueFieldsArray = Object.entries(fields).map(([field, { values, ids }], index) => ({
        id: index,
        label: field,
        campi: Array.from(values),
        id_campi: ids // Aggiungi l'array di id
      }));
  
      setUniqueFields(uniqueFieldsArray);
    }
  }, [data]);

  useEffect(() => {
    if (id) {
      const fetchSinglePattern = async () => {
        try {
          const response = await fetch(`http://localhost:1337/api/patterns/${id}?populate=*`);
          const result = await response.json();
          setSinglePattern(result);
        } catch (error) {
          console.error("Error fetching single pattern:", error);
        }
      };
      fetchSinglePattern();
    }
  }, [id]);

  //console.log(uniqueFields);
  //console.log(singlePattern);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <AccordionResponsabile items={uniqueFields} singlePattern={singlePattern} keepOthersOpen={true} />
    </div>
  )
}
