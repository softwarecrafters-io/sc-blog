// app/layout.tsx (layout raíz)
import './globals.css'
import { Raleway, JetBrains_Mono } from 'next/font/google'
import {Header} from "@/app/components/server/header/header";
import {FullscreenPopup} from "@/app/components/client/newsletter/fullscreenPopup/fullscreenPopup";
import {Footer} from "@/app/components/server/footer/footer";
import styles from "@/app/(main)/layout.module.css";

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
            <title>Software Crafters Academy</title>
            <meta
                name="description"
                content="Programar es el arte de decirle a otra persona lo que quieres que la máquina haga"
            />
            <script
                defer
                data-domain="softwarecrafters.io"
                src="https://plausible.io/js/script.outbound-links.js"
            />
        </head>
        <body className={raleway.className}>
        <Header />
        <FullscreenPopup />
        <main className={styles.main}>
            {children}
            <Footer />
        </main>
        </body>
        </html>
    )
}
