'use client'

import { closeListning } from "@/redux/features/modalSlice"
import { useAppDispatch } from "@/redux/hooks"
import { FaTimes } from "react-icons/fa"


interface Props {
    isOpen:boolean,
    name:string,
    children : React.ReactNode
}

const Modal = ({isOpen,name,children} : Props) => {
    const dispatch = useAppDispatch()

    const handleCloseListingModal = () => {
        dispatch(closeListning())
    }

    if(!isOpen){
        return null
    }

    return (
        <div className='fixed top-0 left-0 z-20 w-full h-screen bg-neutral-800/70' >
            <div className='my-10 w-11/12  sm:w-8/12 md:w-6/12 max-h-[90%] overflow-y-auto mx-auto bg-white rounded-lg py-4' >
                <div className='flex items-center p-4' >
                    <FaTimes className='text-2xl text-neutral-600 cursor-pointer' onClick={handleCloseListingModal} />
                    <h1 className='flex-1 text-center text-xl font-bold text-neutral-600' >{name}</h1>
                </div>
                <hr />
                <div className="p-4" >
                    {children}
                </div>
            </div>
            
        </div>
    )
}

export default Modal