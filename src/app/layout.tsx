import './globals.css'
import { Raleway } from 'next/font/google'
import styles from "@/app/layout.module.css";
import {Header} from "@/app/components/static/header/header";
import {Newsletter} from "@/app/components/client/newsletter/newsletter";
import {Footer} from "@/app/components/static/footer/footer";
import {ClientFactory} from "@/factories/clientFactory";
import Head from "next/head";

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
    <html lang="es">
        <Head>
            <title>Software Crafters | Una forma diferente de entender la programación</title>
            <meta
                name="description"
                content="Descubre una forma diferente de entender la programación"
            />
            <meta property="og:url" content="https://softwarecrafters.io" />
            <meta property="og:type" content="website" />
            <meta
                property="og:title"
                content="https://softwarecrafters.io - Una forma diferente de entender la programación"
            />
            <meta
                property="og:description"
                content="Descubre una forma diferente de entender la programación"
            />
            <meta property="og:image" content="https://softwarecrafters.io/og.jpg" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta property="twitter:domain" content="softwarecrafters.io" />
            <meta property="twitter:url" content="https://softwarecrafters.io" />
            <meta
                name="twitter:title"
                content="softwarecrafters.io - Una forma diferente de entender la programación"
            />
            <meta
                name="twitter:description"
                content="Descubre una forma diferente de entender la programación."
            />
            <meta name="twitter:image" content="https://softwarecrafters.io/og.jpg" />
        </Head>

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
