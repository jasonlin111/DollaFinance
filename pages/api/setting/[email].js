// consulted https://www.youtube.com/watch?v=ahAilJEe-_A
import dbConnect from '../../../utils/dbConnect'
import Setting from '../../../models/Setting'
import { getSession } from "next-auth/react"

dbConnect()

const EmailSettingAPI = async (req, res) => {
   const session = await getSession({ req })
   if (session) {
      const {query: { email }, method } = req
      if (email == session.user.email) {

         switch (method) {
            case 'GET': 
               try {
                  // we motified this to get user setting by email, if there's any
                  const setting = await Setting.findOne({ UserEmail: email }) 

                  if (!setting) {
                     return res.status(400).json({ success: false })
                  }
                  res.status(200).json({ success: true, data: setting })
               } catch (error) {
                  res.status(400).json({ success: false })
               }
               break
            case 'PUT':
               try {
                  // here too
                  const setting = await Setting.findOneAndUpdate({ UserEmail: email }, req.body, {
                     new: true,
                     runValidators: true
                  })

                  if (!setting) {
                     return res.status(400).json({ success: false })
                  }
                  res.status(200).json({ success: true, data: setting })
               } catch (error) {
                  res.status(400).json({ success: false })
               }
               break
            case 'DELETE':
               try {
                  // and here to delete by email
                  const deletedSetting = await Setting.deleteOne({ UserEmail: email })

                  if (!deletedSetting) {
                     return res.status(400).json({ success: false })
                  }
                  res.status(200).json({ success: true, data: {} })
               } catch (error) {
                  res.status(400).json({ success: false })
               }
               break
               
            default:
               res.status(401).send('User cannot access this API directly.')
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

export default EmailSettingAPI