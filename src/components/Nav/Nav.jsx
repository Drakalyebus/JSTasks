import { NavLink } from "react-router";

function Nav() {
    return (
        <nav>
            <NavLink to="/colors">Colors</NavLink>
            <NavLink to="/test">Test</NavLink>
        </nav>
    )
}

export default Nav;