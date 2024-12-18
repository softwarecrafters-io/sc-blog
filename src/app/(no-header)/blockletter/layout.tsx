import '../../(main)/globals.css'
import { Raleway, JetBrains_Mono } from 'next/font/google'
import {HeaderForBlockLetter} from "@/app/components/server/header/header";
import {FooterForBlockLetter} from "@/app/components/server/footer/footer";
import styles from "@/app/(main)/layout.module.css";
import {CookiesConsent} from "@/app/components/client/Cookies/CookiesConsent";

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
        <head>
            <title>La BlockLetter</title>
            <meta
                name="description"
                content="Criptografía, Blockchain y Finanzas Descentralizadas para Developers"
            />
            <script
                defer
                data-domain="softwarecrafters.io"
                src="https://plausible.io/js/script.outbound-links.js"
            />
            {/*<script*/}
            {/*    src="/mailerliteForms.js"*/}
            {/*/>*/}
        </head>
        <body className={raleway.className}>
        <main className={styles.main}>
            <HeaderForBlockLetter/>
            {children}
            <FooterForBlockLetter/>
            <CookiesConsent/>
            </main>
        </body>
        </html>
    )
}
