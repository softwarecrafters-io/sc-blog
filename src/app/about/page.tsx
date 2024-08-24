import styles from '../home.module.css';
import Link from "next/link";
import {Routes} from "@/app/routes";

export default async function Legal() {
    return (
        <div className={styles.container}>
            <h2 className={styles.subtitle}>Cansados de escribir código que mata la moral de cualquiera</h2>
            <p>"Eso es todo. Nada más que añadir. Buenas noches. Cambio y corto.</p>
            <strong><p>Estamos hartos de escribir código que no hay por dónde cogerlo y de avergonzarnos entregando software de pésima
                calidad.</p></strong>
            <p>Hemos cubierto el cupo de llamadas a nuestros clientes para que reinicien los sistemas.No queremos listas de bugs interminables. Ni contribuir a enmarañar el código aún más.</p>
            <p><strong>Estamos cansados de hacer un trabajo mediocre. Queremos empezar a hacerlo bien. De eso va el movimiento <strong>Software Crafter</strong>. Nada más"</strong></p>
            <p>Esto lo dijo Robert C. Martin hace más de una década pero sigue estando más vigente que nunca.</p>
            <p><strong>Más de diez años después del inicio de este movimiento y seguimos escribiendo código que mata la moral de
                cualquiera.</strong></p>
            <p>De aquellas también decía algo sobre llevar unas pulseritas verdes que ponían “Agile” o “Clean Coder”. Ya sabes, las cosas del tío Bob, que cuando se pone la sotana de predicador nadie lo para...</p>
            <strong><p>Pero bueno, yo soy más de esforzarme en escribir buen código que de llevar pulseritas, o de convertir buenas prácticas de desarrollo en una religión...</p></strong>
            <h2 className={styles.hello}>Hola,</h2>
            <p>Mi nombre es Miguel A. Gómez, soy developer y emprendedor. He trabajado en proyectos grandes, medianos y
                pequeños, he co-fundado varias empresas y he ayudado directamente a que una startup americana se
                vendiera por muchos millones de euros (la putada es que de esta no tenía acciones).</p>
            <p><strong>Quizás esto no te diga nada y haces bien.</strong></p>
            <p>En 2019 escribí un libro, <Link href={"https://cleanjavascript.es"} target={"_blank"}>Clean JavaScript</Link>, a lo mejor te suena. Si, lo escribí antes de ChatGPT, ahora
                no tiene merito, todo el mundo tiene uno.</p>
            <p><strong>Un año mas tarde, en pleno del apocalipsis, me junté con mi colega Carlos Blé (el fundador de Lean Mind)
                con la intención de crear la mejor formación posible para developers profesionales.</strong> </p>
            <p>La formación que nos
                hubiera gustado encontrar a nosotros cuando empezamos. Y después de dedicarle dos años de esa asociación
                no salió un curso, sino varios.</p>
            <p><strong>Los cursos son tan buenos que esa es la formación que hacen los nuevos programadores que se incorporan en
                su empresa de consultoría, da igual que sean Juniors o Seniors.</strong></p>
            <p>Ahora estas formaciones ayudan a los profesionales de otras empresas a llevar sus carreras a otro nivel. </p>
            <p><strong>¿No me crees? Haces bien.</strong></p>
            <p>Échale un ojo a los <Link href={Routes.opinions}>testimonios (que por supuesto me he inventado)</Link> de algunos de los programadores que se han formado con nosotros y me cuentas.</p>
        </div>
    );
}

