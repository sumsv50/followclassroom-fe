import { useState, createContext } from "react";

const UserRoleContext = createContext();

const initUserRole = '';

const UserRoleProvider = ({ children }) => {
    const [userRole, setUserRole] = useState(initUserRole);

    return (
        <UserRoleContext.Provider value={{ userRole, setUserRole }} >
            {children}
        </UserRoleContext.Provider>
    )
}

export { UserRoleContext, UserRoleProvider };