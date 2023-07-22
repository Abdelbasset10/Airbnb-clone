import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"


declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */interface JWT {
    /** OpenID ID Token */
    idToken?: string
}

  interface Session {
    user: {
      name:string,
      email:string,
      picture:string,
      id:string,
      token:string
    }
  }
}