import React from "react";
export default function Die (props){
    return(
    <div 
            className= {props.isHold ? "die--item green" : "die--item"} 
            held={props.isHold}
            onClick={props.holdDice}
    >
            <h2> {props.value} </h2>
        </div>
    )
}