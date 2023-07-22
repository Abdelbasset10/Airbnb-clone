'use client'

import { useRouter } from "next/navigation"

const NotFound = () => {
    const router = useRouter()

    const handleRefresh = () => {
        router.back()
    }
    return (
        <div className="w-full h-screen flex items-center justify-center" >
                <div className="flex flex-col items-center justify-center " >
                    <h1 className="text-lg font-bold" >Not found.</h1>
                    <p className="text-neutral-500" >This page does not exists!</p>
                    <button className="mt-2 bg-rose-500 hover:bg-rose-400 text-white px-4 py-2 rounded-lg" onClick={handleRefresh} >goBack</button>
                </div>
            </div>
    )
}

export default NotFound