import React, { useEffect } from "react";
import { useAppContext } from "../context/Appcontext";
import Loading from "./Loading";
import Wrapper from "../assets/wrappers/JobsContainer";
import Job from "./Job";
import PageButtonContainer from "./PageButtonContainer";

const JobsContainer = () => {
    const {
        isLoading,
        getAllJobs,
        jobs,
        totalJobs,
        search,
        searchStatus,
        sort,
        searchType,
        numOfPages,
        page,
    } = useAppContext();

    useEffect(() => {
        getAllJobs();
        // eslint-disable-next-line
    }, [page, search, searchStatus, sort, searchType]);

    if (isLoading) {
        return <Loading center />;
    }
    if (jobs.length === 0) {
        return (
            <Wrapper>
                <h2>No jobs to display...</h2>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <h5>
                {totalJobs} job{jobs.length > 1 && "s"} found
            </h5>
            <div className="jobs">
                {jobs.map((job) => {
                    return <Job key={job._id} {...job} />;
                })}
            </div>
            {numOfPages > 1 && <PageButtonContainer />}
        </Wrapper>
    );
};

export default JobsContainer;
