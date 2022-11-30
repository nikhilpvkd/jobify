import React, { createContext, useContext, useReducer } from "react";
import { CLEAR_ALERT, DISPLAY_ALERT } from "./actions";
import { reducer } from "./reducer";

export const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: "",
    alertType: "",
};

const appContext = createContext();
const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const displayAlert = () => {
        dispatch({ type: DISPLAY_ALERT });
        clearAlert();
    };
    const clearAlert = () => {
        setTimeout(() => {
            dispatch({ type: CLEAR_ALERT });
        }, 3000);
    };
    return (
        <appContext.Provider value={{ ...state, displayAlert }}>
            {children}
        </appContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(appContext);
};

export default AppProvider;
