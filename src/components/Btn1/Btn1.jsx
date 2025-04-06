import React from "react";
import "./Btn1.css";

function Btn1({setUsers}) {
    const clickHandler = () => {
        setUsers((users) => users.map((user) => ({...user, isBlack: true})));
    }
    return (
        <button onClick={clickHandler}>Очернить</button>
    );
}

export default Btn1;