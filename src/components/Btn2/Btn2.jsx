import React from "react";
import "./Btn2.css";

function Btn2({setUsers, users}) {
    const clickHandler = () => {
        const random = Math.floor(Math.random() * users.length);
        setUsers((users) => users.filter((user, i) => i != random));
        alert(`Вы смертельно тыкнули с закрытыми глазами юзера по id ${random}`);
    }
    return (
        <button onClick={clickHandler}>Смертельно тыкнуть с закрытыми глазами</button>
    );
}

export default Btn2;