import { createContext, useContext } from "react";

interface authContext{
    username: string | null,
    token: string | null,
    login: (username: string , token:string) => void;
}
export const AuthContext = createContext<authContext>({username:null , token:null, login:()=>{}});
export const useAuth = () => useContext(AuthContext)