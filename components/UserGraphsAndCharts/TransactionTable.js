import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import Image from "next/image"

const TransactionTable = ({ transactions, setting }) => {
  let starting = setting.Entertainment + setting.MedicalHealth + setting.Insurance + setting.Transportation +
                 setting.MortgageRent + setting.Utilities + setting.Food + setting.PersonalCare + setting.Savings +
                 setting.Debt + setting.Other

  // sorting by clicking on a col header
  const [order, setOrder] = useState('ascending')
  const sorting = (col) => {
    if (order == 'ascending'){
      transactions.sort((a,b) =>
        typeof(a[col]) == "number" ? (a[col] > b[col] ? 1 : -1) :
        (a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1)
      );
      setOrder('descending')
    }

    if (order == 'descending'){
      transactions.sort((a,b) =>
        typeof(a[col]) == "number" ? (a[col] < b[col] ? 1 : -1) :
        (a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1)
      );
      setOrder('ascending')
    }
  }

  // searching by date, category, description, or price
  const [query, setQuery] = useState('');

  const search = (data) => {
    return data.filter(
      (item) =>
        item.Category.toLowerCase().includes(query.toLowerCase()) ||
        item.Description.toLowerCase().includes(query.toLowerCase()) ||
        item.Date.includes(query) ||
        (String(item.Price)).includes(query)
    )
  }

  const router = useRouter()
  const [message, setMessage] = useState('')
  const handleDelete = async (id) => {
    try {
      await fetch(`/api/transactions/edit/${id}`, {
        method: 'Delete',
      }).then(router.reload)

    } catch (error) {
      setMessage('Failed to delete the pet.')
    }
  }

  if (transactions.length==0)
  return(
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
            No transaction data. Please create a transaction in
            <button className='bg-green-600 hover:bg-green-700 active:bg-green-800 
                                          text-white py-1.5 px-4 mx-4 rounded-full
                                          duration-300 my-1 font-jua'>
              <Link href='/create'>
                  <a>+ Transaction</a>
              </Link>
            </button>before proceeding.
         </div>
        </div>
   )
  
  return (
    
    <div>
      <div className='text-4xl tracking-tight mb-2 font-bold'>Transactions</div>
      {message && <p>{message}</p>}
      <div >
        <input
          className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type = "text"
          placeholder = 'Search'
          maxLength="50"
          onChange = {e => setQuery(e.target.value)}/>
        <div className= 'my-1'> Note that you can sort Date, Category, Description, and Price by clicking on the header.</div>
      </div>

      
      <table className="w-full text-left">
        <thead className='uppercase'>
          <tr className='bg-slate-300'>
            <th onClick={() => sorting("Date")} className='cursor-pointer p-2'>Date</th>
            <th onClick={() => sorting("Category")} className='cursor-pointer p-2'>Category</th>
            <th onClick={() => sorting("Description")} className='cursor-pointer p-2'>Description of Transaction</th>
            <th onClick={() => sorting("Price")} className='cursor-pointer p-2'>Price ($)</th>
            <th className='p-2'>Current Balance ($)</th>
            <th className='p-2'>Action</th>
          </tr>
        </thead>

        <tbody>

        {search(transactions).map (transact => 
          (<tr key={transact._id} className='odd:bg-white even:bg-slate-100'>
              <td className='p-2'>{transact.Date.split("T")[0]}</td>
              <td className='p-2'>{transact.Category}</td>
              <td className='p-2'>{transact.Description}</td>
              <td className='p-2'>{transact.Price.toFixed(2)}</td>
              <td className='p-2'>{starting = (starting - transact.Price).toFixed(2)}</td>
              <td className='p-2'>
                    <Link href={`/transactions/edit/${transact._id}`} ><a className="font-medium text-emerald-600 hover:underline">Edit</a></Link>
                    /
                    <button className="font-medium 
                                      text-red-600 hover:underline"
                                      onClick={() => {handleDelete(transact._id)}}>
                      Delete
                    </button>  
              </td>
           </tr>
          ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default TransactionTable;