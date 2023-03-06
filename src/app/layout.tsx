import './globals.css'
import { Inter } from '@next/font/google'
import Header from './header'
import Footer from './footer'
import styles from './layout.module.css'

const inter = Inter({
  weight: "400",
  subsets: ['latin']
})

export const metadata = {
  title: 'OpenAI create image',
  description: 'Create Image',
}

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
            {children}
          </section>
          <Footer />
        </div>
      </body>
    </html>
  )
}
