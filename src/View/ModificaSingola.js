import React from 'react'

export default function ModificaSingola({id, pattern, esempi}) {
  const idPatternAssociato = pattern.pattern.data.id;
  const patternAssociato = pattern.pattern.data.attributes;
  
  console.log(pattern);

  return (
    <div className='pattern-card'>
      <p>Pattern id: {id}</p>
      <h1>{pattern.titolo}</h1>

      {/* Loop per mostrare i nomi delle strategie */}
      <div>
        <strong>Strategie:</strong>
        <ul>
          {pattern.strategias.data.map(element => (
            <li key={element.id}>{element.attributes.nome}</li>
          ))}
        </ul>
      </div>

      <strong>Descrizione:</strong>
      <p>{pattern.descrizione}</p>

      <strong>Contesto:</strong>
      <p>{pattern.contesto}</p>

      {/* Loop per mostrare la collocazione MVC */}
      <div>
        <strong>Collocazione MVC:</strong>
        <ul>
          {pattern.collocazione_mvcs.data.map(element => (
            <li key={element.id}>{element.attributes.nome}</li>
          ))}
        </ul>
      </div>

      {/* Loop per mostrare le fasi ISO */}
      <div>
        <strong>Fasi ISO:</strong>
        <ul>
          {pattern.fase_isos.data.map(element => (
            <li key={element.id}>{element.attributes.nome}</li>
          ))}
        </ul>
      </div>

      {/* Loop per mostrare gli eventuali articoli del GDPR */}
      <div>
        <strong>Eventuali articoli GDPR:</strong>
        <ul>
          {pattern.articolo_gdprs.data.map(element => (
            <li key={element.id}>
              <a target='_blank'
                rel='noreferrer'
                href={element.attributes.link}>
                {element.attributes.nome}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Loop per mostrare i principi della PbD*/}
      <div>
        <strong>Principi PbD:</strong>
        <ul>
          {pattern.principio_pbds.data.map(element => (
            <li key={element.id}>{element.attributes.nome}</li>
          ))}
        </ul>
      </div>

      {/* Loop per mostrare le categorie OWASP */}
      <div>
        <strong>Categorie OWASP:</strong>
        <ul>
          {pattern.categoria_owasps.data.map(element => (
            <li key={element.id}>{element.attributes.nome}</li>
          ))}
        </ul>
      </div>

      {/* Loop per mostrare le CWE associate alle categorie OWASP */}
      <div>
        <strong>CWE associate alle categorie OWASP:</strong>
        <ul>
          {pattern.cwe_associata_a_categoria_owasps.data.map(element => (
            <li key={element.id}>{element.attributes.nome}</li>
          ))}
        </ul>
      </div>

      {/* Loop per mostrare Gli esempi */}
      <div>
        <strong>Eventuali esempi:</strong>
        <ul>
          {esempi.map(element => (
            <li>{element}</li>
          ))}
        </ul>
      </div>

      <strong>Modifica fatta da:</strong>
      <p>{pattern.user.data.attributes.username}</p>
      <br></br>
      <br></br>

      {/* Pattern associato */}
      <div>
        <h1>Pattern associato:</h1>
        <p>Pattern id: {idPatternAssociato}</p>
      <h1>{patternAssociato.titolo}</h1>

      {/* Loop per mostrare i nomi delle strategie */}
      <div>
        <strong>Strategie:</strong>
        <ul>
          {patternAssociato.strategias.data.map(element => (
            <li key={element.id}>{element.attributes.nome}</li>
          ))}
        </ul>
      </div>

      <strong>Descrizione:</strong>
      <p>{patternAssociato.descrizione}</p>

      <strong>Contesto:</strong>
      <p>{patternAssociato.contesto}</p>

      {/* Loop per mostrare la collocazione MVC */}
      <div>
        <strong>Collocazione MVC:</strong>
        <ul>
          {patternAssociato.collocazione_mvcs.data.map(element => (
            <li key={element.id}>{element.attributes.nome}</li>
          ))}
        </ul>
      </div>

      {/* Loop per mostrare le fasi ISO */}
      <div>
        <strong>Fasi ISO:</strong>
        <ul>
          {patternAssociato.fase_isos.data.map(element => (
            <li key={element.id}>{element.attributes.nome}</li>
          ))}
        </ul>
      </div>

      {/* Loop per mostrare gli eventuali articoli del GDPR */}
      <div>
        <strong>Eventuali articoli GDPR:</strong>
        <ul>
          {patternAssociato.articolo_gdprs.data.map(element => (
            <li key={element.id}>
              <a target='_blank'
                rel='noreferrer'
                href={element.attributes.link}>
                {element.attributes.nome}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Loop per mostrare i principi della PbD*/}
      <div>
        <strong>Principi PbD:</strong>
        <ul>
          {patternAssociato.principio_pbds.data.map(element => (
            <li key={element.id}>{element.attributes.nome}</li>
          ))}
        </ul>
      </div>

      {/* Loop per mostrare le categorie OWASP */}
      <div>
        <strong>Categorie OWASP:</strong>
        <ul>
          {patternAssociato.categoria_owasps.data.map(element => (
            <li key={element.id}>{element.attributes.nome}</li>
          ))}
        </ul>
      </div>

      {/* Loop per mostrare le CWE associate alle categorie OWASP */}
      <div>
        <strong>CWE associate alle categorie OWASP:</strong>
        <ul>
          {patternAssociato.cwe_associata_a_categoria_owasps.data.map(element => (
            <li key={element.id}>{element.attributes.nome}</li>
          ))}
        </ul>
      </div>

      <strong>Esempi:</strong>
      <p>{patternAssociato.esempio}</p>
      </div>

    </div>
  )
}