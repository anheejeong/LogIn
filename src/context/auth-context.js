import React, { useState, useEffect } from "react";

// context object 생성
const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => { }, //IDE 자동완성을 위함
    onLogin: (email, password) => { }
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // 무한 루프 가능 => useEffect 필요
        const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

        if (storedUserLoggedInInformation === '1') {
            setIsLoggedIn(true);
        }
    }, []);

    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn')
        setIsLoggedIn(false);
    }

    const loginHanlder = () => {
        localStorage.setItem('isLoggedIn', '1');
        setIsLoggedIn(true);
    }

    return <AuthContext.Provider
        value={
            {
                isLoggedIn: isLoggedIn,
                onLogout: logoutHandler,
                onLogin: loginHanlder
            }}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;