import React from "react";
import { v4 } from "uuid";
import "./List.css";

function List({users, romb}) {
    return (
        romb
            ?
        <div className="romb"></div>
            :
        <ul>
            {
                users.map((user) => (
                        <li key={v4()}>
                            {user.isBlack
                                ?
                            <div className="black">{user.name}</div>
                                :
                            <img src={user.avatar} />
                            }
                            {user.name}
                        </li>
                    )
                ) 
            }
        </ul>
    );
}

export default List;