'use client'

import {signIn} from 'next-auth/react'

import Modal from "@/components/modals/authModal/Modal"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { ChangeEvent, FormEvent, useState } from "react"
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { closeAuthModal } from '@/redux/features/modalSlice'


const LoginModal = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const {isOpenLogin} = useAppSelector((state)=>state.modal)

  const [userInfo,setUserInfo] = useState({
    email:"",
    password:""
  })

  const [loading,setLoading] = useState(false)

  const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
    setUserInfo({...userInfo,[e.target.name] : e.target.value})
  }

  const handleSubmit = async (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await signIn("credentials",{
        email:userInfo.email,
        password:userInfo.password,
        redirect:false
      })
      if(res?.ok && !res?.error){
        toast.success("Logged in!")
        dispatch(closeAuthModal())
        router.refresh()
      }
      if(res?.error){
        toast.error(res?.error)
      }
    } catch (error : any) {
      toast.error(error.message)
      console.log(error)
    }finally{
      setLoading(false)
    }
  }

  return (
    <Modal
      open={isOpenLogin}
      name="login"
      title="Welcome back"
      subTitle="Login to your account!"
    >
      <form className="flex flex-col gap-4 my-4" onSubmit={handleSubmit} >
        <input 
          type="email" 
          placeholder="Email" 
          name="email"
          value={userInfo.email}
          onChange={handleChange}
          disabled={loading}
          className="h-16 px-2 w-full border-[1px] border-neutral-500 rounded-lg outline-none"
        />
        <input 
          type="password" 
          placeholder="Password" 
          name="password"
          value={userInfo.password}
          onChange={handleChange}
          disabled={loading}
          className="h-16 px-2 w-full border-[1px] border-neutral-500 rounded-lg outline-none"
        />
         <button disabled={loading} className={`relative py-2 w-full flex items-center justify-center ${loading ? "bg-black hover:bg-neutral-700 border-neutral-700" : "bg-rose-500 hover:bg-rose-400 border-rose-500"} text-white  rounded-lg `} >Continue</button>
      </form>
    </Modal>
  )
}

export default LoginModal