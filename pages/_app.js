import '../styles/globals.css'
import { useEffect } from 'react'

import { themeChange } from 'theme-change'
import Navbar from '../components/Navbar'

const RootApp = ({ Component, pageProps }) => {

  return (
    <>

      <Navbar />

      <div className='flex justify-center w-full'>
        <div className='w-full max-w-5xl flex flex-col self-center px-10 md:px-20 xl:px-0'>
          <Component {...pageProps} />
        </div>
      </div>
    </>
  )
}

export default RootApp
