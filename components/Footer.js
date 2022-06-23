import RedFontNavItem from './RedFontNavItem'
const Footer = () => {
   return ( 
      <nav className='p-6 text-center bg-gray-100
                      font-jua text-lg'>
         <RedFontNavItem title='Credits' route='/credits' />
      </nav>
    );
}
 
export default Footer;