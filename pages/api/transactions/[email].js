// consulted https://www.youtube.com/watch?v=ahAilJEe-_A
import dbConnect from '../../../utils/dbConnect'
import Transaction from '../../../models/Transaction'
import { getSession } from "next-auth/react"

dbConnect()

const TransactionsEmailAPI = async (req, res) => {
   const session = await getSession({ req })
   if (session) {
      const {query: { email }, method } = req
      if (email == session.user.email) {

         switch (method) {
            case 'GET':
               try {
                  const transactions = await Transaction.find({ UserEmail: email }) 
                  res.status(200).json({ success: true, data: transactions })
               } catch (error) {
                  res.status(400).json({ success: false })
               }
               break

            case 'POST':
               try {
                  const transaction = await Transaction.create(req.body)
                  res.status(201).json({ success: true, data: transaction })
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

export default TransactionsEmailAPI
