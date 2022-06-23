import Form from "../components/Form";
import { useSession, getSession } from "next-auth/react"
import Image from 'next/image'

const Create = () => {
   const { data: session } = useSession()
   if (session) {
      const transactionForm = {
         Date: '',         
         Category: 'Entertainment',
         Description: '',
         Price: 0.01,
       }
     
       return (
        <div className="min-h-fit p-5 flex bg-gray-200">
          <div className="flex-1 max-w-7xl mx-auto p-10 bg-gray-50 rounded-3xl">
            <div className='grid grid-flow-col'>
              <div>
                <div className='text-4xl tracking-tight mb-2 font-bold'>Create Transaction</div>
                <Form transactionForm = {transactionForm} />
              </div>

              <div className = 'hidden md:block ml-auto'>
                <Image
                  alt='vector doodle of a dancing person'
                  src='/DancingDoodle.svg'
                  width={450}
                  height={450}
                  layout='fixed' />
              </div>
              
            </div>
          </div>
        </div>

        )
   }
   return <p>Access Denied</p>
}
 
export default Create;



export async function getServerSideProps(context) {
   return {
     props: {
       session: await getSession(context),
     },
   }
 }