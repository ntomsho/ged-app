import { useContext, createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";
// @ts-ignore
import { auth } from '../firebase';

interface IAuth {
    googleSignIn: Function,
    logout: Function,
    user: User | null
};

const AuthContext = createContext<IAuth>({ googleSignIn: () => {}, logout: () => {}, user: null });

export const AuthContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
    }

    const logout = () => {
        signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser!);
            console.log('User: ', currentUser);
        });
        return () => {
            unsubscribe();
        }
    }, []);
    
    return (
        <AuthContext.Provider value={{ googleSignIn, logout, user }}>
            {children}
        </AuthContext.Provider>
    )
}


export const UserAuth = () => {
    return useContext(AuthContext);
}