import React, { useState } from 'react';
import PatternForm from '../View/PatternForm';
import { userData } from '../helpers';

//TODO: check che tutti i campi siano presenti

function formatBody(formData, filtri, userId, stato, idPatternAssociato) {
  const jsonData = Object.fromEntries(formData);

  // Crea un oggetto vuoto per contenere i campi filtrati con gli id_campi
  const filtriConIdCampi = {};

  // Popola l'oggetto con i campi filtrati e gli id_campi
  filtri.forEach(filtro => {
    filtriConIdCampi[filtro.label] = filtro.checkedItems.map(item => item.id_campo);
  });

  const id = idPatternAssociato || null
  let statoBody;

  if (stato === 'Aggiungi') {
    statoBody = {id: 3};
  } else if (stato === 'Modifica') {
    statoBody = {id: 1};
  }

  const body = {
    data: {
      user: userId,
      stato: statoBody,
      titolo: jsonData.titolo,
      descrizione: jsonData.descrizione,
      contesto: jsonData.contesto,
      esempio: jsonData.esempio,
      pattern: id,
      // Aggiungi i campi filtrati con gli id_campi
      ...filtriConIdCampi
    }
  };

  return body;
}

export default function CompilaPattern({ filtri, singlePattern, stato }) {
  const [message, setMessage] = useState(null);
  const { jwt, userId } = userData();

  console.log(filtri);
  console.log(singlePattern);

  const sendPattern = async (event) => {
    event.preventDefault();
    setMessage(null);

    // prende tutti i valori del form e li trasforma in un oggetto
    const formData = new FormData(event.target);

    // Formatta il body da inviare
    const body = formatBody(formData, filtri, userId, stato, singlePattern.id);
    //console.log(body);

    // richiesta POST
    const reqLoginOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwt
      },
      body: JSON.stringify(body)
    };

    const req = await fetch('http://localhost:1337/api/pattern-buffers', reqLoginOptions);
    const res = await req.json();

    // gestione errori
    if (res.error) {
      setMessage(res.error.message);
      return;
    }

    if (res.data) {
      setMessage('Pattern inviato con successo');
    }

    //console.log(res)
  };

  return (
    <div>
      <PatternForm sendPattern={sendPattern} message={message} singlePattern={singlePattern} stato={stato} />
    </div>
  );
}