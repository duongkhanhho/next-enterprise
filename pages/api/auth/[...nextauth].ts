import { gql, GraphQLClient } from "graphql-request"
import type { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
// import GoogleProvider from "next-auth/providers/google"

// import { toast } from '@/ui/toast';

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    //  GoogleProvider({
    //    clientId: process.env.GOOGLE_ID,
    //    clientSecret: process.env.GOOGLE_SECRET
    //  }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "jsmith",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        const { username, password } = credentials as any

        const res = await fetch("https://reqres.in/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: username,
            password,
          }),
        })

        // Add logic here to look up the user from the credentials supplied
        const user = await res.json()

        if (res.ok && user) {
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // @TODO NEED USER OBJ!!!
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.user = token

      return session
    },
  },

  pages: {
    signIn: "/auth/login",
  },
}

export default NextAuth(authOptions)
