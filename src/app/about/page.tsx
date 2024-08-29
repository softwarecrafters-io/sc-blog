import styles from '../home.module.css';
import Link from "next/link";
import {Routes} from "@/app/routes";
import {Newsletter} from "@/app/components/client/newsletter/newsletter";
import Image from "next/image";

export default async function Legal() {
    return (
        <div className={styles.container}>
            <h2 className={styles.subtitleWithIcon}>Cansados de escribir código que mata la moral de cualquiera</h2>
            <p>"Eso es todo. Nada más que añadir. Buenas noches. Cambio y corto.</p>
            <strong><p>Estamos hartos de escribir código que no hay por dónde cogerlo y de avergonzarnos entregando
                software de pésima
                calidad.</p></strong>
            <p>Hemos cubierto el cupo de llamadas a nuestros clientes para que reinicien los sistemas.No queremos listas
                de bugs interminables. Ni contribuir a enmarañar el código aún más.</p>
            <p><strong>Estamos cansados de hacer un trabajo mediocre. Queremos empezar a hacerlo bien. De eso va el
                movimiento <strong>Software Crafter</strong>. Nada más"</strong></p>
            <p>Esto lo dijo Robert C. Martin hace más de una década pero sigue estando totalmente vigente.</p>
            <p><strong>Y es que ahora, por culpa de la inteligencia artificial, tenemos la capacidad de generar
                grandes repositorios de código legacy más rápido que nunca.</strong></p>
            <p> Ojo, no me malinterpretes, la IA y los LLM son una tecnología fantástica que multiplican tu
                productividad como developer (siempre y cuando domines los fundamentos).</p>
            <p><strong> Aunque la realidad es que más de diez años después del inicio del movimiento Software Crafter
                (con o sin IA) seguimos
                escribiendo código que mata la moral de cualquiera.</strong></p>
            <p>Por cierto, Robert C. Martin también decía algo sobre llevar unas pulseritas verdes
                que ponían “Agile” o “Clean Coder”. Ya
                sabes, las cosas del tío Bob, que cuando se pone la sotana de predicador nadie lo para...</p>
            <p><strong>Pero bueno, yo soy más de esforzarme en seguir mejorando para escribir buen código que de llevar
                pulseritas, o de convertir buenas prácticas de programación en una religión...</strong></p>
            <Newsletter hideEntry={true}/>
            <h2 className={styles.hello}>Hola,</h2>
            <p>Mi nombre es Miguel A. Gómez, soy emprendedor y developer especializado en la calidad del
                        software y en blockchain. </p>
            <p><strong>He trabajado en proyectos grandes, medianos y pequeños, he co-fundado varias empresas y he ayudado a que una startup americana se vendiera por muchos millones de dólares gracias a escribir código sostenible.</strong></p>
            <p>Quizás esto no te diga nada y haces bien.</p>
            <p><strong>Por cierto, cuando hablo de código sostenible me refiero a código fácil de mantener. Y con fácil de mantener quiero decir sencillo de cambiar.</strong></p>
            <p>Hay una verdad absoluta en el software: y es que si un proyecto tiene cierto éxito cambiará.</p>
            <Image className={styles.pictureProfile}
                   src={'https://swcrafters.fra1.cdn.digitaloceanspaces.com/Blog/miguel%20y%20teo.jpeg'}
                   alt={'Miguel A. Gómez - Clean JavaScript'} width={140} height={140}/>
            <p><strong>Llevo desarrollando software desde 2006. En realidad empecé antes, pero ese año fue cuando
                cuando creé una pequeña aplicación web para mi primer cliente.</strong></p>
            <p> En aquel momento estaba terminando Ingeniería en Radioelectrónica aunque ya sabía que programar era realmente lo que quería hacer. Me había dado cuenta de que con el hardware no iba a
                llegar muy lejos desde Canarias.</p>
            <p><strong>Durante esa época empecé a sufrir titulitis aguda. Estaba obsesionado con coleccionar papelitos
                de
                masters, certificaciones, carreras universitarias…</strong></p>
            <p>Supongo que de aquellas soñaba con tener una oficina con todos los títulos colgados como el típico
                despacho de un abogado de película. Ya sabes, con todas las paredes cubiertas de diplomas y
                certificados.</p>
            <p><strong>Y si, leíste bien, carreras universitarias en plural. </strong></p>

            <p>No era suficiente con estudiar una carrera que
                me dio por estudiar otra… y no solo eso, sino que mientras hacía la segunda me matriculé en una
                tercera.</p>
            <p><strong>Hice el camino largo no, el larguísimo. Ingeniería en Radioelectrónica, Ingeniería Informática y
                Teleco.
                Las dos primeras las terminé. Con la tercera me dije: ¿pero qué estás haciendo con tu vida?</strong></p>
            <p>Llego un momento en que abrí los ojos, me di cuenta que la universidad estaba obsoleta y que acumular
                papelitos no era el camino. </p>
            <p><strong>No hace falta pasar por la universidad para ser un gran programador... </strong></p>
            <p>A finales de 2015 nos juntamos unos cuantos amigos y confundé mi segunda una startup (en la que yo sería
                el CTO). El plan era construir una especie de Booking .com orientado a personas con movilidad
                reducida.</p>
            <p><strong>La idea era buena, conseguimos levantar más de un millón y medio de euros entre premios y rondas
                de inversión. </strong></p>
            <p> Pero aquello no terminó de salir bien (en la newsletter te cuento por qué).</p>
            <p><strong>Hace unos años me dió por escribir un libro, <Link href={"https://cleanjavascript.es"}
                                                                          target={"_blank"}>Clean
                JavaScript</Link>, lo mismo te suena. Lo usan miles de developers en España y en Latam como referencia
                (quizás tu seas uno). También lo tienes en inglés, por si te interesa.</strong></p>
            <p>El libro es un poco raro porque no va sobre JavaScript sino sobre como escribir mejor software en
                general. Ni siquiera los ejemplos son en el lenguaje de Brendan Eich sino en TypeScript. Por cierto, lo
                escribí antes de ChatGPT, ahora todo el mundo tiene uno. </p>
            <p><strong>En el 2020 (en pleno apocalipsis) me junté con mi colega Carlos Blé (el
                fundador de Lean Mind) con la intención de crear la mejor formación posible para developers
                profesionales.</strong></p>
            <p>La formación que nos hubiera gustado encontrar a nosotros cuando empezamos. Después de dedicarle más de
                dos años a desarrollar los contenidos, de esa asociación
                no salió un curso, sino varios.</p>
            <p><strong>Los cursos son tan buenos que esa es la formación que hacen los nuevos programadores que se
                incorporan en Lean Mind, su empresa de consultoría, da igual que sean Juniors o Seniors.</strong></p>
            <p>Ahora estas formaciones ayudan a cientos de developers profesionales de decenas de empresas a llevar sus
                carreras a otro
                nivel. </p>
            <p><strong>¿No me crees? Haces bien.</strong></p>
            <p>Échale un ojo a los <Link href={Routes.opinions}>testimonios (que por supuesto me he inventado)</Link> de
                algunos de los programadores que se han formado con nosotros y me cuentas.</p>
            <p><strong>Por cierto, Software Crafters Academy no hubiera sido posible sin las enseñanzas de mis mentores,
                en especial de mi hermano Juan M. Gómez (desarrollador del compilador del lenguaje Nim) y de mi colega
                Carlos Blé (fundador de Lean Mind).</strong></p>
            <p>Casi todo lo que sé sobre programación (y sobre muchas otras cosas de la vida) se lo debo a ellos.
                Eternamente agradecido.</p>
            <Newsletter hideEntry={true}/>
        </div>
    );
}

