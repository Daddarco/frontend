import React, { useEffect, useState } from 'react'

const Accordion = ({ items, keepOthersOpen }) => {
  const [accordionItems, setAccordionItems] = useState(null);

  useEffect(() => {
    if (items) {
      setAccordionItems([
        ...items.map(item => ({
          ...item,
          toggled: false
        }))
      ]);
    }
  }, [items]);

  function handleAccordionToggle(clickedItem) {
    setAccordionItems([
      ...accordionItems.map((item) => {
        let toggled = item.toggled

        if (clickedItem.id === item.id) {
          toggled = !item.toggled
        } else if (!keepOthersOpen) {
          toggled = false
        }

        return {
          ...item,
          toggled
        }
      })
    ])
  }

  return (
    <div className='accordion-parent'>
      {accordionItems?.map((listItem, key) => {
        return (
          <div className={`accordion ${listItem.toggled ? 'toggled' : ''}`} key={key}>
            <button className='toggle' onClick={() => handleAccordionToggle(listItem)}>
              <p>{listItem.lable}</p>
              <div className='direction-indicator'>{listItem.toggled ? '-' : '+'}</div>
            </button>
            <div className='content-parent'>
              <div className='content'>{listItem.content}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Accordion;