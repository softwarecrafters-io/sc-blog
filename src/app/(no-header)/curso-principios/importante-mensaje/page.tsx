import styles from './styles.module.css'
export default async function ImportantMessage() {
    return (
        <>
        <div className={styles.container}>
            <h1 className={styles.title}>Un mensaje importante</h1>
            <p className={styles.text}>Aprovecha este precio especial para comprar con un 30% de descuento Clean JavaScript</p>
            <p className={styles.text}>Esta oferta no se volverá a repetir</p>
        </div>

        </>
)
    ;
}
