// consulted https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/components/Form.js
import { useState } from 'react'
import { useRouter } from 'next/router'
import { mutate } from 'swr'
import { useSession, getSession } from "next-auth/react"

const SettingForm = ({ formId, settingForm, forNewSetting = true }) => {
  const router = useRouter()
  const contentType = 'application/json'
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const { data: session } = useSession()

  const [form, setForm] = useState({
    UserEmail: session.user.email,
    Entertainment: settingForm.Entertainment,
    MedicalHealth: settingForm.MedicalHealth,
    Insurance: settingForm.Insurance,
    Transportation: settingForm.Transportation,
    MortgageRent: settingForm.MortgageRent,
    Utilities: settingForm.Utilities,
    Food: settingForm.Food,
    PersonalCare: settingForm.PersonalCare,
    Savings: settingForm.Savings,
    Debt: settingForm.Debt,
    Other: settingForm.Other
  })

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form) => {
    const email = session.user.email

    try {
      const res = await fetch(`/api/setting/${email}`, {
        method: 'PUT',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status)
      }

      const { data } = await res.json()

      mutate(`/api/setting/${email}`, data, false) // Update the local data without a revalidation
      router.push('/overview')
    } catch (error) {
      setMessage('Failed to update setting')
    }
  }

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form) => {
    try {
      const res = await fetch('/api/setting', {
        method: 'POST',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status)
      }

      router.push('/overview')
    } catch (error) {
      setMessage('Failed to add setting')
    }
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = formValidate()
    if (Object.keys(errs).length === 0) {
      forNewSetting ? postData(form) : putData(form)
    } else {
      setErrors({ errs })
    }
  }

  const formValidate = () => {
    let err = {}
    return err
  }

  return (
    <>
      <div>
        <form id={formId} onSubmit={handleSubmit} className='flex flex-col'>

          <label className="block text-gray-700 font-bold m-1">Entertainment</label>
          <input
            className="shadow border rounded py-2 px-3 text-gray-700"
            type="number"
            name="Entertainment"
            min="0"
            step="1"
            value={form.Entertainment}
            onChange={handleChange}
          />
          
          <label className="block text-gray-700 font-bold m-1">Medical/Health</label>
          <input
            className="shadow border rounded py-2 px-3 text-gray-700"
            type="number"
            name="MedicalHealth"
            min="0"
            step="1"
            value={form.MedicalHealth}
            onChange={handleChange}
          />

          <label className="block text-gray-700 font-bold m-1">Insurance</label>
          <input
            className="shadow border rounded py-2 px-3 text-gray-700"
            type="number"
            name="Insurance"
            min="0"
            step="1"
            value={form.Insurance}
            onChange={handleChange}
          />

          <label className="block text-gray-700 font-bold m-1">Transportation</label>
          <input
            className="shadow border rounded py-2 px-3 text-gray-700"
            type="number"
            name="Transportation"
            min="0"
            step="1"
            value={form.Transportation}
            onChange={handleChange}
          />

          <label className="block text-gray-700 font-bold m-1">Mortgage/Rent</label>
          <input
            className="shadow border rounded py-2 px-3 text-gray-700"
            type="number"
            name="MortgageRent"
            min="0"
            step="1"
            value={form.MortgageRent}
            onChange={handleChange}
          />

          <label className="block text-gray-700 font-bold m-1">Utilities</label>
          <input
            className="shadow border rounded py-2 px-3 text-gray-700"
            type="number"
            name="Utilities"
            min="0"
            step="1"
            value={form.Utilities}
            onChange={handleChange}
          />

          <label className="block text-gray-700 font-bold m-1">Food</label>
          <input
            className="shadow border rounded py-2 px-3 text-gray-700"
            type="number"
            name="Food"
            min="0"
            step="1"
            value={form.Food}
            onChange={handleChange}
          />

          <label className="block text-gray-700 font-bold m-1">Personal Care</label>
          <input
            className="shadow border rounded py-2 px-3 text-gray-700"
            type="number"
            name="PersonalCare"
            min="0"
            step="1"
            value={form.PersonalCare}
            onChange={handleChange}
          />

          <label className="block text-gray-700 font-bold m-1">Savings</label>
          <input
            className="shadow border rounded py-2 px-3 text-gray-700"
            type="number"
            name="Savings"
            min="0"
            step="1"
            value={form.Savings}
            onChange={handleChange}
          />

          <label className="block text-gray-700 font-bold m-1">Debt</label>
          <input
            className="shadow border rounded py-2 px-3 text-gray-700"
            type="number"
            name="Debt"
            min="0"
            step="1"
            value={form.Debt}
            onChange={handleChange}
          />

          <label className="block text-gray-700 font-bold m-1">Other</label>
          <input
            className="shadow border rounded py-2 px-3 text-gray-700"
            type="number"
            name="Other"
            min="0"
            step="1"
            value={form.Other}
            onChange={handleChange}
          />

          <label className="block text-rose-700 font-bold text-xl m-1 mt-5">
            Total: ${ Number(form.Entertainment) +
                      Number(form.MedicalHealth) +
                      Number(form.Insurance) +
                      Number(form.Transportation) +
                      Number(form.MortgageRent) +
                      Number(form.Utilities) +
                      Number(form.Food) +
                      Number(form.PersonalCare) +
                      Number(form.Savings) +
                      Number(form.Debt) +
                      Number(form.Other) }</label>

          <button className="bg-blue-500 hover:bg-blue-700 
                             text-white font-bold py-2 px-4 mt-5 duration-300 w-1/2
                              rounded"
                  type="buttom" >
            Submit
          </button>

        </form>
        <p>{message}</p>
        <div>
          {Object.keys(errors).map((err, index) => (
            <li key={index}>{err}</li>
          ))}
        </div>
      </div>
    </>
  )
}

export default SettingForm


export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  }
}