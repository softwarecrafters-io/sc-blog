import '../../(main)/globals.css'
import { Raleway } from 'next/font/google'
import {HeaderForBlockLetter} from "@/app/components/server/header/header";
import {Footer} from "@/app/components/server/footer/footer";
import styles from "@/app/(main)/layout.module.css";
import {CookiesConsent} from "@/app/components/client/Cookies/CookiesConsent";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

const raleway = Raleway({
    weight: ['300','400','500', '700'],
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
            <title>Curso de principios de diseño</title>
            <meta
                name="description"
                content="..."
            />
            <script
                defer
                data-domain="softwarecrafters.io"
                src="https://plausible.io/js/script.outbound-links.js"
            />
        </head>
        <body className={raleway.className}>
        <main className={styles.main}>
            <HeaderForBlockLetter/>
            {children}
            <Footer/>
            <CookiesConsent/>
            </main>
        </body>
        </html>
    )
}
