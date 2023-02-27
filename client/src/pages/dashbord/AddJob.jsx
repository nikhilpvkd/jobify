import React from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { Alert, FormRow } from "../../components";
import FormRowSelect from "../../components/FormRowSelect";
import { useAppContext } from "../../context/Appcontext";

const AddJob = () => {
    const {
        isEditing,
        editJob,
        showAlert,
        displayAlert,
        position,
        company,
        jobLocation,
        jobType,
        jobTypeOptions,
        status,
        statusOptions,
        handleChange,
        clearValues,
        createJob,
    } = useAppContext();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!position || !company || !jobLocation) {
            displayAlert();
            return;
        }
        if (isEditing) {
            editJob();
            return;
        }
        createJob();
    };

    const handleJobInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        handleChange({ name, value });
    };

    return (
        <Wrapper>
            <form className="form">
                <h3>{isEditing ? "edit job" : "add job"} </h3>
                {showAlert && <Alert />}

                {/* position */}
                <div className="form-center">
                    <FormRow
                        type="text"
                        name="position"
                        value={position}
                        handleChange={handleJobInput}
                    />
                    {/* company */}
                    <FormRow
                        type="text"
                        name="company"
                        value={company}
                        handleChange={handleJobInput}
                    />
                    {/* location */}
                    <FormRow
                        type="text"
                        labelText="location"
                        name="jobLocation"
                        value={jobLocation}
                        handleChange={handleJobInput}
                    />
                    {/* job type */}

                    <FormRowSelect
                        name="jobType"
                        labelText="Type"
                        list={jobTypeOptions}
                        handleChange={handleJobInput}
                        value={jobType}
                    />

                    {/* job status */}

                    <FormRowSelect
                        name="status"
                        list={statusOptions}
                        handleChange={handleJobInput}
                        value={status}
                    />

                    <div className="btn-container">
                        <button
                            className="btn btn-block submit-btn"
                            type="submit"
                            onClick={handleSubmit}
                        >
                            submit
                        </button>
                        <button
                            className="btn btn-block clear-btn"
                            onClick={(e) => {
                                e.preventDefault();
                                clearValues();
                            }}
                        >
                            clear
                        </button>
                    </div>
                </div>
            </form>
        </Wrapper>
    );
};

export default AddJob;
