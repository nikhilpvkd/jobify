import React, { useState } from "react";
import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft, FaCaretDown, FaUserCircle } from "react-icons/fa";
import Logo from "../components/Logo";
import { useAppContext } from "../context/Appcontext";
import { useEffect } from "react";

const NavBar = () => {
    const { user, showSideBar, logoutUser, toggleSideBar } = useAppContext();

    const [showDropDown, setDropDown] = useState();

    return (
        <Wrapper>
            <div className="nav-center">
                <button
                    type="button"
                    className="toggle-btn"
                    onClick={toggleSideBar}
                >
                    <FaAlignLeft className="hamIcon" />
                </button>
                <div>
                    <Logo />
                    <h3 className="logo-text">Dashboard</h3>
                </div>
                <div className="btn-container">
                    <button
                        type="button"
                        className="btn"
                        onClick={() => {
                            setDropDown(!showDropDown);
                        }}
                    >
                        <FaUserCircle />
                        {user?.name}
                        <FaCaretDown />
                    </button>
                    <div
                        className={
                            showDropDown ? "dropdown show-dropdown" : "dropdown"
                        }
                    >
                        <button
                            type="button"
                            onClick={logoutUser}
                            className="dropdown-btn"
                        >
                            logout
                        </button>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

export default NavBar;
