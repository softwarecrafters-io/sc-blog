import './globals.css'
import { Raleway } from 'next/font/google'
import styles from "@/app/layout.module.css";
import {Header} from "@/app/components/server/header/header";
import {Newsletter} from "@/app/components/client/newsletter/newsletter";
import {Footer} from "@/app/components/server/footer/footer";
import {ClientFactory} from "@/infrastructure/factories/clientFactory";
import Head from "next/head";

const raleway = Raleway({
    weight: ['400', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    display: 'swap'
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
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
