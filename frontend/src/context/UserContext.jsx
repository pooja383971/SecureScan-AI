import React, {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import api from "../services/api";

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    // ======================================
    // LOAD USER
    // ======================================

    const loadUser = async () => {

        try {

            setLoading(true);

            const token = localStorage.getItem("token");

            if (!token) {

                setUser(null);

                setLoading(false);

                return;

            }

            const response = await api.get("/users/profile", {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            });

            setUser(response.data);

            localStorage.setItem(

                "user",

                JSON.stringify(response.data)

            );

        }

        catch (err) {

            console.error(err);

            setError("Unable to load user.");

            setUser(null);

        }

        finally {

            setLoading(false);

        }

    };

    // ======================================
    // UPDATE USER
    // ======================================

    const updateUser = (updatedUser) => {

        setUser(updatedUser);

        localStorage.setItem(

            "user",

            JSON.stringify(updatedUser)

        );

    };

    // ======================================
    // LOGOUT
    // ======================================

    const logout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        setUser(null);

    };

    // ======================================
    // LOAD ON START
    // ======================================

    useEffect(() => {

        loadUser();

    }, []);

    return (

        <UserContext.Provider

            value={{

                user,

                loading,

                error,

                loadUser,

                updateUser,

                logout

            }}

        >

            {children}

        </UserContext.Provider>

    );

};

export const useUser = () => {

    return useContext(UserContext);

};

export default UserContext;