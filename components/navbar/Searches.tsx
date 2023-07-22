'use client'

import { openSearch } from '@/redux/features/modalSlice'
import { useAppDispatch } from '@/redux/hooks'
import {FaSearch} from 'react-icons/fa'

const Searches = () => {
    const dispatch = useAppDispatch()

    const handleOpenSearchModal = () => {
        dispatch(openSearch())
    }
    
    return (
        <div className="flex items-center gap-4 rounded-xl shadow-sm border-[1px] px-4 py-2 cursor-pointer hover:shadow-lg" onClick={handleOpenSearchModal} >
            <div className="border-r-[1px] px-2 hidden lg:block" >
                <p className='font-semibold' >Any Where</p>
            </div>
            <div className="border-r-[1px] px-2 hidden md:block">
                <p className='font-semibold' >Any Week</p>
            </div>
            <div className="px-2 flex items-center gap-2" >
                <p className='text-neutral-500' >Add Guests</p>
                <div className='w-8 h-8 rounded-full flex items-center justify-center bg-rose-500' >
                    <FaSearch className='text-white' />
                </div>
            </div>

        </div>
    )
}

export default Searches