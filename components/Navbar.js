import Image from 'next/image'
import RedFontNavItem from './RedFontNavItem';
import Link from 'next/link';
import { useSession, signIn, signOut } from "next-auth/react"


const Navbar = () => {
   const { data: session } = useSession()
   if (!session) return (
      <nav className=''>
         {/* flex container */}
         <div className='p-3 flex items-center justify-between bg-gray-100'>

            {/* logo */}
            <div>
               <Image
                  alt='app logo'
                  src='/catDolla.png'
                  width={220}
                  height={120}
                  layout='fixed' />
            </div>

            {/* navigation */}
            <div className='font-jua text-lg pr-10'>
               <div>
                  <button className='bg-orange-500 hover:bg-orange-700 active:bg-orange-800 
                                     text-white py-1.5 px-4 rounded-full
                                     duration-300 my-1'
                           onClick={() => signIn('google', { callbackUrl: '/overview' })}>
                        Login with Google
                  </button>
               </div>
               
            </div>
         </div>
      </nav>
   )

   return (
      <nav className=''>
         {/* flex container */}
         <div className='p-3 flex items-center justify-between bg-gray-100'>

            {/* logo */}
            <div>
               <Image
                  alt='app logo'
                  src='/catDolla.png'
                  width={220}
                  height={120}
                  layout='fixed' />
            </div>

            {/* navigation */}
            <div className='md:flex flex-grow justify-evenly min-w-fit items-center max-w-2xl
                            font-jua text-lg
                            text-center
                            item'>
               <RedFontNavItem title='Overview' route='/overview'/>
               <RedFontNavItem title='Transactions' route='/transactions'/>

               <div>
                  <button className='bg-green-600 hover:bg-green-700 active:bg-green-800 
                                     text-white py-1.5 px-4 rounded-full
                                     duration-300 my-1'>
                     <Link href='/create'>
                        <a>+ Transaction</a>
                     </Link>
                  </button>
               </div>

               <div>
                  <button className='bg-gray-500 hover:bg-gray-700 active:bg-gray-800
                                     text-white py-1.5 px-4 rounded-full
                                     duration-300 my-1'>
                     <Link href='/setting'>
                        <a>Setting</a>
                     </Link>
                  </button>
               </div>

               <div>
                  <button className='bg-red-500 hover:bg-red-700 active:bg-red-800 
                                     text-white py-1.5 px-4 rounded-full
                                     duration-300 my-1'
                           onClick={() => signOut({ callbackUrl: '/' })}>
                        Logout
                  </button>
               </div>
            </div>
         </div>
      </nav>
    );
}
 
export default Navbar;

