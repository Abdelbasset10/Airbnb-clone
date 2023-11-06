'use client'

import { closeAuthModal, openLogin, openRegister } from '@/redux/features/modalSlice'
import { useAppDispatch } from '@/redux/hooks'
import { signIn } from 'next-auth/react'
import { useEffect, useState } from 'react'
import {FaTimes, FaGithub} from 'react-icons/fa'
import {FcGoogle} from 'react-icons/fc'


interface Props {
  open:boolean
  name:"login" | "register",
  title:string,
  subTitle:string,
  children:React.ReactNode,
}

const Modal = ({open,name,title,subTitle,children} : Props) => {
  const dispatch = useAppDispatch()

  const [isMounted,setIsMounted] = useState(false)

  useEffect(()=>{
    setIsMounted(true)
  },[])

  const handleCloseAuthModal = () => {
    dispatch(closeAuthModal())
  }

  const handleSwitchAuthModals = () => {
    if(name === "login") {
      dispatch(openRegister())
    }else {
      dispatch(openLogin())
    }
  }

  // const googleSignIn = async () => {
  //   const result = await signIn("google")
  //   console.log(result)
  // }

  // const githubSignIn = async () => {
  //   await signIn("github")
  // }

  if(!isMounted){
    return null
  }

  if(!open){
    return null
  }

  return (
    <div className='fixed top-0 left-0 z-20 w-full h-screen bg-neutral-800/70' >
      <div className='my-10 w-11/12  sm:w-8/12 md:w-6/12 max-h-[90%] overflow-y-auto mx-auto bg-white rounded-lg py-4' >
        <div className='flex items-center p-4' >
          <FaTimes className='text-2xl text-neutral-600 cursor-pointer' onClick={handleCloseAuthModal} />
          <h1 className='flex-1 text-center text-xl font-bold text-neutral-600' >{name}</h1>      
        </div>
        <hr />
        <div className='p-4' >
          <div>
            <h1 className='text-2xl font-semibold' >{title}</h1>
            <h3 className='text-neutral-400' >{subTitle}</h3>
          </div>
          {children}
          {/* <hr />
          <div className='my-4 flex flex-col gap-4' >
            <button className='relative py-2 w-full flex items-center justify-center border-[2px] rounded-lg hover:border-rose-500 border-black' onClick={googleSignIn} >
              <FcGoogle className='absolute left-8 top-0 bottom-0 my-auto text-2xl' />
              <p className='text-lg font-bold' >Continue with Google</p>
            </button>
            <button className='relative py-2 w-full flex items-center justify-center border-[2px] rounded-lg hover:border-rose-500 border-black' onClick={githubSignIn} >
              <FaGithub className='absolute left-8 top-0 bottom-0 my-auto text-2xl' />
              <p className='text-lg font-bold' >Continue with Github</p>
            </button>
          </div>  */}
        </div>
        <hr/>
        <div className='flex items-center justify-center gap-2 mt-4' >
          <p className='text-neutral-500' >{name === "login" ? "First time using Airbnb?" : "Already have an account?"}</p>
          <p className='hover:underline text-neutral-600 cursor-pointer' onClick={handleSwitchAuthModals} >{name === "login" ? "Create an account" : "Log in"}</p>
        </div>
        

      </div>

    </div>
  )
}

export default Modal