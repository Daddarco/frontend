import React, { useEffect, useState } from 'react';
// aggiustare il css. se lo importo non fa vedere le checkbox
//import './Accordion.css';

const Accordion = ({ items, keepOthersOpen }) => {
  const [accordionItems, setAccordionItems] = useState(null);

  useEffect(() => {
    if (items) {
      setAccordionItems(items.map(item => ({
        ...item,
        toggled: false,
        checkedItems: new Array(item.campi.length).fill(false) // Inizializza lo stato delle checkbox
      })));
    }
  }, [items]);

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
        return {
          ...item,
          checkedItems
        };
      }
      return item;
    }));
  };

  return (
    <div className='accordion-parent'>
      {accordionItems?.map((listItem, key) => {
        return (
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
                          id={campo}
                          name={campo}
                          value={campo}
                          checked={listItem.checkedItems[index]}
                          onChange={() => handleCheckboxChange(listItem.id, index)}
                        />
                        <label htmlFor={campo}>{campo}</label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;