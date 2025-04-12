import React from "react";

import List from "../../components/List/List.jsx";

function Colors() {
    const [users, setUsers] = React.useState([]);
    const [isColored, setIsColored] = React.useState({
        r: 255,
        g: 255,
        b: 255
    });

    React.useEffect(() => {
        (async () => {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const data = await response.json();
            setUsers(data);
        })();
    }, []);

    return (
        <List items={users} setItems={setUsers} isColored={isColored} setIsColored={setIsColored} />
    )
}

export default Colors;