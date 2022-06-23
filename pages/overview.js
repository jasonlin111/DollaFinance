import ExpenseDonut from "../components/UserGraphsAndCharts/ExpenseDonut"
import { useSession, getSession } from "next-auth/react"
import useSWR from 'swr'
import SpendingLineGraph from '../components/UserGraphsAndCharts/SpendingLineGraph'
import Image from 'next/image'
import SpendingVsBudgetBar from "../components/UserGraphsAndCharts/SpendingVsBudgetBar"
import Link from "next/link"

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)

export default function Overview() {
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
        const starting = settingData.Entertainment + settingData.MedicalHealth + settingData.Insurance + settingData.Transportation +
                         settingData.MortgageRent + settingData.Utilities + settingData.Food + settingData.PersonalCare + settingData.Savings +
                         settingData.Debt + settingData.Other
        const spent = transactionsData.reduce((prev, curr) => prev + curr.Price, 0)

        return ( 
          <div className="min-h-screen flex items-center bg-gray-200">
            <div className="flex-1 max-w-7xl mx-auto p-10">

              <div className='text-4xl tracking-tight mb-5'>Welcome back,
                <span className="font-bold">{' ' + (session.user.name).split(' ')[0] }</span>
              </div>

              <div className="grid grid-rows-2 grid-flow-row gap-8">

                <div className='flex flex-col gap-5 min-h-max min-w-max'>
                  <div className="shadow-xl rounded-xl px-5 py-2 flex bg-lime-50">
                      <div>
                        <div className='text-gray-500 text-xl'>Budgeted Amount</div>
                        <div className="font-bold text-4xl">${starting.toFixed(2)}</div> {/* placeholder */}
                      </div>
                      <div className='ml-auto'>
                        <Image
                          alt='small icon of a clipboard'
                          className='object-contain'
                          src='/icons8-inspection-100.png'
                          width={80}
                          height={80} />
                      </div>
                  </div>

                  <div className='shadow-xl rounded-xl px-5 py-2 flex bg-rose-50'>
                      <div>
                        <div className='text-gray-500 text-xl'>Spending</div>
                        <div className="font-bold text-4xl">${spent.toFixed(2)}</div> {/* placeholder */}
                      </div>
                      <div className='ml-auto'>
                        <Image
                          alt='small icon of a hand and credit card'
                          className='object-contain'
                          src='/icons8-card-payment-100.png'
                          width={80}
                          height={80} />
                      </div>
                  </div>


                  <div className='shadow-lg rounded-xl px-5 py-2 flex bg-orange-50'>
                      <div>
                        <div className='text-gray-500 text-xl'>Current Balance</div>
                        <div className="font-bold text-4xl">{((starting - spent).toFixed(2) < 0) ?
                                                              ('-$' + (spent - starting).toFixed(2)) :
                                                              ('$' + (starting - spent).toFixed(2))}
                        </div>
                      </div>
                      <div className='ml-auto'>
                        <Image
                          alt='small icon of USD'
                          className='object-contain'
                          src='/icons8-us-dollar-100.png'
                          width={80}
                          height={80} />
                      </div>
                  </div>

                </div>
        
                <div className='shadow-lg rounded-xl px-5 py-2 flex bg-white'>
                    <SpendingLineGraph transactions = { transactionsData } />
                </div>

                <div className='shadow-lg rounded-xl px-5 py-2 flex bg-white'>
                  <ExpenseDonut transactions = { transactionsData } />
                </div>

                <div className='shadow-lg col-span-3 rounded-xl px-5 py-2 flex bg-white'>
                  <SpendingVsBudgetBar transactions = { transactionsData } setting = {settingData} width={900} />
                </div>

              </div>
            </div>
          </div>

          )
      }
  }
  else {
    return <p>Access Denied</p>
  }
}

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  }
}