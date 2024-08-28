import './globals.css'
import { Raleway, JetBrains_Mono } from 'next/font/google'
import styles from "@/app/layout.module.css";
import {Header} from "@/app/components/server/header/header";
import {Footer} from "@/app/components/server/footer/footer";

const raleway = Raleway({
    weight: ['400', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    display: 'swap'
})

const jetBrainsMono = JetBrains_Mono({
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
        <Header />
        <main className={styles.main}>
              {children}
              <Footer />
          </main>
      </body>
    </html>
  )
}
