import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import { fetchUsers } from "../services/UserService";

const UserContext = createContext();

export function UserProvider({ children }) {

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        const initializeUsers = async () => {

            try {

                const savedUsers =
                    localStorage.getItem("users");

                if (savedUsers) {

                    setUsers(JSON.parse(savedUsers));

                } else {

                    const apiUsers =
                        await fetchUsers();

                    setUsers(apiUsers);

                    localStorage.setItem(
                        "users",
                        JSON.stringify(apiUsers)
                    );

                }

            }

            catch (err) {

                setError(err.message);

            }

            finally {

                setLoading(false);

            }

        };

        initializeUsers();

    }, []);

    useEffect(() => {

        if (users.length > 0) {

            localStorage.setItem(
                "users",
                JSON.stringify(users)
            );

        }

    }, [users]);

    return (

        <UserContext.Provider
            value={{
                users,
                setUsers,
                loading,
                error
            }}
        >

            {children}

        </UserContext.Provider>

    );

}

export const useUsers = () =>
    useContext(UserContext);