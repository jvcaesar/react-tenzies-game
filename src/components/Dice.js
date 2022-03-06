import React from 'react';
import './dice.css'

export const Dice = ({dice, holdDice}) => {
    const pips = Array.from(
      {length: dice.value}, 
      (_, i) => <span key={i} className='pip' />
    )

    const nopips = <span className='nopips'>{dice.value}</span>
    //console.log(pips)
  return (
        <div 
            className='dice'
            style={{background: dice.isHeld ? '#858595' : 'white'}}
            onClick={() => holdDice(dice.id)}
        >
                {/* {dice.value} */}
                {dice.value === '?' ? nopips : pips}
        </div>
  )
};
