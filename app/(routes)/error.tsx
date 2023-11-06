'use client'

import { useRouter } from "next/navigation"

const Error = () => {
    const router = useRouter()

    const handleRefresh = () => {
        router.refresh()
    }

    return (
        <div className="w-full h-[70vh] flex flex-col items-center justify-center " >
            <div className="flex flex-col items-center justify-center " >
                <h1 className="text-lg font-bold" >Ooops.</h1>
                <p className="text-neutral-500" >Something is wrong!</p>
                <button className="mt-2 bg-rose-500 hover:bg-rose-400 text-white px-4 py-2 rounded-lg" onClick={handleRefresh} >refresh</button>
            </div>
        </div>
    )
}

export default Error