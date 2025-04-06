import React from "react";
import "./Btn3.css";

function Btn3({setRomb}) {
    const clickHandler = () => {
        setRomb(true);
    }
    return (
        <button onClick={clickHandler}>Ромбонизировать всех на свете</button>
    );
}

export default Btn3;