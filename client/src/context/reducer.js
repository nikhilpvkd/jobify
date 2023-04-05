import {
    CHANGE_PAGE,
    CLEAR_ALERT,
    CLEAR_FILTERS,
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
    SHOW_STATS_BEGIN,
    SHOW_STATS_SUCCESS,
    TOGGLE_SIDE_BAR,
    UPDATE_USER_BEGIN,
    UPDATE_USER_ERROR,
    UPDATE_USER_SUCCESS,
} from "./actions";
import { initialState } from "./Appcontext";

export const reducer = (state, action) => {
    if (action.type === DISPLAY_ALERT) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertText: "Please enter all the feilds!",
            alertType: "danger",
        };
    }
    if (action.type === CLEAR_ALERT) {
        return {
            ...state,
            isLoading: false,
            showAlert: false,
            alertText: "",
            alertType: "",
        };
    }

    if (action.type === SETUP_USER_BEGIN) {
        return {
            ...state,
            isLoading: true,
        };
    }
    if (action.type === SETUP_USER_SUCCESS) {
        return {
            ...state,
            showAlert: true,
            alertText: action.payload.alertText,
            alertType: "success",
            user: action.payload.user,
            token: action.payload.token,
            userLocation: action.payload.location,
            isLoading: false,
        };
    }
    if (action.type === SETUP_USER_ERROR) {
        return {
            ...state,
            showAlert: true,
            alertText: action.payload.message,
            alertType: "danger",
            isLoading: false,
        };
    }

    if (action.type === LOGOUT_USER) {
        return {
            ...initialState,
            user: null,
            token: null,
            userLocation: null,
            jobLocation: null,
        };
    }
    if (action.type === TOGGLE_SIDE_BAR) {
        return {
            ...state,
            showSideBar: !state.showSideBar,
        };
    }

    if (action.type === UPDATE_USER_BEGIN) {
        return {
            ...state,
            isLoading: true,
        };
    }
    if (action.type === UPDATE_USER_SUCCESS) {
        return {
            ...state,
            showAlert: true,
            alertText: "Update user success!",
            alertType: "success",
            user: action.payload.user,
            token: action.payload.token,
            userLocation: action.payload.location,
            jobLocation: action.payload.location,
            isLoading: false,
        };
    }
    if (action.type === UPDATE_USER_ERROR) {
        return {
            ...state,
            showAlert: true,
            alertText: action.payload.message,
            alertType: "danger",
            isLoading: false,
        };
    }
    if (action.type === HANDLE_CHANGE) {
        return {
            ...state,
            page: 1,
            [action.payload.name]: action.payload.value,
        };
    }

    if (action.type === CLEAR_FILTERS) {
        return {
            ...state,
            search: "",
            searchStatus: "all",
            searchType: "all",
            sort: "latest",
        };
    }

    if (action.type === CLEAR_VALUES) {
        const initialState = {
            isEditing: false,
            editJobId: "",
            position: "",
            company: "",
            jobLocation: state.userLocation,
            jobType: "full-time",
            status: "pending",
        };

        return {
            ...state,
            ...initialState,
        };
    }
    if (action.type === CREATE_JOB_BEGIN) {
        return { ...state, isLoading: true };
    }
    if (action.type === CREATE_JOB_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: "success",
            alertText: "New Job Created!",
        };
    }
    if (action.type === CREATE_JOB_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: "danger",
            alertText: action.payload.msg,
        };
    }

    if (action.type === GET_JOBS_BEGIN) {
        return {
            ...state,
            isLoading: true,
        };
    }
    if (action.type === GET_JOBS_SUCCESS) {
        return {
            ...state,
            jobs: action.payload.jobs,
            totalJobs: action.payload.totalJobs,
            numOfPages: action.payload.numOfPages,
            isLoading: false,
        };
    }
    if (action.type === SET_EDIT_JOB) {
        let job = state.jobs.find((job) => job._id === action.payload.id);
        const { company, position, status, jobType, jobLocation, _id } = job;
        return {
            ...state,
            isEditing: true,
            editJobId: _id,
            position,
            company,
            jobLocation,
            jobType,
            status,
        };
    }

    if (action.type === DELETE_JOB_BEGIN) {
        return { ...state, isLoading: true };
    }

    if (action.type === EDIT_JOB_BEGIN) {
        return { ...state, isLoading: true };
    }
    if (action.type === EDIT_JOB_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: "success",
            alertText: "Job Updated!",
        };
    }
    if (action.type === EDIT_JOB_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: "danger",
            alertText: action.payload.msg,
        };
    }
    if (action.type === SHOW_STATS_BEGIN) {
        return { ...state, isLoading: true, showAlert: false };
    }
    if (action.type === SHOW_STATS_SUCCESS) {
        return { ...state, isLoading: false, ...action.payload };
    }

    if (action.type === CHANGE_PAGE) {
        return {
            ...state,
            page: action.payload.page,
        };
    }

    throw new Error(`no such action: ${action.type}`);
};
