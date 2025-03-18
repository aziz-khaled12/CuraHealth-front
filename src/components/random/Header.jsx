
const Header = ({title, subTitle}) => {
  return (
    <div className='mb-3'>
        <div className='text-primary font-bold text-4xl mb-2'>
            {title}
        </div>
        <div className='text-lg font-semibold text-darkText'>
            {subTitle}
        </div>
    </div>

  )
}

export default Header