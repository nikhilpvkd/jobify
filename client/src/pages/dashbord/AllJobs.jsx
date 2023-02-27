import React, { useEffect } from "react";
import { JobsContainer, SearchContainer } from "../../components";
import { useAppContext } from "../../context/Appcontext";

const AllJobs = () => {
    return (
        <>
            <SearchContainer />
            <JobsContainer />
        </>
    );
};

export default AllJobs;
