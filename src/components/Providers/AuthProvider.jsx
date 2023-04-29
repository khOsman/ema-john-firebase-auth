import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import firebaseApp from '../../firebase/firebase.config';


export const AuthContext = createContext(null);

//firebase auth instance
const auth = getAuth(firebaseApp);

const AuthProvider = ({children}) => {

    const [user,setUser]=useState(null);

    const createUser = (email,password)=>{
        return createUserWithEmailAndPassword(auth,email,password);
    }

    const signIn = (email,password)=>{
        return signInWithEmailAndPassword(auth,email,password);
    }

    const logOut = ()=>{
        return signOut(auth);
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,curUser =>{
            setUser(curUser);
            console.log('AuthState',curUser);
        });

        //stop observing while unmounting
        return ()=>{
            return unsubscribe();
        }
    },[]);


    const authInfo ={
        user,
        createUser,
        signIn,
        logOut,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;