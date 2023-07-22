
interface Props {
    title:string,
    subTitle:string
}

const Header = ({title,subTitle} : Props) => {
  return (
    <div>
        <h1 className='text-2xl font-semibold' >{title}</h1>
        <h3 className='text-neutral-400' >{subTitle}</h3>
    </div>
  )
}

export default Header