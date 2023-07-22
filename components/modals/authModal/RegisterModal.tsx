'use client'

import Modal from "@/components/modals/authModal/Modal"
import { openLogin } from "@/redux/features/modalSlice"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { ChangeEvent, FormEvent, useState } from "react"
import  toast  from "react-hot-toast"


const RegisterModal = () => {
  const dispatch = useAppDispatch()
  const {isOpenRegister} = useAppSelector((state)=>state.modal)

  const [userInfo,setUserInfo] = useState({
    email:"",
    name:"",
    password:""
  })
  const [loading,setLoading] = useState(false)

  const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
    setUserInfo({...userInfo,[e.target.name] : e.target.value})
  }

  const handleSubmit = async (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(!userInfo.email || !userInfo.name || !userInfo.password){
      toast.error("Missing informations!")
    }
    try {
      setLoading(true)
      const response = await fetch(`https://abdelbasset-airbnb-rjvfrs8or-abdelbasset10.vercel.app/api/register`,{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      body: JSON.stringify(userInfo), 
      })
      const res = await response.json()
        if(response.status === 201) {
          toast.success("Registred succefully!")
          dispatch(openLogin())
        }        
    } catch (error : any) {
      toast.error(error.message)
      console.log(error)
    }finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      open={isOpenRegister}
      name="register"
      title="Welcome to Airbnb"
      subTitle="Create an account!"
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
          type="text" 
          placeholder="Name" 
          name="name"
          value={userInfo.name}
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
        <button disabled={loading} className={`relative py-2 w-full flex items-center justify-center text-white ${loading ? "bg-black border-neutral-700 hover:bg-neutral-700" : "bg-rose-500  border-rose-500 hover:bg-rose-400"}  rounded-lg  `} >Continue</button>
      </form>
    </Modal>
  )
}

export default RegisterModal