import { createContext, useContext, useEffect, useState } from "react";
import Axios from "axios";

export const GlobalContext = createContext();

export function useGlobalContext() {
    return useContext(GlobalContext);
}

export default function GlobalContextProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token') || '')
    const [userId, setUserId] = useState(parseInt(localStorage.getItem('userId')) || '')

    const [errorsFromServer, setErrorsFromServer] = useState('');

    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [showLogInModal, setShowLogInModal] = useState(false);

    return (
        <GlobalContext.Provider value={{
            token,
            setToken,
            userId,
            setUserId,
            errorsFromServer,
            setErrorsFromServer,
            showSignUpModal,
            setShowSignUpModal,
            showLogInModal,
            setShowLogInModal
        }}>
            {children}
        </GlobalContext.Provider>
    );
}