import React, { useState, useEffect } from 'react'
import './style.css'
import { Dice } from './components/Dice';
import { nanoid } from 'nanoid'
import ConfettiExplosion from 'react-confetti-explosion'

const App = () => {

  const initDiceObj = (fresh) => {
    const newDice = []
    const newVal = () => fresh ? '?' : Math.ceil(Math.random() * 6)
    
    for (let i = 0; i < 10; i++) {
      let dice = {
        value: newVal(),
        isHeld: false,
        id: nanoid()
      }
      newDice.push(dice)
    }
    //console.log('newRoll', newDice)
    return newDice
  }

  const [diceObj, setDiceObj] = useState(initDiceObj(true))

  const [tenzies, setTenzies] = useState(false)

  const [noRolls, setNoRolls] = useState(0)

  const [timer, setTimer] = useState(0)

  const [timerId, setTimerId] = useState(0)

  //useEffect(() => setDiceObj(initDiceObj()), [])

  useEffect(() => {
    const dicesHeld = (num) => diceObj.every(dice => {
      return dice.isHeld && dice.value === num
    })

    if (dicesHeld(diceObj[0].value)) {
      setTenzies(true)
      stopTimer()
      console.log('You have won')
    }
    if (timer >= 60) {
      resetGame()
      console.log('Game restarted after 60seconds')
    }
    if (noRolls === 1 && timerId === 0) {
      startTimer()
    }
    //console.log('Rolls: ', noRolls)
  }, [diceObj, noRolls, timer])

//  console.log('newDice: ', initialDice)

  const rollDice = () => {
    setDiceObj(diceObj.map(dice => dice.isHeld ? dice : {
      ...dice,
      value: Math.ceil(Math.random() * 6)
    }))
    setNoRolls(prevRoll => prevRoll + 1)
  }

  const rollAllDice = () => {
    setDiceObj(initDiceObj(true))
    setTenzies(false)
    setNoRolls(0)
    setTimer(0)
//    setInitialDice(allNewDice())
  }

//  console.log('diceObj: ', diceObj)

//  const diceElements = initialDice.map((value, i) => 
//                                <Dice key={i} value={value} />)

  const resetGame = () => {
    //console.log('reset game', timerId)
    stopTimer()
    rollAllDice()
  }

  const holdDice = (id) => {
//    console.log(id)
    if (tenzies || diceObj[0].value === '?')
      return
    setDiceObj(
      diceObj.map(dice => dice.id === id ? {
        ...dice,
        isHeld: !dice.isHeld } 
        : dice)
    )
  }

  const diceObjElements = diceObj.map(obj =>                                 
            <Dice key={obj.id} dice={obj} holdDice={holdDice} />)

  const Header = () => {
    return (
      <div className='header'>
        <p className='rolls'><strong>Rolls</strong>: {noRolls}</p>
        <p className='timer'><strong>Time</strong>: {timer}s</p>
      </div>
    )
  }

  const timeCounter = () => setInterval(() => {
      setTimer(prevTime => prevTime + 1)
    }, 1000)

  const startTimer = () => {
    const tid = timeCounter()
    setTimerId(tid)
    //console.log('startTimer: ', tid)
  }

  const stopTimer = () => {
    //console.log('stopTimer: ', timerId)
    clearInterval(timerId)
    setTimerId(0)
  }

//  console.log(diceObjElements)
  return (
    <main>
      <div className='outer-container'>
        <div className='inner-container'>
          {tenzies && 
            <ConfettiExplosion 
              duration={8000} 
              floorHeight={650}
              particleCount={250}
              particleSize={20}
            />}
          <Header />
          <h1 className='title'>Tenzies</h1>
          <p className='instructions'>Roll until all dice are the same. Click 
          each die to freeze it at its current value between rolls. Max time - 60sec.</p>
          <div className='multi-dice'>
            {/* {initialDice.map((value, i) => 
              <Dice key={i} value={value} />)
            } */}

            {diceObjElements}
          </div>

          <button 
            className='roll-button'
            onClick={() => tenzies ? rollAllDice() : rollDice()}>
              {/* {tenzies || noRolls === 0 ? 'New Game' : 'Roll'} */}
              {/* {tenzies || diceObj[0].value === '?' ? 'New Game' : 'Roll'} */}
              {tenzies ? 'New Game' : diceObj[0].value === '?' ? 'Start' : 'Roll'}
          </button>

        </div>
      </div>
    </main>
  );
}

export default App;
