'use client'

import CategorieBox from '@/components/categories/CategorieBox';
import { categories } from '@/components/categories/data';




const Categories = () => {
    return (
        <div className='flex px-8 sm:px-16 items-center py-4 gap-8 overflow-y-auto w-full' >
            {categories.map((category,index)=>(
                <CategorieBox key={index} label={category.label} icon={category.icon} />
            ))}
        </div>
    )
}

export default Categories