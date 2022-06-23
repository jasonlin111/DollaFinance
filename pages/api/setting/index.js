// consulted https://www.youtube.com/watch?v=ahAilJEe-_A
import dbConnect from '../../../utils/dbConnect'
import Setting from '../../../models/Setting'
import { getSession } from "next-auth/react"

dbConnect()

const SettingAPI = async (req, res) => {
   const session = await getSession({ req })
   if (session) {
      const { method } = req

      switch (method) {
         // Uncomment in production as it is not used in webapp and 
         // also any one client cannot GET settings of all clients.
         // case 'GET':
         //    try {
         //       const settings = await Setting.find({})
         //       res.status(200).json({ success: true, data: settings })
         //    } catch (error) {
         //       res.status(400).json({ success: false })
         //    }
         //    break


         // also POST should only really work if there is a session
         case 'POST':
            try {
               const setting = await Setting.create(req.body)
               res.status(201).json({ success: true, data: setting })
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
      res.status(401).send('Access Denied')
   }
}

export default SettingAPI