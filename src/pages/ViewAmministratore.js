import React from 'react';
import { Link } from 'react-router-dom';

export default function ViewAmministratore() {
  return (
    <div>
      <h1>View Amministratore</h1>
      <Link to="/amministratore/registra-responsabile">
        <button>Registra Responsabile</button>
      </Link>
      <Link to="/amministratore/elimina-responsabile">
        <button>Elimina Responsabile</button>
      </Link>
      <Link to="/amministratore/modifiche-pkb">
        <button>Modifiche PKB</button>
      </Link>
    </div>
  );
}
