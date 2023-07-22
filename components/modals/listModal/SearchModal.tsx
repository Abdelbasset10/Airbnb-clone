'use client'
import qs from 'query-string'
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
import { closeListning, closeSearch } from "@/redux/features/modalSlice"
import { DateRange, Range } from "react-date-range"
import {format} from 'date-fns'

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useRouter } from 'next/navigation'


enum STEPS {
    LOCATION = 0,
    COUNTER = 1,
    DATERANGE = 2,

}

const SearchModal = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const {isOpenSearch} = useAppSelector((state)=>state.modal)
    const [steps,setSteps] = useState(STEPS.LOCATION)
    const [loading,setLoading] = useState(false)
    const [location,setLocation] = useState<CountryInf>()
    const [guests,setGuests] = useState(1)
    const [rooms,setRooms] = useState(1)
    const [bathRooms,setBathrooms] = useState(1)
    const selectionRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      }
      const [dateRange,setDateRange] = useState<Range>(selectionRange)


    let header
    let body
    let button

    const handleBack = () => {
        if(steps !== STEPS.LOCATION){
            setSteps((prev) => prev - 1)
        }
    }

    const handleNext = async (e : any) => {
        e.preventDefault()
        if(steps !== STEPS.DATERANGE){
            setSteps((prev)=> prev + 1)
        }else{
            let query : any ={}

            if(location){
                query.location = location.label
            }
            if(rooms){
                query.rooms = rooms
            }
            if(bathRooms){
                query.bathrooms = bathRooms
            }
            if(guests){
                query.guests = guests
            }
            if(dateRange){
                const startDate = format(dateRange.startDate as Date, 'dd-MM-yyyy')
                const endDate = format(dateRange.endDate as Date, 'dd-MM-yyyy')
                query.startDate = startDate,
                query.endDate = endDate
            }

            const url = qs.stringifyUrl({
                url:'/',
                query
            })

            dispatch(closeSearch())
            router.push(url)

        }
    }

    if(steps === STEPS.LOCATION) {
        header = (
            <Header 
                title="Where do you wanna go?" 
                subTitle="Find the perfect!"
            />
        )
        const MapComp = dynamic(() => import("@/components/modals/listModal/MapComp"), {
            loading: () => <p>loading...</p>,
            ssr: false
        })
        body=(
            <div className="my-4" >
                <SelectComp value={location} onOk={(value : any)=>setLocation(value)} />
                    <div className="w-full my-4  h-64" >
                        {location ? (
                            <MapComp lat={location?.lat} long={location?.long} />
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
                    value={guests}
                    onChange = {(value : number)=>setGuests(value)}
                />
                <Counter 
                    title="Rooms" 
                    subTitle="How many rooms do you have?" 
                    isUnderline={true}
                    value={rooms}
                    onChange = {(value : number)=>setRooms(value)}
                />
                <Counter 
                    title="Bathrooms" 
                    subTitle="How many bathrooms do you have?" 
                    isUnderline={false} 
                    value={bathRooms}
                    onChange = {(value : number)=>setBathrooms(value)}
                />
            </div>
        )  
    }

    if(steps === STEPS.DATERANGE) {
        header = (
            <Header 
                title="When do you plan to go?" 
                subTitle="Make sure everyone is free!"
            />
        )
        
        body=(
            <div className="my-4 overflow-hidden" >
                <DateRange 
                    ranges={[dateRange]} 
                    minDate={new Date()}
                    date={new Date()}
                    showDateDisplay={false}
                    direction="vertical"
                    onChange={(value)=>setDateRange(value.selection)}
                   
                />
            </div>
        )
    }

    button = (
        <div className="flex gap-4" >
            {steps !== STEPS.LOCATION && (
                <button className={`relative py-2 w-full ${loading ? "bg-black text-white" : "bg-white text-black"} flex items-center justify-center   hover:bg-black hover:text-white rounded-lg border-black border-[1px]`} onClick={handleBack} >Back</button>
            )}
            <button className={`relative py-2 w-full flex items-center justify-center ${loading ? "bg-black hover:bg-beutral-700 border-neutral-700" : "bg-rose-500 hover:bg-rose-400 border-rose-500"} text-white hover:bg-rose-400 rounded-lg `} onClick={handleNext} >Continue</button>

        </div>
    )




    return (
        <Modal 
            isOpen={isOpenSearch}
            name="Filters"
        >
            {header}
            {body}
            {button}
        </Modal>
    )
}

export default SearchModal