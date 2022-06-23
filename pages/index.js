import { useSession, getSession } from "next-auth/react"
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Image from 'next/image'

export default function Home() {
  const { data: session } = useSession()
  const router = useRouter();

   useEffect(() => {if (session)
     router.push('/overview')}, [])
     
  return(
    <div className="min-h-screen p-5 flex bg-gray-200">
       <div className="max-w-7xl mx-auto p-10 flex bg-gray-100">
         <div className='hidden md:block'>
          <Image
             alt='vector doodle of a person on the swings'
             src='/SwingingDoodle.svg'
             width={500}
             height={500}
             layout='fixed' />
         </div>

         <div className='self-center text-4xl tracking-tight text-center font-semibold'>
          Welcome to dolla, your personal budget app.
         </div>
        </div>
     </div>
   )

}

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  }
}