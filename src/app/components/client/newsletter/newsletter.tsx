'use client';
import styles from './newsletter.module.css'
import {useNewsletter} from "@/app/components/client/newsletter/useNewsletter";
import {Thanks} from "@/app/components/client/newsletter/thanks/thanks";
import Image from "next/image";
import Link from "next/link";
import {Routes} from "@/app/routes";

export const Newsletter = ({hideEntry = false}:{hideEntry?:boolean}) => {
    const {handleSubscribe, handleEmailChange, isSubscribed, hasError, errorMessage  } = useNewsletter();
     if(isSubscribed()) {
        return <Thanks/>
    }
    return <div className={styles.container} id={'newsletter'}>
        <div className={styles.header}>
            <h3 className={styles.title}>La newsletter, por Miguel A. Gómez</h3>
            <Image hidden={hideEntry} className={styles.profilePhone} src={'https://swcrafters.fra1.cdn.digitaloceanspaces.com/Assets/foto-circle-small.png'} alt={'Miguel A. Gómez - Clean JavaScript'} width={140} height={140}/>
            <div className={styles.content}>
                <div className={styles.textContainer}>
                    <p hidden={hideEntry} className={styles.text}>Cada lunes, miércoles y viernes escribo un email con <strong>un consejo para subir de nivel como developer</strong>. Semana que estás fuera, consejos que te pierdes.</p>
                    <p hidden={hideEntry} className={styles.text}>Aprenderás a escribir mejor código gracias a arquitectos en torres de marfil, barcos que se hunden y a developers que desarrollan lenguajes en 10 días ... </p>
                    <p className={styles.text}>Únete a las miles de personas que han descubierto una forma diferente de entender la programación.</p>
                </div>
                <Image hidden={hideEntry} className={styles.profile} src={'https://swcrafters.fra1.cdn.digitaloceanspaces.com/Assets/foto-circle-small.png'} alt={'Miguel A. Gómez - Clean JavaScript'} width={140} height={140}/>
            </div>
        </div>
        <div className={styles.formContainer}>
            <div className={styles.formInput}>
                <input className={styles.email} type="email"  placeholder="Tu email" onChange={handleEmailChange}/>
                <button className={styles.actionButton} onClick={handleSubscribe}>VALE</button>
            </div>
            <div className={styles.privacyContainer}>
                <input type="checkbox" id="newsletterCheckbox" className={styles.checkbox} checked={true} readOnly={true} onClick={()=>alert('¿Cómo que no aceptas? Entonces, ¿cómo te vamos a enviar los emails?')}></input>
                <label htmlFor="newsletterCheckbox" className={styles.privacyMessage}>Para cumplir con el RGPD debes leer y aceptar la <Link href={Routes.legal}>política de privacidad</Link></label>
            </div>
            <div className={styles.errorMessage} hidden={!hasError()}>{errorMessage()}</div>
        </div>
    </div>
}
