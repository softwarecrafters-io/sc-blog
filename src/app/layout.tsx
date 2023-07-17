import './globals.css'
import { Raleway } from 'next/font/google'
import styles from "@/app/layout.module.css";
import {Header} from "@/app/components/static/header/header";
import {Newsletter} from "@/app/components/client/newsletter/newsletter";
import {Footer} from "@/app/components/static/footer/footer";
import {ClientFactory} from "@/factories/clientFactory";

const raleway = Raleway({
    weight: ['400', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    display: 'swap'
})

export const metadata = {
    title: 'Software Crafters',
    description: 'Software Crafters',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={raleway.className}>
          <main className={styles.main}>
              <Header />
              {children}
              <Footer />
          </main>
      </body>
    </html>
  )
}
