import React, { createContext, useContext, useReducer } from "react";
import {
    CLEAR_ALERT,
    CLEAR_VALUES,
    CREATE_JOB_BEGIN,
    CREATE_JOB_ERROR,
    CREATE_JOB_SUCCESS,
    DELETE_JOB_BEGIN,
    DISPLAY_ALERT,
    EDIT_JOB_BEGIN,
    EDIT_JOB_ERROR,
    EDIT_JOB_SUCCESS,
    GET_JOBS_BEGIN,
    GET_JOBS_SUCCESS,
    HANDLE_CHANGE,
    LOGOUT_USER,
    SETUP_USER_BEGIN,
    SETUP_USER_ERROR,
    SETUP_USER_SUCCESS,
    SET_EDIT_JOB,
    TOGGLE_SIDE_BAR,
    UPDATE_USER_BEGIN,
    UPDATE_USER_ERROR,
    UPDATE_USER_SUCCESS,
} from "./actions";
import { reducer } from "./reducer";

import axios from "axios";

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");
const userLocation = localStorage.getItem("location");

export const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: "",
    alertType: "",
    showSideBar: false,
    user: JSON.parse(user) || null,
    token: token || "",
    userLocation: userLocation || "",
    isEditing: false,
    editJobId: "",
    position: "",
    company: "",
    jobLocation: userLocation || "",
    jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
    jobType: "full-time",
    statusOptions: ["pending", "interview", "declined"],
    status: "pending",
    jobs: [],
    totalJobs: 0,
    numOfPages: 1,
    page: 1,
};

const appContext = createContext();
const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const authFetch = axios.create({
        baseURL: "/api/v1",
    });

    authFetch.interceptors.request.use(
        (config) => {
            config.headers["Authorization"] = `Bearer ${state.token}`;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    authFetch.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response.status === 401) {
                logoutUser();
            }
            return Promise.reject(error);
        }
    );

    //<-------------- update user --------------->

    const updateUser = async (currentUser) => {
        dispatch({ type: UPDATE_USER_BEGIN });
        try {
            const { data } = await authFetch.patch(
                "/auth/updateUser",
                currentUser
            );
            const { user, location, token } = data;
            dispatch({
                type: UPDATE_USER_SUCCESS,
                payload: {
                    user,
                    location,
                    token,
                },
            });
            addUserToLocalStorage(data);
        } catch (error) {
            if (error.response.status !== 401) {
                dispatch({
                    type: UPDATE_USER_ERROR,
                    payload: error.response.data,
                });
            }
        }
        clearAlert();
    };

    //<-------------- display alert --------------->

    const displayAlert = () => {
        dispatch({ type: DISPLAY_ALERT });
        clearAlert();
    };
    const clearAlert = () => {
        setTimeout(() => {
            console.log("alert cleared");
            dispatch({ type: CLEAR_ALERT });
        }, 3000);
    };

    const toggleSideBar = () => {
        dispatch({ type: TOGGLE_SIDE_BAR });
    };

    //<-------------- setUp user --------------->

    const setupUser = async ({ currentUser, endPoint, alertText }) => {
        dispatch({ type: SETUP_USER_BEGIN });
        try {
            const { data } = await axios.post(
                `/api/v1/auth/${endPoint}`,
                currentUser
            );
            console.log(data);
            const { user, location, token } = data;
            console.log("success");
            dispatch({
                type: SETUP_USER_SUCCESS,
                payload: { user, location, token, alertText },
            });
            addUserToLocalStorage(data);
            clearAlert();
        } catch (err) {
            console.log("err");
            dispatch({ type: SETUP_USER_ERROR, payload: err.response.data });
            clearAlert();
        }
    };

    const logoutUser = () => {
        dispatch({ type: LOGOUT_USER });
        removeUserFromLocalStorage();
    };

    const addUserToLocalStorage = ({ user, token, location }) => {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        localStorage.setItem("location", location);
    };

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("location");
    };

    const handleChange = ({ name, value }) => {
        dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
    };

    //<-------------- create job --------------->

    const createJob = async () => {
        dispatch({ type: CREATE_JOB_BEGIN });
        try {
            const { position, company, jobLocation, jobType, status } = state;
            await authFetch.post("/jobs", {
                position,
                company,
                jobLocation,
                jobType,
                status,
            });
            dispatch({ type: CREATE_JOB_SUCCESS });
            dispatch({ type: CLEAR_VALUES });
        } catch (error) {
            if (error.response.status === 401) return;
            dispatch({
                type: CREATE_JOB_ERROR,
                payload: { msg: error.response.data.msg },
            });
        }
        clearAlert();
    };

    const clearValues = () => {
        dispatch({ type: CLEAR_VALUES });
    };

    const getAllJobs = async () => {
        dispatch({ type: GET_JOBS_BEGIN });
        try {
            const { data } = await authFetch("/jobs");
            const { jobs, totalJobs, numOfPages } = data;
            dispatch({
                type: GET_JOBS_SUCCESS,
                payload: {
                    jobs,
                    totalJobs,
                    numOfPages,
                },
            });
        } catch (err) {
            console.log(err.response);
            if (err.response.status === 401) return;
        }
        clearAlert();
    };

    const setEditJob = (id) => {
        dispatch({ type: SET_EDIT_JOB, payload: { id } });
    };

    const deleteJob = async (jobId) => {
        dispatch({ type: DELETE_JOB_BEGIN });
        try {
            const res = await authFetch.delete(`/jobs/${jobId}`);
            getAllJobs();
        } catch (err) {
            logoutUser();
        }
    };

    const editJob = async () => {
        console.log("jobedit ");
        dispatch({ type: EDIT_JOB_BEGIN });
        try {
            const {
                position,
                company,
                jobLocation,
                jobType,
                status,
                editJobId,
            } = state;

            await authFetch.patch(`/jobs/${editJobId}`, {
                company,
                position,
                jobLocation,
                jobType,
                status,
            });
            dispatch({
                type: EDIT_JOB_SUCCESS,
            });
            dispatch({ type: CLEAR_VALUES });
        } catch (error) {
            if (error.response.status === 401) return;
            dispatch({
                type: EDIT_JOB_ERROR,
                payload: { msg: error.response.data.msg },
            });
        }
        clearAlert();
    };

    return (
        <appContext.Provider
            value={{
                ...state,
                displayAlert,
                setupUser,
                toggleSideBar,
                logoutUser,
                updateUser,
                handleChange,
                clearValues,
                createJob,
                getAllJobs,
                deleteJob,
                setEditJob,
                editJob,
            }}
        >
            {children}
        </appContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(appContext);
};

export default AppProvider;
