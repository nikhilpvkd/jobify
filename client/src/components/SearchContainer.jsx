import React, { useMemo, useState } from "react";
import Wrapper from "../assets/wrappers/SearchContainer";
import { FormRow, FormRowSelect } from "../components";
import { useAppContext } from "../context/Appcontext";

const SearchContainer = () => {
    const {
        isLoading,
        handleChange,
        searchStatus,
        statusOptions,
        searchType,
        jobTypeOptions,
        sort,
        sortOptions,
        clearFilters,
    } = useAppContext();

    const [localSearch, setLoacalSearch] = useState("");
    const handleSearch = (e) => {
        handleChange({ name: e.target.name, value: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoacalSearch("");
        clearFilters();
    };

    const debounce = () => {
        let timeOutID;
        return (e) => {
            setLoacalSearch(e.target.value);
            clearTimeout(timeOutID);
            timeOutID = setTimeout(() => {
                handleChange({ name: e.target.name, value: e.target.value });
            }, 1000);
        };
    };

    const optimizedDebounce = useMemo(
        () => debounce(), // eslint-disable-next-line
        []
    );
    return (
        <Wrapper>
            <form className="form">
                <h4>Search Container</h4>
                <div className="form-center">
                    <FormRow
                        type="text"
                        name="search"
                        handleChange={optimizedDebounce}
                        value={localSearch}
                    ></FormRow>
                    <FormRowSelect
                        labelText="job status"
                        name="searchStatus"
                        value={searchStatus}
                        handleChange={handleSearch}
                        list={["all", ...statusOptions]}
                    ></FormRowSelect>
                    <FormRowSelect
                        labelText="job type"
                        name="searchType"
                        value={searchType}
                        handleChange={handleSearch}
                        list={["all", ...jobTypeOptions]}
                    ></FormRowSelect>
                    <FormRowSelect
                        name="sort"
                        value={sort}
                        handleChange={handleSearch}
                        list={sortOptions}
                    ></FormRowSelect>
                    <button
                        className="btn btn-block btn-danger"
                        disabled={isLoading}
                        onClick={handleSubmit}
                    >
                        clear filters
                    </button>
                </div>
            </form>
        </Wrapper>
    );
};

export default SearchContainer;
