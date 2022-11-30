import { CLEAR_ALERT, DISPLAY_ALERT } from "./actions";

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
    throw new Error(`no such action: ${action.type}`);
};
