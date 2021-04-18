import React from 'react'

import { AppProps} from 'next/app'

import { UserProvider } from '../hooks/useUser'

import '../styles/global.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}

export default MyApp
