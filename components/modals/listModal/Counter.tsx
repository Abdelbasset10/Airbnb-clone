import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface Props {
    title:string,
    subTitle:string
    isUnderline:boolean
    value:number
    onChange : (value : number)=> void
}


const Counter = ({title,subTitle, isUnderline, value, onChange} : Props) => {

    const handleIncrease = () => {
        onChange(value + 1)
    }

    const handleDecrease = () => {
        if(value === 1){
            return
        }
        onChange(value - 1)
    }

    return (
        <div className={`flex items-center justify-between ${isUnderline && "border-b-[1px]"} pb-4`} >
            <div>
                <h1 className='text-lg font-semibold' >{title}</h1>
                <h3 className='text-neutral-400' >{subTitle}</h3>
            </div>
            <div className="flex items-center gap-2" >
                <div className="w-8 h-8 rounded-full border-[1px] border-neutral-500 flex justify-center items-center cursor-pointer hover:border-rose-500" onClick={handleDecrease} >
                    <AiOutlineMinus />
                </div>
                <p>{value}</p>
                <div className="w-8 h-8 rounded-full border-[1px] border-neutral-500 flex justify-center items-center cursor-pointer hover:border-rose-500" onClick={handleIncrease} >
                    <AiOutlinePlus />
                </div>
                
            </div>
        </div>
    )
}

export default Counter