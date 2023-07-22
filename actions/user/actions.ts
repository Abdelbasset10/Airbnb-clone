import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export const getCurrentUser = async () => {
    try {
        const session = await getServerSession(authOptions)
        if(!session?.user){
            return null
        }
        const user = await prisma.user.findUnique({
            where:{
                id:session.user.id
            }
        })

        if(!user){
            console.log("User does not exists")
            return null
        }

        return user
    } catch (error) {
        console.log(error)
    }
}

export const getUser = async (userId : string) => {
    try {
        const user = await prisma.user.findUnique({
            where:{
                id:userId
            }
        })
        if(!user){
            return null
        }else{
            return user
        }
    } catch (error) {
        console.log(error)
    }
}