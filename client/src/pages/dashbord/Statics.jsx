import React, { useEffect } from "react";
import { ChartsContainer, Loading, StatsContainer } from "../../components";
import { useAppContext } from "../../context/Appcontext";

const Statics = () => {
    const { showStats, isLoading, monthlyApplications } = useAppContext();
    useEffect(() => {
        showStats();
        // eslint-disable-next-line
    }, []);

    if (isLoading) {
        return <Loading center />;
    }

    return (
        <>
            <StatsContainer />
            {monthlyApplications.length > 0 && <ChartsContainer />}
        </>
    );
};

export default Statics;
