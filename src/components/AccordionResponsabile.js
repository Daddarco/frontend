import React, { useEffect, useState } from 'react';
import './AccordionResponsabile.css';
import CompilaPattern from '../pages/CompilaPattern';

const AccordionResponsabile = ({ items, singlePattern, keepOthersOpen }) => {
  const [accordionItems, setAccordionItems] = useState(null);
  const [filtri, setFiltri] = useState([]);

  useEffect(() => {
    if (items) {
      setAccordionItems(items.map(item => ({
        ...item,
        toggled: false,
        checkedItems: new Array(item.campi.length).fill(false) // Inizializza lo stato delle checkbox
      })));
    }
  }, [items]);

  useEffect(() => {
    if (singlePattern && accordionItems) {
      const singlePatternFields = {};

      // Estrai i campi dal singlePattern
      Object.keys(singlePattern.data.attributes).forEach(key => {
        if (Array.isArray(singlePattern.data.attributes[key]?.data)) {
          singlePatternFields[key] = singlePattern.data.attributes[key].data.map(item => item.id);
        }
      });

      const updatedAccordionItems = accordionItems.map(item => {
        const checkedItems = item.id_campi.map(id_campo => {
          // Controlla se l'id_campo è presente nel singlePattern
          const isChecked = singlePatternFields[item.label]?.includes(id_campo) || false;
          return isChecked;
        });

        return {
          ...item,
          checkedItems
        };
      });

      setAccordionItems(updatedAccordionItems);
    }
  }, [singlePattern]);

  const handleAccordionToggle = (clickedItem) => {
    setAccordionItems(accordionItems.map((item) => {
      let toggled = item.toggled;

      if (clickedItem.id === item.id) {
        toggled = !item.toggled;
      } else if (!keepOthersOpen) {
        toggled = false;
      }

      return {
        ...item,
        toggled
      };
    }));
  };

  const handleCheckboxChange = (itemId, index) => {
    setAccordionItems(accordionItems.map((item) => {
      if (item.id === itemId) {
        const checkedItems = [...item.checkedItems];
        checkedItems[index] = !checkedItems[index];

        // Aggiorna i filtri
        const updatedFiltri = filtri.filter(filtro => filtro.label !== item.label);
        const selectedFields = checkedItems.reduce((acc, isChecked, i) => {
          if (isChecked) {
            acc.push({
              campo: item.campi[i],
              id_campo: item.id_campi[i]
            });
          }
          return acc;
        }, []);

        if (selectedFields.length > 0) {
          updatedFiltri.push({
            label: item.label,
            checkedItems: selectedFields
          });
        }

        setFiltri(updatedFiltri);

        return {
          ...item,
          checkedItems
        };
      }
      return item;
    }));
  };

  //console.log(filtri);

  return (
    <div className='container'>
      <div className='side-menu'>
        <div className='accordion-parent'>
          {accordionItems?.map((listItem, key) => (
            <div className={`accordion ${listItem.toggled ? 'toggled' : ''}`} key={key}>
              <button className='toggle' onClick={() => handleAccordionToggle(listItem)}>
                <p>{listItem.label}</p>
                <div className='direction-indicator'>{listItem.toggled ? '-' : '+'}</div>
              </button>
              <div className='content-parent'>
                <div className='content'>
                  {listItem.toggled && (
                    <div>
                      {listItem.campi.map((campo, index) => (
                        <div key={index}>
                          <input
                            type="checkbox"
                            id={`${campo}-${index}`}
                            name={campo}
                            value={campo}
                            checked={listItem.checkedItems[index]}
                            onChange={() => handleCheckboxChange(listItem.id, index)}
                            className="custom-checkbox"
                          />
                          <label htmlFor={`${campo}-${index}`} className="custom-checkbox-label">
                            <span>{campo}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='pattern-form-container'>
        <CompilaPattern filtri={filtri} singlePattern={singlePattern}/>
      </div>
    </div>
  );
};

export default AccordionResponsabile;