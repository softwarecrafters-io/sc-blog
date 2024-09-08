import styles from './downloadLeadMagnet.module.css'

import { JetBrains_Mono } from 'next/font/google'

const jetBrainsMono = JetBrains_Mono({
    weight: ['400', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    display: 'swap'
})

export const DownloadLeadMagnet = (props:{onClick?:()=>void}) => {

    const handleButtonClick = () => {
        if(props.onClick) props.onClick();
        window.open("https://principios.softwarecrafters.io", "_blank");
    }

    return (
        <div className={styles.container} style={jetBrainsMono.style}>
            <h3 className={styles.title}>5 Principios de Diseño de software que lo mismo te ayudan a escribir mejor código</h3>
            <div className={styles.formInput}>

                <button className={styles.actionButton} style={jetBrainsMono.style} onClick={handleButtonClick}>DESCARGAR GUÍA GRATIS</button>
            </div>
        </div>
    );
}
