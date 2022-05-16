import React from "react";
import Die from "./Die";
import {nanoid} from "nanoid";
import Confetti from 'react-confetti'

export default function App(){
    
    //generating new die
    function generateDie(){
        return {
                value: Math.ceil(Math.random() * 6),
                isHold: false,
                id : nanoid()
            }
    }
    
    //getting dice array of objects
    function allNewDice() {
        const diceArr = [];
        for(let i = 0; i<10; i++){
            diceArr.push(generateDie());
        }
        return diceArr;
    }
    
    //console.log(allNewDice())
    
    
// setting state to dice and make it equal to the array of objects  
 const [diceElements, setDiceElements] = React.useState(allNewDice())
 const newDiceElements = diceElements.map(item => {
     return (
         <Die 
            value = {item.value} 
            key={item.id} 
            isHold={item.isHold}
            holdDice = {() => holdDice(item.id)} 
        />
        )
 })
 
 //function for holding dice and toggling it 

 function holdDice(id){
     //console.log(id)
     setDiceElements(prevDice => {
         return prevDice.map((dice ) => {
             return dice.id === id ? {value:dice.value , isHold : !dice.isHold, id:dice.id} : dice;
            })
     })
 }
 
 
//function for rolling dice
 function rollDice(){
     if(!tenzies){
          setDiceElements((prevDie) => {
         return prevDie.map((die) => {
             return die.isHold? die :
             generateDie()
         })
     })
     }else{
         setTenzies(false)
         setDiceElements(allNewDice)
     }
    
 }

    
    const[tenzies, setTenzies] = React.useState(false)
    
    React.useEffect(() => {
        const allHeld = diceElements.every(dice => dice.isHold);
        const firstValue = diceElements[0].value;
        const allValues = diceElements.every(dice => dice.value ===firstValue);
        if(allHeld && allValues){
            setTenzies(true)
             //console.log("You WON!!!")
        }
        
       
    }, [diceElements])
       
    return(
        <main>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice--container">
                {newDiceElements}
            </div>
            <button className="roll--btn" onClick={rollDice}> {tenzies ? "New Game " : "Roll"}</button>
            {tenzies &&
            <Confetti
            width="1700"
            height="1000"
    />}
         
        </main>
    )
}