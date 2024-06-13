import React from 'react'

export default function PatternForm({sendPattern, message}) {
  return (
    <div className='pattern-form'>
      <form autoComplete='off' onSubmit={sendPattern}>
        <label htmlFor='titolo' className='label-titolo'>Titolo</label>
        <input type='text' id='titolo' name='titolo' className='input-titolo' ></input>

        <label htmlFor='descrizione'  className='label-descrizione' >Descrizione</label>
        <textarea type='text' id='descrizione' name='descrizione'  className='text-descrizione'></textarea>

        <label htmlFor='contesto'  className='label-contesto'>Contesto</label>
        <textarea type='text' id='contesto' name='contesto' className='text-contesto' ></textarea>

        <label htmlFor='esempio' className='label-esempio' >esempio</label>
        <textarea type='text' id='esempio' name='esempio'  className='text-esempio'></textarea>
        
        <button type='submit'  className='richiesta-button' >Manda richiesta di aggiunta</button>
        <div>{message}</div>
      </form>
    </div>
  )
}
