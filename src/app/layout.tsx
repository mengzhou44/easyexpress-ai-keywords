'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'

import './globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { Inter } from '@next/font/google'
import Header from './header'
import Footer from './footer'
import styles from './layout.module.css'


const inter = Inter({
  weight: "400",
  subsets: ['latin']
})

 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={styles.layout}>
          <section className={styles.content}>
            <Header></Header>
            <section className={styles.children}>
            <CacheProvider>
              <ChakraProvider>{children}</ChakraProvider>
            </CacheProvider>
            </section>
          </section>
          <Footer />
        </div>
      </body>
    </html>
  )
}
