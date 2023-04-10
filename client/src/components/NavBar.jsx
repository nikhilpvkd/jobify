import React, { useEffect, useRef, useState } from "react";
import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft, FaCaretDown, FaUserCircle } from "react-icons/fa";
import Logo from "../components/Logo";
import { useAppContext } from "../context/Appcontext";

const NavBar = () => {
    const { user, showSideBar, logoutUser, toggleSideBar } = useAppContext();

    const [showDropDown, setDropDown] = useState(false);

    const ref = useRef(null);

    useEffect(() => {
        // closing when clicking out-side logic
        let handler = (e) => {
            if (!ref.current.contains(e.target)) {
                setDropDown(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    });

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
                <div className="btn-container" ref={ref}>
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
