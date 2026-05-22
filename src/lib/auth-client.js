import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL  
  // https://sportnest-server-srdb.onrender.com
})

export const { signIn, signUp, signOut, useSession } = authClient