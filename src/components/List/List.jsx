import Item from "../Item/Item.jsx";
import { v4 } from "uuid";

function List({ items, setItems, isColored, setIsColored }) {
    return (
        <ul>
            {items.map((item) => (
                <Item key={v4()} item={item} setItems={setItems} setIsColored={setIsColored} isColored={isColored} />
            ))}
        </ul>
    );
}

export default List;