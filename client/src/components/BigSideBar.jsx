import React from "react";
import Wrapper from "../assets/wrappers/BigSidebar";
import { useAppContext } from "../context/Appcontext";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
const BigSideBar = () => {
    const { showSidebar } = useAppContext();
    return (
        <Wrapper>
            <div
                className={
                    showSidebar
                        ? "sidebar-container"
                        : "sidebar-container show-sidebar"
                }
            >
                <div className="content">
                    <header>
                        <Logo />
                    </header>
                </div>
                <NavLinks />
            </div>
        </Wrapper>
    );
};

export default BigSideBar;
