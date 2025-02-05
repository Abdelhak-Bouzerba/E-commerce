import { createContext, useContext } from "react";

interface authContext{
    username: string | null;
    token: string | null;
    login: (username: string, token: string) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    myOrders: any[];
    isAuthenticated: boolean;
    logOut: () => void;
    getMyOrders: () => void;
}
export const AuthContext = createContext<authContext>({username:null , token:null, login:()=>{}, isAuthenticated:false,myOrders:[] , logOut:()=>{},getMyOrders:()=>{}});
export const useAuth = () => useContext(AuthContext)