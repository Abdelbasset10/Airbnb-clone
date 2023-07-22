import { prisma } from "@/lib/prisma";
import {NextRequest, NextResponse} from 'next/server'
import bcrypt from 'bcryptjs'

export const POST = async (req : NextRequest) => {
    try {
        const {email, name, password} = await req.json()
        
        if(!email || !name || !password){
            return new NextResponse(JSON.stringify({message:"Missing informations!"}),{status:400})
        }

        const isExistUser = await prisma.user.findUnique({
            where:{
                email
            }
        })

        if(isExistUser){
            return new NextResponse(JSON.stringify({message:"User already exists!"}),{status:400})
        }

        const hashedPassword = await bcrypt.hash(password,12)

        const newUser = await prisma.user.create({
            data:{
                name,
                email,
                hashedPassword
            }
        })

        return new NextResponse(JSON.stringify(newUser),{status:201})

    } catch (error : any) {
        console.log("[REGISTER_ERROR]",error)
        return new NextResponse(JSON.stringify(error.message),{status:500})
    }
}