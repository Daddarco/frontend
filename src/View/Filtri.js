import React, { useState, useEffect } from 'react';
import Accordion from '../components/Accordion';
import useFetch from '../hooks/useFetch';
import { getCampiUnici, parseCampi } from '../helpers';

export default function Filtri() {
  // TODO: aggiungi pagination
  const { data, loading, error } = useFetch('http://localhost:1337/api/patterns?populate=*');
  const [uniqueFields, setUniqueFields] = useState([]);

  //console.log(data);

  useEffect(() => {
    if (data) {
      const fields = getCampiUnici(data);
      const parsedArray = parseCampi(fields);

      setUniqueFields(parsedArray);
    //console.log(parsedArray)
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;


  return (
    <div>
      <Accordion items={uniqueFields} keepOthersOpen={true} />
    </div>
  );
}
