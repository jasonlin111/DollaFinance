// consulted https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/pages/%5Bid%5D/edit.js
import { useSession, getSession } from "next-auth/react"
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Form from '../../../components/Form'
import Image from "next/image"

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)

const Details = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const { id } = router.query
  const { data: transaction, error } = useSWR(id ? `/api/transactions/edit/${id}` : null, fetcher)


  if (session) {
    if (error) return <p>Failed to load</p>
    if (!transaction)
      return(
       <div className="min-h-screen max-w-7xl mx-auto p-10 flex bg-gray-50">
         <div className='self-center text-4xl tracking-tight text-center font-semibold'>
            Loading or no such transaction exists...
         </div>
        </div>
   )

    const transactionForm = {
      Date: transaction.Date,   
      Category: transaction.Category,     
      Description: transaction.Description,
      Price: transaction.Price,
    }

    return (
    <div className="max-h-screen p-5 flex bg-gray-200">
      <div className="flex-1 max-w-7xl mx-auto p-10 bg-gray-50 rounded-3xl">
        <div className='grid grid-flow-col'>
          <div>
            <div className='text-4xl tracking-tight mb-2 font-bold'>Edit Transaction</div>
            <Form formId = "edit-transaction-form"
                  transactionForm = { transactionForm }
                  forNewTransaction = { false } />
          </div>

          <div className = 'hidden md:block ml-auto'>
            <Image
              alt='vector doodle of a sitting person'
              src='/GroovySittingDoodle.svg'
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

export default Details


export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  }
}