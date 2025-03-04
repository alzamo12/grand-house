import React, { createContext, useState } from 'react';
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from 'firebase/auth'

import { app } from '../firebase/firebase.config'
import axios from 'axios';

const auth = getAuth(app);
export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(true);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    };

    const logOut = async (auth) => {
        setLoading(true)
        await axios.get(`http://localhost:5000/logout`, {
            withCredentials: true
        })
        return signOut(auth)
    }

    const authInfo = {
        createUser,
        logOut,
        user,
        loading
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;