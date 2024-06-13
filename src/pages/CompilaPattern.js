import React from 'react';

// Funzione per rinominare le etichette
function renameLabels(fields) {
  return fields.map(field => {
    let newLabel = field.label.toLowerCase().replace(/\s/g, '_');
    if (field.label === 'CWE') {
      newLabel = 'cwe_associata_a_categoria_owasps';
    }
    return {
      ...field,
      label: newLabel
    };
  });
}

export default function CompilaPattern({ uniqueFields }) {
  // Rinominare le etichette
  const renamedFields = renameLabels(uniqueFields);

  console.log(renamedFields); // Per vedere l'output rinominato

  return (
    <div>
      <form>
        
      </form>
    </div>
  );
}
