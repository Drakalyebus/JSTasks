import React from "react";
import proportion from "../../utils/proportion.js";

function Item({ item, setItems, isColored, setIsColored }) {
    const clickHandler = () => {
        setItems(items => items.filter(user => user !== item));
        const colors = proportion([Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)], 255);
        setIsColored({
            r: colors[0],
            g: colors[1],
            b: colors[2]
        });
    }

    return (
        <li onClick={clickHandler} style={{ backgroundColor: `rgb(${isColored.r}, ${isColored.g}, ${isColored.b})` }}>{item.username}</li>
    )
}

export default Item;