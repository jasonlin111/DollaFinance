// consulted https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/pages/%5Bid%5D/edit.js
import { useSession, getSession } from "next-auth/react"
import useSWR from 'swr'
import SettingForm from '../../components/SettingForm'
import Image from "next/image"

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)

const Details = () => {
  const { data: session } = useSession()
    const email  = session?.user.email
    const { data: setting, error } = useSWR(email ? `/api/setting/${email}` : null, fetcher)

  if (session) {
    if (error) return <p>Failed to load</p>

    // Setting has already been set up. Can view/edit.
    if (setting) {
      const settingForm = {
        Entertainment: setting.Entertainment,
        MedicalHealth: setting.MedicalHealth,
        Insurance: setting.Insurance,
        Transportation: setting.Transportation,
        MortgageRent: setting.MortgageRent,
        Utilities: setting.Utilities,
        Food: setting.Food,
        PersonalCare: setting.PersonalCare,
        Savings: setting.Savings,
        Debt: setting.Debt,
        Other: setting.Other
      }
      return (
        <div className="min-h-fit p-5 flex bg-gray-200">
          <div className="flex-1 max-w-7xl mx-auto p-10 bg-gray-50 rounded-3xl">
            <div className='grid grid-flow-col'>
              <div>
                <div className='text-4xl tracking-tight mb-2 font-bold'>Reset Budget</div>
                <SettingForm formId = "edit-setting-form"
                          settingForm = { settingForm }
                          forNewSetting = { false } />
              </div>

              <div className = 'hidden md:block ml-auto mt-10'>
                <Image
                  alt='vector doodle of a person carrying a plant'
                  src='/PlantDoodle.svg'
                  width={600}
                  height={600}
                  layout='fixed' />
              </div>
            </div>
          </div>
        </div>
      )
    }

    // when setting has not been set up.
    else {
      const settingForm = {
        Entertainment: 0,
        MedicalHealth: 0,
        Insurance: 0,
        Transportation: 0,
        MortgageRent: 0,
        Utilities: 0,
        Food: 0,
        PersonalCare: 0,
        Savings: 0,
        Debt: 0,
        Other: 0
      }
     
      return (

          <div className="min-h-fit p-5 flex bg-gray-200">
            <div className="flex-1 max-w-7xl mx-auto p-10 bg-gray-50 rounded-3xl">
              <div className='grid grid-flow-col'>
                <div>
                  <div className='text-4xl tracking-tight mb-2 font-bold'>Set Budget</div>
                  <SettingForm settingForm = {settingForm} />
                </div>
  
                <div className = 'hidden md:block ml-auto mt-10'>
                  <Image
                    alt='vector doodle of a person carrying a plant'
                    src='/PlantDoodle.svg'
                    width={600}
                    height={600}
                    layout='fixed' />
                </div>
              </div>
            </div>
          </div>
      )
   
    }
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