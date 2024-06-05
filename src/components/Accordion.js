import React, { useEffect, useState } from 'react';
import './Accordion.css';

const Accordion = ({ items, keepOthersOpen }) => {
  const [accordionItems, setAccordionItems] = useState(null);

  useEffect(() => {
    if (items) {
      const storedCheckedItems = JSON.parse(localStorage.getItem('checkedItems')) || [];
      setAccordionItems(items.map(item => {
        const storedItem = storedCheckedItems.find(storedItem => storedItem.label === item.label);
        const checkedItems = storedItem ? storedItem.checkedItems : [];
        return {
          ...item,
          toggled: false,
          checkedItems: item.campi.map(campo => checkedItems.includes(campo))
        };
      }));
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
    const updatedAccordionItems = accordionItems.map((item) => {
      if (item.id === itemId) {
        const checkedItems = [...item.checkedItems];
        checkedItems[index] = !checkedItems[index];
        return {
          ...item,
          checkedItems
        };
      }
      return item;
    });

    setAccordionItems(updatedAccordionItems);
    updateLocalStorage(updatedAccordionItems);
  };

  const updateLocalStorage = (updatedAccordionItems) => {
    const checkedItemsToStore = updatedAccordionItems
      .map(item => ({
        label: item.label,
        checkedItems: item.campi.filter((campo, index) => item.checkedItems[index])
      }))
      .filter(item => item.checkedItems.length > 0);

    if (checkedItemsToStore.length > 0) {
      localStorage.setItem('checkedItems', JSON.stringify(checkedItemsToStore));
    } else {
      localStorage.removeItem('checkedItems');
    }
  };

  return (
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
  );
};

export default Accordion;
