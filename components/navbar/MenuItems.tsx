'use client'

import { openListning, openLogin, openRegister } from '@/redux/features/modalSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import Image from 'next/image'
import { useState } from 'react'
import {FaBars} from 'react-icons/fa'

import {signOut} from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface Props {
    userId : string | undefined
    picture : string | undefined
}

const MenuItems = ({userId, picture} : Props) => {
    const router = useRouter()
    const dispatch = useAppDispatch()

    const [openMenu,setOpenMenu] = useState(false)

    const switchMenu = () => {
        setOpenMenu((prev)=>!prev)
    }

    const handleOpenLogin = () => {
        dispatch(openLogin())
    }

    const handleOpenRegister = () => {
        dispatch(openRegister())
    }

    const handleOpenListingModal = () => {
        if(userId){
            dispatch(openListning())
        }else{
            dispatch(openLogin())
        }
    }

    const handleLogOut = async () => {
        await signOut()
    }

  return (
    <div className="flex items-center gap-2" >
        <p className="hidden sm:block px-4 py-2 hover:bg-neutral-100 cursor-pointer rounded-2xl font-semibold" onClick={handleOpenListingModal} >Airbnb your home</p>
        <div className="relative border-[1px] rounded-2xl px-2 py-1 cursor-pointer" onClick={switchMenu} >
            <div className='flex items-center gap-2' >
                <FaBars />
                <Image src={picture ? picture : "/images/user.jpg"} width={30} height={30} alt='user image' className='rounded-full' />
            </div>
            {openMenu && (
                userId ? (
                    <div className='absolute top-12 w-48 right-0 z-50  flex flex-col items-start  shadow-sm rounded-lg bg-white border-[1px] border-neutral-200'>
                        <button className='hover:bg-neutral-100 w-full text-left px-4 py-2' onClick={()=>router.push('/trips')} >My trips</button>
                        <button className='hover:bg-neutral-100 w-full text-left px-4 py-2' onClick={()=>router.push('/favorites')}>My favorites</button>
                        <button className='hover:bg-neutral-100 w-full text-left px-4 py-2' onClick={()=>router.push('/reservations')}>My reservations</button>
                        <button className='hover:bg-neutral-100 w-full text-left px-4 py-2' onClick={()=>router.push('/properties')}>My properties</button>
                        <button className='hover:bg-neutral-100 w-full text-left px-4 py-2' onClick={handleLogOut}>Logout</button>
                    </div>
                ) : (
                    <div className='absolute top-12 w-48 right-0  z-50 flex flex-col items-start  shadow-sm rounded-lg bg-white border-[1px] border-neutral-200' >
                        <button className='hover:bg-neutral-100 w-full text-left px-4 py-2' onClick={handleOpenLogin} >Login</button>
                        <button className='hover:bg-neutral-100 w-full text-left px-4 py-2' onClick={handleOpenRegister}>Register</button>
                    </div>
                )
            )}
        </div>
    </div>
  )
}

export default MenuItems