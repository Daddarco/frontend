import React from 'react';

export default function PatternForm({ sendPattern, message, singlePattern }) {
  return (
    <div className='pattern-form'>
      <form autoComplete='off' onSubmit={sendPattern}>
        <label htmlFor='titolo' className='label-titolo'>Titolo</label>
        <input
          type='text'
          id='titolo'
          name='titolo'
          className='input-titolo'
          defaultValue={singlePattern?.attributes?.titolo || ''}
        />

        <label htmlFor='descrizione' className='label-descrizione'>Descrizione</label>
        <textarea
          id='descrizione'
          name='descrizione'
          className='text-descrizione'
          defaultValue={singlePattern?.attributes?.descrizione || ''}
        />

        <label htmlFor='contesto' className='label-contesto'>Contesto</label>
        <textarea
          id='contesto'
          name='contesto'
          className='text-contesto'
          defaultValue={singlePattern?.attributes?.contesto || ''}
        />

        <label htmlFor='esempio' className='label-esempio'>Esempio</label>
        <textarea
          placeholder='Example 1: <text>. Example 2: <text>.'
          id='esempio'
          name='esempio'
          className='text-esempio'
          defaultValue={singlePattern?.attributes?.esempio || ''}
        />

        <button type='submit' className='richiesta-button'>Manda richiesta di aggiunta</button>
        <div>{message}</div>
      </form>
    </div>
  );
}
