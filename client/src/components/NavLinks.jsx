import React from "react";
import { NavLink } from "react-router-dom";
import links from "../utils/navlinks";

const NavLinks = ({ toggleSideBar }) => {
    return links.map((link) => {
        const { path, text, icon, id } = link;
        return (
            <div className="nav-links" key={id}>
                <NavLink
                    to={path}
                    onClick={toggleSideBar}
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                    end
                >
                    <span className="icon">{icon}</span>
                    {text}
                </NavLink>
            </div>
        );
    });
};

export default NavLinks;
