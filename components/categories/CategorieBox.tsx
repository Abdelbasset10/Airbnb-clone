'use client'

import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string'
import { IconType } from "react-icons";

interface Props {
    label:string,
    icon : IconType
}

const CategorieBox = ({label, icon:Icon} : Props) => {
    const router = useRouter()
    const params = useSearchParams()
    const category = params?.get('category');

    const handleQuery = () => {
        let currentQuery = {};
    
        if (params) {
          currentQuery = qs.parse(params.toString()) // get all queries
        } 
        const updatedQuery: any = {
            ...currentQuery,
            category: label
        } // add category query to the queries
    
        if (params?.get('category') === label) {
            delete updatedQuery.category;
        }
    
        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, { skipNull: true });

        router.push(url);
    }

    return (
        <div className={`flex flex-col items-center justify-center text-neutral-500 cursor-pointer hover:text-black ${category === label && "text-rose-500 border-b-[1px] border-b-rose-500"} `} onClick={handleQuery} >
            <Icon className='text-2xl' />
            <p>{label}</p>
        </div>
    )
}

export default CategorieBox