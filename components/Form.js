// consulted https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/components/Form.js
import { useState } from 'react'
import { useRouter } from 'next/router'
import { mutate } from 'swr'
import Category from "./Category";
import { useSession, getSession } from "next-auth/react"

const Form = ({ formId, transactionForm, forNewTransaction = true }) => {
  const router = useRouter()
  const contentType = 'application/json'
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')
  const listOfCategories = Category

  const { data: session } = useSession()

  const [form, setForm] = useState({
    UserEmail: session.user.email,
    Date: transactionForm.Date,   
    Category: transactionForm.Category,     
    Description: transactionForm.Description,
    Price: transactionForm.Price,
  })

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form) => {
    const { id } = router.query

    try {
      const res = await fetch(`/api/transactions/edit/${id}`, {
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

      mutate(`/api/transactions/edit/${id}`, data, false) // Update the local data without a revalidation
      router.push('/transactions')
    } catch (error) {
      setMessage('Failed to update transaction')
    }
  }

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form) => {
    try {
      const res = await fetch(`/api/transactions/${session.user.email}`, {
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

      router.push('/transactions')
    } catch (error) {
      setMessage('Failed to add transaction')
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
      forNewTransaction ? postData(form) : putData(form)
    } else {
      setErrors({ errs })
    }
  }

  const formValidate = () => {
    let err = {}
    if (!form.Date) err.Date = 'Date is required'
    if (!form.Category) err.Category = 'Category is required'        
    if (!form.Description) err.Description = 'Description is required'
    if (!form.Price) err.Price = 'Price is required'
    return err
  }

  return (
      <div>
        <form id={formId} onSubmit={handleSubmit} className='flex flex-col'>

          <label className="block text-gray-700 font-bold m-1">Date</label>
          <input
            className="shadow border rounded py-2 px-3 text-gray-700"
            type="date"
            name="Date"
            min="2020-01-01"
            max={new Date().toISOString().split("T")[0]}
            value={form.Date}
            onChange={handleChange}
            required
          />

          <label className="block text-gray-700 font-bold m-1">Category</label>
          <select type="text"
            className="shadow border rounded py-2 px-3 text-gray-700"
            name="Category"
            value={form.Category}
            onChange={handleChange}
            required>
              {listOfCategories.map(category => 
                    <option key={category}>
                      {category}
                    </option>
              )}
          </select>

          <label className="block text-gray-700 font-bold m-1">Description</label>
          <input
            className="shadow border rounded py-2 px-3 text-gray-700"
            type="text"
            maxLength="50"
            name="Description"
            placeholder="Ex : Movie Ticket"
            value={form.Description}
            onChange={handleChange}
            required
          />

          <label className="block text-gray-700 font-bold m-1">Price</label>
          <input
            className="shadow border rounded py-2 px-3 text-gray-700"
            type="number"
            name="Price"
            min="0.01"
            step="0.01"
            value={form.Price}
            onChange={handleChange}
          />

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


  )
}

export default Form

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  }
}