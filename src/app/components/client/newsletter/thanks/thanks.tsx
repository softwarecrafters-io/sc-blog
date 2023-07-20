import styles from "@/app/components/client/newsletter/thanks/thanks.module.css";
import Image from "next/image";

export const Thanks = () => {
    return <div className={styles.container}>
        <div className={styles.content}>
            <div className={styles.text}>
                <h2>¡Ya casi estamos! 🙌</h2>
                <h4><strong>Solo tienes que ir a tu bandeja de entrada y confirmar tu email para que puedas entrar.</strong></h4>
                <p>Puede que la confirmación esté en spam, en ese caso añade la dirección<br/>miguel.gomez@softwarecrafters.io a tu lista de contactos 🙏<br/></p>
            </div>
        </div>
        <div className={styles.formContainer}>
            <div className={styles.containerGoToEmail}>
                <a className={styles.linkGoToEmail} href="https://mail.google.com/mail/u/0/#inbox" target="_blank">Ir a Gmail para confirmar el registro</a>
                <a className={styles.linkGoToEmail} href="https://outlook.live.com/mail/0/" target="_blank">Ir a Outlook para confirmar el registro</a>
            </div>
        </div>
    </div>
}
