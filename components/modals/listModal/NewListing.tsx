'use client'

import Modal from "@/components/modals/listModal/Modal"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { FormEvent, MouseEventHandler, useState } from "react"
import Header from "@/components/modals/listModal/Header"
import { categories } from "@/components/categories/data"
import Counter from "./Counter"
import UploadImg from "./UploadImg"
import SelectComp from "./SelectComp"
import dynamic from "next/dynamic"
import { CountryInf } from "@/types"
import toast  from "react-hot-toast"
import { closeListning } from "@/redux/features/modalSlice"


enum STEPS {
    CATEGORIES = 0,
    LOCATION = 1,
    COUNTER = 2,
    IMAGE = 3,
    DESCRIPTION = 4,
    PRICE = 5
}

const NewListing = () => {
    const dispatch = useAppDispatch()
    const {isOpenListing} = useAppSelector((state)=>state.modal)
    const [steps,setSteps] = useState(STEPS.CATEGORIES)
    const [loading,setLoading] = useState(false)
    const [listInfo,setListInfo] = useState({
        title:""
        ,description:""
        ,imageSrc:""
        ,category:""
        ,roomCount:1
        ,bathroomCount:1
        , guestCount:1
        ,price:1
    })
    const [locationValue,setLocationValue] = useState<CountryInf | null>(null)


    let header
    let body
    let button

    const handleBack = () => {
        if(steps !== STEPS.CATEGORIES){
            setSteps((prev) => prev - 1)
        }
    }

    const handleNext = async (e : any) => {
        e.preventDefault()
        if(steps !== STEPS.PRICE){
            setSteps((prev)=> prev + 1)
        }else{
            if(!listInfo.bathroomCount || !listInfo.category || !listInfo.description || !listInfo.guestCount || !listInfo.imageSrc || !locationValue || !listInfo.price || !listInfo.roomCount || !listInfo.title){
                toast.error("Missing informations!")
                return
            }
            try {
                setLoading(true)
                const res = await fetch(`https://abdelbasset-airbnb-rjvfrs8or-abdelbasset10.vercel.app/api/listing`,{
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({...listInfo,locationValue})
            })
            toast.success("List created!")
            dispatch(closeListning())
            setListInfo({
                title:""
                ,description:""
                ,imageSrc:""
                ,category:""
                ,roomCount:1
                ,bathroomCount:1
                , guestCount:1
                ,price:1
            })
            setLocationValue(null)
            setSteps(STEPS.CATEGORIES)
            } catch (error :any ) {
                toast.error(error.message)
            }
            finally {
                setLoading(false)
            }
        }
    }

    

    if(steps === STEPS.CATEGORIES){
        header = (
            <Header 
                title="Which of these best describes your place?"
                subTitle="Pick a category"
            />
        )
        body = (
            <div className="grid grid-cols-2 gap-4 overflow-y-auto  my-4 max-h-80  " >
                {categories.map((category,index)=> (
                    <div key={index} className={`flex flex-col gap-1 p-4 border-[1px] ${listInfo.category === category.label ? "border-rose-500" : "border-neutral-500"} rounded-lg cursor-pointer hover:border-rose-500`} onClick={()=>setListInfo({...listInfo,category:category.label})} >
                        <p>{category.label}</p>
                    </div>
                ))}
            </div>
        )  
    }

    if(steps === STEPS.LOCATION) {
        header = (
            <Header 
                title="Where is your place located?" 
                subTitle="Help guests find you!"
            />
        )
        const MapComp = dynamic(() => import("@/components/modals/listModal/MapComp"), {
            loading: () => <p>loading...</p>,
            ssr: false
        })
        body=(
            <div className="my-4" >
                <SelectComp value={locationValue} onOk={(value : any)=>setLocationValue(value)} />
                    <div className="w-full my-4  h-64" >
                        {locationValue ? (
                            <MapComp lat={locationValue?.lat} long={locationValue?.long} />
                        ) : (
                            <div className="bg-neutral-200 w-full h-full"  >

                            </div>
                        )}
                    </div>
            </div>
        )
    }

    if(steps === STEPS.COUNTER){
        header = (
            <Header 
                title="Share some basics about your place"
                subTitle="What amenties do you have"
            />
        )
        body = (
            <div className="flex flex-col gap-4 my-4" >
                <Counter 
                    title="Guests" 
                    subTitle="How many guests do you allow?" 
                    isUnderline={true}
                    value={listInfo.guestCount}
                    onChange = {(value : number)=>setListInfo({...listInfo,guestCount:value})}
                />
                <Counter 
                    title="Rooms" 
                    subTitle="How many rooms do you have?" 
                    isUnderline={true}
                    value={listInfo.roomCount}
                    onChange = {(value : number)=>setListInfo({...listInfo,roomCount:value})}
                />
                <Counter 
                    title="Bathrooms" 
                    subTitle="How many bathrooms do you have?" 
                    isUnderline={false} 
                    value={listInfo.bathroomCount}
                    onChange = {(value : number)=>setListInfo({...listInfo,bathroomCount:value})}
                />
            </div>
        )  
    }

    if(steps === STEPS.IMAGE){
        header = (
            <Header 
                title="Add a photo of your place"
                subTitle="Show your guests what your place looks like!"
            />
        )

        body = (
            <UploadImg image={listInfo.imageSrc} uploadImg={(value : string)=>setListInfo({...listInfo,imageSrc:value})} />
        )
    }

    if(steps === STEPS.DESCRIPTION){
        header = (
            <Header 
                title="How would you describe your place?"
                subTitle="Short and sweet works best!"
            />
        )
        body = (
            <form className="flex flex-col gap-8 my-4" >
                <input type="text" placeholder="Title" className="w-full h-10 outline-none p-2 border-[1px] border-neutral-500 focus:border-rose-500 rounded-md" value={listInfo.title} onChange={(e)=>setListInfo({...listInfo,title:e.target.value})} />
                <textarea rows={2} placeholder="Description" className="w-full outline-none p-2 border-[1px] border-neutral-500 focus:border-rose-500 rounded-md" value={listInfo.description} onChange={(e)=>setListInfo({...listInfo,description:e.target.value})} ></textarea>
            </form>
        )
    }

    if(steps === STEPS.PRICE){
        header = (
            <Header 
                title="Now,set your price"
                subTitle="How much do you charge par night?"
            />
        )
        body = (
            <form className="8 my-4" >
                <input type="number" placeholder="Price" className="w-full h-10 outline-none p-2 border-[1px] border-neutral-500 focus:border-rose-500 rounded-md" value={listInfo.price} onChange={(e)=>setListInfo({...listInfo,price:Number(e.target.value)})} />
            </form>
        )
    }

    button = (
        <div className="flex gap-4" >
            {steps !== STEPS.CATEGORIES && (
                <button className={`relative py-2 w-full ${loading ? "bg-black text-white" : "bg-white text-black"} flex items-center justify-center   hover:bg-black hover:text-white rounded-lg border-black border-[1px]`} onClick={handleBack} >Back</button>
            )}
            <button className={`relative py-2 w-full flex items-center justify-center ${loading ? "bg-black hover:bg-neutral-700 border-neutral-700" : "bg-rose-500 hover:bg-rose-400 border-rose-500"} text-white  rounded-lg `} onClick={handleNext} >Continue</button>

        </div>
    )




    return (
        <Modal 
            isOpen={isOpenListing}
            name="Airbnb your home"
        >
            {header}
            {body}
            {button}
        </Modal>
    )
}

export default NewListing