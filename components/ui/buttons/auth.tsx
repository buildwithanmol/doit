'use client'
import { signIn, signOut, useSession } from "next-auth/react"

export const SignIn = () => {
    const { data: session } = useSession();
    if (session && session.user) {
        return <button onClick={() => {
            signOut();
        }}>
            Sign Out
        </button>
    }
    return <button onClick={() => {
        signIn().then(() => {

        })
    }}>
        Sign In
    </button>
}