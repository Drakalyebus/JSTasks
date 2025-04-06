import React from "react";

import Btn1 from "./components/Btn1/Btn1.jsx";
import Btn2 from "./components/Btn2/Btn2.jsx";
import Btn3 from "./components/Btn3/Btn3.jsx";
import List from "./components/List/List.jsx";

const userList = [
    { id: 1, name: "John", avatar: "https://i.pravatar.cc/48?u=1", isBlack: false },
    { id: 2, name: "Jane", avatar: "https://i.pravatar.cc/48?u=2", isBlack: false },
    { id: 3, name: "Bob", avatar: "https://i.pravatar.cc/48?u=3", isBlack: false },
    { id: 4, name: "Alice", avatar: "https://i.pravatar.cc/48?u=4", isBlack: false },
];

function App() {
    const [users, setUsers] = React.useState(userList);
    const [romb, setRomb] = React.useState(false);
    return (
        <>
            <div>
                <Btn1 setUsers={setUsers} />
                <Btn2 setUsers={setUsers} users={users} />
                <Btn3 setRomb={setRomb} />
            </div>
            <List users={users} romb={romb} />
        </>
    );
}

export default App;