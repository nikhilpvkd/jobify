import React from "react";
import { Link, Outlet } from "react-router-dom";
import Wrapper from "../assets/wrappers/SharedLayout";
import { BigSideBar, NavBar, SmallSideBar } from "../components";
import { useAppContext } from "../context/Appcontext";

const SharedLayout = () => {
    return (
        <Wrapper>
            <main className="dashboard">
                <BigSideBar />
                <SmallSideBar />
                <div>
                    <NavBar />
                    <div className="dashboard-page">
                        <Outlet />
                    </div>
                </div>
            </main>
        </Wrapper>
    );
};
export default SharedLayout;
