import styles from "@/app/components/client/newsletter/thanks/thanks.module.css";
import Image from "next/image";

export const Thanks = () => {
    return <div className={styles.container}>
        <div>
            <h2>La newsletter de Software Crafters, por Miguel A. Gómez</h2>
            <Image className={styles.profilePhone} src={'https://swcrafters.fra1.cdn.digitaloceanspaces.com/Assets/foto-circle-small.png'} alt={'Miguel A. Gómez - Clean JavaScript'} width={140} height={140}/>
        </div>
        <div className={styles.content}>
            <div className={styles.text}>
                <h2>¡Ya casi estamos! 🙌</h2>
                <h4><strong>Solo tienes que ir a tu bandeja de entrada y confirmar tu email para que puedas entrar.</strong></h4>
                <p>Puede que la confirmación esté en spam, en ese caso añade la dirección<br/>miguel.gomez@softwarecrafters.io a tu lista de contactos 🙏<br/></p>
            </div>
            <Image className={styles.profile} src={'https://swcrafters.fra1.cdn.digitaloceanspaces.com/Assets/foto-circle-small.png'} alt={'Miguel A. Gómez - Clean JavaScript'} width={140} height={140}/>
        </div>
        <div className={styles.formContainer}>
            <div className={styles.containerGoToEmail}>
                <a className={styles.linkGoToEmail} href="https://mail.google.com/mail/u/0/#inbox" target="_blank">Ir a Gmail para confirmar el registro</a>
                <a className={styles.linkGoToEmail} href="https://outlook.live.com/mail/0/" target="_blank">Ir a Outlook para confirmar el registro</a>
            </div>
        </div>
    </div>
}
