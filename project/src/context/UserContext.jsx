import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from "firebase/firestore";

import { db } from "../services/firebase";

import { fetchUsers } from "../services/UserService";

const UserContext = createContext();

export function UserProvider({ children }) {

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);
    const [history, setHistory] = useState(() => {
    return JSON.parse(localStorage.getItem("history")) || [];
    });
    const [error, setError] = useState("");

    useEffect(() => {

        const initializeUsers = async () => {

            try {

                try {

    const snapshot = await getDocs(
        collection(db, "developers")
    );

    if (!snapshot.empty) {

        const firebaseUsers = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        setUsers(firebaseUsers);

        localStorage.setItem(
            "users",
            JSON.stringify(firebaseUsers)
        );

    } else {

        const savedUsers =
            localStorage.getItem("users");

        if (savedUsers) {

            setUsers(JSON.parse(savedUsers));

        } else {

            const apiUsers = await fetchUsers();

for (const user of apiUsers) {

    const { id, ...userData } = user;

    await addDoc(
        collection(db, "developers"),
        userData
    );

}

const snapshot = await getDocs(
    collection(db, "developers")
);

const firebaseUsers = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
}));

setUsers(firebaseUsers);

localStorage.setItem(
    "users",
    JSON.stringify(firebaseUsers)
);

        }

    }

}
catch {

    const savedUsers =
        localStorage.getItem("users");

    if (savedUsers) {

        setUsers(JSON.parse(savedUsers));

    }

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
    localStorage.setItem(
        "history",
        JSON.stringify(history)
    );
    }, [history]);
    useEffect(() => {

        if (users.length > 0) {

            localStorage.setItem(
                "users",
                JSON.stringify(users)
            );

        }
        

    }, [users]);
    const addHistory = async (record) => {

    try {

        await addDoc(

            collection(db, "editHistory"),

            record

        );

    }
    catch (error) {

        console.error(error);

    }

    setHistory(prev => [

        record,

        ...prev

    ]);

};
const addUser = async (newUser) => {

    try {

        const docRef = await addDoc(
            collection(db, "developers"),
            newUser
        );

       const savedUser = {

    id: docRef.id,

    ...newUser

};

setUsers(prev => [

    ...prev,

    savedUser

]);

    } catch {

        console.log("Firebase unavailable.");

    }

    
};
const updateUser = async (id, updatedUser) => {

    try {

        await updateDoc(

            doc(db, "developers", id),

            updatedUser

        );

    } catch {

        try {

    await updateDoc(
        doc(db, "developers", id),
        updatedUser
    );

}
catch {

    console.log("Firebase unavailable.");

}

setUsers(prev =>

    prev.map(user =>

        user.id === id

            ? {

                ...user,

                ...updatedUser

            }

            : user

    )

);

    }

    setUsers(prev =>

        prev.map(user =>

            user.id === id

                ? {
                    ...user,
                    ...updatedUser
                }

                : user

        )

    );

};
const deleteUser = async (id) => {

    try {

        await deleteDoc(
            doc(db, "developers", id)
        );

    } catch {

        console.log("Firebase unavailable.");

    }

    setUsers(prev =>

        prev.filter(user =>

            user.id !== id

        )

    );

};
    return (

        <UserContext.Provider
            value={{
    users,
    history,
    addHistory,
    addUser,
    updateUser,
    deleteUser,
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