import Navbar from './Navbar.js'
import Footer from './Footer'


const Layout = ( {children} ) => {
   return ( 
      <div className='content'>
         <Navbar />
         { children }
         <Footer />
      </div>
    );
}
 
export default Layout;