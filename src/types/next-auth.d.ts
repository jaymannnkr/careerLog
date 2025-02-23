import "next-auth";
import "next-auth/jwt";
import { DefaultJWT } from "next-auth/jwt";

interface _JWT {
  /** OpenID ID Token */
  seq: number;
  name: string;
  org: string | null;
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends _JWT {}
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface JWT extends DefaultJWT, _JWT {}

  interface Session {
    token: JWT;
  }
}
