import Link from 'next/link';
import { useSession } from "next-auth/react"

const Credits = () => {
   const { data: session } = useSession()
   return(
      <div className="p-5 flex bg-gray-200">
         <div className="max-w-7xl mx-auto p-10 flex flex-col bg-gray-50 rounded-3xl">

           <div className='self-center text-4xl tracking-tight text-center font-semibold'>
             Credits
           </div>


           <div className='text-lg p-5'>
               <div>
                  <Link href='https://www.freepik.com/vectors/cute-cat'>
                     <a>Cute cat vector created by catalyststuff - www.freepik.com</a>
                  </Link>
               </div>

               <div>
                  <Link href='https://icons8.com/icon/x9U4HcNp4Tv2/card-payment'>
                     <a>Card Payment</a>
                  </Link> icon by
                  <Link href='https://icons8.com'>
                     <a> Icons8 </a>
                  </Link>
               </div>

               <div>         
                  <Link href='https://icons8.com/icon/113854/money'>
                     <a>Money</a>
                  </Link> icon by
                  <Link href='https://icons8.com'>
                     <a> Icons8 </a>
                  </Link>
               </div>   

               <div>
                  <Link href='https://icons8.com/icon/91169/inspection'>
                     <a>Inspection</a>
                  </Link> icon by
                  <Link href='https://icons8.com'>
                     <a> Icons8 </a>
                  </Link>
               </div>
            </div>

            { session ?
               <div className='text-center text-2xl p-5'>
                  Redirect to <Link href='/overview'>
                  <a className='text-lime-700 font-semibold'>overview</a>
                  </Link>.
               </div>
            :
               <div className='text-center text-2xl p-5'>
                  Redirect to <Link href='/'>
                  <a className='text-lime-700 font-semibold'>homepage</a>
                  </Link>.
               </div>
            }


          </div>
       </div>
   )
}
 
export default Credits;