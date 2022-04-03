import { createContext, useContext, useEffect, useState } from 'react';
import firebaseApp from '../firebaseConfig';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { gql } from "@apollo/client"
import apolloClient from "apolloClient"

const AuthContext = createContext();

export const useAuth = e => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    const login = (email, password) => {
        return signInWithEmailAndPassword(getAuth(firebaseApp), email, password);
    }

    const logout = e => {
        getAuth(firebaseApp).signOut();
        setUserData(null);
    }

    const getUser = async e => {
        return getAuth(firebaseApp).currentUser;
    }

    const getUserData = async e => {
        if (getUser()) {

            const selectedUserQuery = gql`
            query {
                alumniLists (where: {
                    currentEmail: "${getAuth(firebaseApp).currentUser.email}"
                }) {
                    surname
                    givenName
                    alumniDisplayPhoto { url }
                }
            }
        `

            const { data } = await apolloClient.query({
                query: selectedUserQuery
            })

            setUserData(data.alumniLists[0])

            return data.alumniLists[0]
        }

    }

    useEffect(e => {
        const unsub = getAuth(firebaseApp).onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
            if (user) getUserData();
        });
        return unsub;
    }, [])

    const user = {
        currentUser,
        loading,
        login,
        logout,
        getUser,
        userData,
        getUserData
    }

    return (
        <AuthContext.Provider value={user}>
            {(!loading) && children}
        </AuthContext.Provider>
    )
} 