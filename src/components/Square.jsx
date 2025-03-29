import React from "react";
import "./Square.css";

function Square(props) {
    const [color, setColor] = React.useState(props.color);
    return (
        <div className="square-container">
            <div className="square" style={{backgroundColor: color}} onClick={() => setColor(prompt(`Введите цвет, текущий: ${color}`))}></div>
            <span className="color" style={{color: color}}>{'Цвет:'} {color}</span>
        </div>
    )
}

export default Square;