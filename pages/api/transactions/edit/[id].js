// consulted https://www.youtube.com/watch?v=ahAilJEe-_A
import dbConnect from '../../../../utils/dbConnect'
import Transaction from '../../../../models/Transaction'
import { getSession } from "next-auth/react"

dbConnect()

const TransactionsEditIdAPI = async (req, res) => {
   const session = await getSession({ req })
   if (session) {

      const {query: { id }, method } = req
      const transaction = await Transaction.findById(id)
      if (transaction.UserEmail == session.user.email) {

         switch (method) {
            case 'GET':
               try {
                  const transaction = await Transaction.findById(id)

                  if (!transaction) {
                     return res.status(400).json({ success: false })
                  }
                  res.status(200).json({ success: true, data: transaction })
               } catch (error) {
                  res.status(400).json({ success: false })
               }
               break
            case 'PUT':
               try {
                  const transaction = await Transaction.findByIdAndUpdate(id, req.body, {
                     new: true,
                     runValidators: true
                  })

                  if (!transaction) {
                     return res.status(400).json({ success: false })
                  }
                  res.status(200).json({ success: true, data: transaction })
               } catch (error) {
                  res.status(400).json({ success: false })
               }
               break
            case 'DELETE':
               try {
                  const deletedTransaction = await Transaction.deleteOne({ _id: id })

                  if (!deletedTransaction) {
                     return res.status(400).json({ success: false })
                  }
                  res.status(200).json({ success: true, data: {} })
               } catch (error) {
                  res.status(400).json({ success: false })
               }
               break
               
            default:
               res.status(401).send('User cannot access this API directly')
               break
         }
      }
      else {
         res.status(401).send('User cannot send API request for other potential users.')
      }
   }

   else {
      res.status(401).send('Access Denied')
   }
}

export default TransactionsEditIdAPI