import Link from 'next/link'

const RedFontNavItem = ({ title, route }) => {
   return (
      <div className='my-1'>
         <Link href={ route }>
            <a className='cursor-pointer hover:text-red-700'>{ title }</a>
         </Link>
      </div>
    );
}
 
export default RedFontNavItem;