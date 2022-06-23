import TransactionTable from "../../components/UserGraphsAndCharts/TransactionTable";
import useSWR from 'swr'
import { useSession, getSession } from "next-auth/react"
import Link from "next/link";
import Image from "next/image";

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)

const Transactions = () => {
   const { data: session } = useSession()
   const email  = session?.user.email
   const { data: transactionsData, error } = useSWR(email ? `/api/transactions/${email}` : null, fetcher)
   const { data: settingData, error2 } = useSWR(email ? `/api/setting/${email}` : null, fetcher)

   if (session) {
      if (error || error2) return <p>Failed to load</p>

      if (!settingData) {
        return(
         <div className="min-h-screen p-5 flex bg-gray-200">
            <div className="max-w-7xl mx-auto p-10 flex bg-gray-50 rounded-3xl">
              <div className='hidden md:block'>
               <Image
                  alt='vector doodle of a smiling man'
                  src='/ManSmiling.png'
                  width={380}
                  height={500}
                  layout='fixed' />
              </div>

              <div className='self-center text-4xl tracking-tight text-center font-semibold'>
                Please set up budget in
                  <button className='bg-gray-500 hover:bg-gray-700 active:bg-gray-800
                                     text-white py-1.5 px-4 mx-2 rounded-full
                                     duration-300 my-1 font-jua'>
                     <Link href='/setting'>
                        <a>Setting</a>
                     </Link>
                  </button>before proceeding.
              </div>
             </div>
          </div>
        )
      }

      if (transactionsData && settingData) {
         return(
            <div className="min-h-screen p-5 flex bg-gray-200">
               <div className="flex-1 max-w-7xl mx-auto p-10 bg-gray-50">
                  <TransactionTable transactions = { transactionsData } setting = { settingData } />
               </div>
            </div>
         )
      }
   }
   
   else {
      return <p>Access Denied</p>      
   }

}
 
export default Transactions;

export async function getServerSideProps(context) {
   return {
     props: {
       session: await getSession(context),
     },
   }
 }