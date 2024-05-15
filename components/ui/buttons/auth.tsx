'use client'
import { signIn, signOut, useSession } from "next-auth/react"
import Cookie from 'js-cookie';
export const SignIn = () => {
    
    const { data: session } = useSession();
    if (session && session.user) {
        return <button onClick={() => {
            signOut();
            Cookie.get('user-session') && Cookie.remove('user-session');
        }}>
            Sign Out
        </button>
    }
    return <button onClick={() => {
        signIn()
    }}>
        Sign In
    </button>
}