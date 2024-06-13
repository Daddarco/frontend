import React, { useEffect, useState } from 'react'
import { getCampiUnici } from '../helpers';
import useFetch from '../hooks/useFetch';
import AccordionResponsabile from '../components/AccordionResponsabile';

export default function AggiungiElemento() {
  const { data, loading, error } = useFetch('http://localhost:1337/api/patterns?populate=*');
  const [uniqueFields, setUniqueFields] = useState([]);

  useEffect(() => {
    if (data) {
      const uniqueFieldsArray = getCampiUnici(data);

      setUniqueFields(uniqueFieldsArray);
    }
  }, [data]);
  console.log(uniqueFields);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <AccordionResponsabile items={uniqueFields} keepOthersOpen={true} />
    </div>
  )
}
