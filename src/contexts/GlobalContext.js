import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const GlobalContext = createContext();

export function useGlobalContext() {
    return useContext(GlobalContext);
}

export default function GlobalContextProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token') || '')
    const [userId, setUserId] = useState(parseInt(localStorage.getItem('userId')) || '')

    const [user, setUser] = useState({});

    const getUser = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/user/${userId}`, { headers: { Authorization: `Bearer ${token}` } });
            if (response.data.data > 0) {
                setUser(response.data.data)
            } else {
                setUser({})
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getUser()
    }, [token])

    const [errorsFromServer, setErrorsFromServer] = useState('');

    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [showLogInModal, setShowLogInModal] = useState(false);

    return (
        <GlobalContext.Provider value={{
            token,
            setToken,
            userId,
            setUserId,
            user,
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