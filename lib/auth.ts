import { prisma } from "./prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


export const authOptions : NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
          }),
          GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
          }),
        CredentialsProvider({
        name: "Credentials",
        credentials: {
            email: {
                label: "email",
                type: "text",
                placeholder: "Email...",
            },
            password: {
                label: "Password",
                type: "password",
            },
        },
        async authorize(credentials, req) {
            const {email,password} = credentials as any
            const user = await prisma.user.findUnique({
                    where:{
                    email
                    }
            })
            if(user){
                const userPassword = user.hashedPassword as string
                const isValidPassword = await bcrypt.compare(password,userPassword)
                if(!isValidPassword){
                throw new Error("Password incorrect!")
                }
                const token = jwt.sign({id:user.id,email:user.email},process.env.NEXTAUTH_SECRET as string,{expiresIn:"1d"})
                return {...user,token}
            }else{
                return null
            }
            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    callbacks: {
        async session({ session, token, user }) {
            session.user = token as any;
            return session;
        },
        async jwt({ token, user,account }) {
            if (user) {
            token = { ...token, ...user };
            }
            return token;
        },
    },
    pages: {
        signIn: "/",
    },
}

