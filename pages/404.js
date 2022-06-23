import Link from 'next/link'
import Image from 'next/image'
import { useSession } from "next-auth/react"

const NotFound = () => {
  const { data: session } = useSession()
  return (
    <div>
      <div className='text-center text-7xl font-bold'>404</div>
      <div className='text-center text-3xl'>This page cannot be found.</div>
      <div className='flex justify-center'>
          <Image
            alt='vector doodle of a falling coffee'
            className='object-contain'
            src='/CoffeeDoddle.svg'
            width={400}
            height={400} />
      </div>
      { session ?
          <div className='text-center text-2xl'>
            Redirect to <Link href='/overview'>
              <a className='text-lime-700 font-semibold'>overview</a>
            </Link>.
          </div>
        :
          <div className='text-center text-2xl'>
            Redirect to <Link href='/'>
              <a className='text-lime-700 font-semibold'>homepage</a>
            </Link>.
          </div>
      }
    </div>
  );
}
 
export default NotFound;


