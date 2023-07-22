import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import {useState} from 'react'
import { TbPhotoPlus } from 'react-icons/tb'


interface Props {
    image:string
    uploadImg : (value : string) => void
}

const UploadImg = ({image, uploadImg} : Props) => {
    

    const handleUpload = (result:any) => {
        uploadImg(result?.info?.secure_url)
    }
    return (
        <CldUploadWidget onUpload={handleUpload} uploadPreset="uiitvliw">
            {({ open }) => {
                function handleOnClick() {
                open();
                }
                return (
                <div onClick={handleOnClick} className='cursor-pointer my-4 flex items-center justify-center w-full h-48 border-[1px] border-dotted border-neutral-500' >
                    {image ? (
                        <div className='w-full h-48 relative ' >
                            <Image src={image} fill alt='list image' className='object-cover' />

                        </div>
                    ) : (
                        <div className='flex flex-col items-center' >
                            <TbPhotoPlus className='text-3xl text-neutral-500'/>
                            <p className='text-neutral-500' >Click to upload</p>
                        </div>
                    )}
                </div>
                );
            }}
        </CldUploadWidget>
    )
}

export default UploadImg