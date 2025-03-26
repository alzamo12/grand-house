import React, { createContext, useEffect, useState } from 'react';
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInAnonymously,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from 'firebase/auth'

import { app } from '../firebase/firebase.config'
import axios from 'axios';

const auth = getAuth(app);
export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(true);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    };

    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    };

    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    };

    const resetPassword = email => {
        setLoading(true)
        return sendPasswordResetEmail(auth, email)
    };

    const createGuestAccount = () => {
        setLoading(true)
        return signInAnonymously(auth);
    }

    const logOut = async () => {
        setLoading(true)
        await axios.get(`http://localhost:5000/logout`, {
            withCredentials: true
        })
        setLoading(false)
        return signOut(auth)
    };

    const updateUserProfile = async (name, photo) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })
    };

    // get token from server 
    const getToken = async email => {
        const { data } = await axios.post(
            `http://localhost:5000/jwt`,
            { email },
            { withCredentials: true }
        )
        return data
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            console.log(currentUser)
            if (currentUser) {
                getToken(currentUser.email)
            }
            setLoading(false)
        });

        return () => {
            return unsubscribe()
        }
    }, [])

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        signInWithGoogle,
        resetPassword,
        updateUserProfile,
        logOut,
        createGuestAccount,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;