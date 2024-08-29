import {BlogComponent, blogMetadata} from "@/app/components/server/home/BlogComponent";
import styles from './home.module.css';
import {Newsletter} from "@/app/components/client/newsletter/newsletter";

export default async function Home({params}: { params: { slug: string }; }) {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Software Crafters Academy</h1>
            <Newsletter hideEntry={true}/>
            <h2 className={styles.subtitleWithIcon}>Programar es el arte de decirle a otra persona lo que quieres que la máquina haga</h2>
            <p>A la mayoría de los desarrolladores nos han enseñado a programar mal... y muchos ni siquiera lo
                saben.</p>
            <strong><p>Quizás tu si, pero porque llevas el suficiente tiempo en esto.</p></strong>
            <p>Principalmente existen dos motivos.</p>
            <strong><p>El primero es consecuencia directa de la persona que te está instruyendo.</p></strong>
            <p>Docentes que no son profesionales del desarrollo de software, sino de la enseñanza, y que no han
                experimentado las calamidades que genera el paso del tiempo en los proyectos.</p>
            <strong><p>Esto pasa constantemente en cursos online, bootcamps y (sobre todo) en las formaciones
                académicas: universidad, ciclos formativos, etc.</p></strong>
            <p>Y es que la mayoría de las formaciones para desarrolladores que te encuentras hoy en día en el mercado
                están creadas por personas que nunca han convivido lo suficiente con su propio código.</p>
            <strong><p>Simplemente no son conscientes de los problemas de mantenimiento que puede acarrear la forma en
                la que enseñan a programar.</p></strong>
            <p>Es más, me atrevo a decir que en el 90% de esos cursos no se escribe ni un test.</p>
            <strong><p>Debemos entender de una vez por todas que sin buenos tests no puede haber calidad en el
                software.</p></strong>
            <p>Y esto es así, porque una buena batería de pruebas es lo que te permite hacer refactor con garantías, los
                tests son nuestra red de seguridad.</p>
            <strong><p>Sin tests, intentarás mejorar una cosa y romperás otra, garantizado.</p></strong>
            <p>El otro motivo tiene que ver con la forma y las herramientas que usan.</p>
            <strong><p>¿Te imaginas ir a un curso de cocina y que te enseñen a hacer recetas de Thermomix?</p></strong>
            <p>Pues en la mayoría de los cursos para developers te enseñan a programar así, utilizando el framework o
                librería de turno.</p>
            <strong><p>No se centran en los principios.</p></strong>
            <p>Si no en diseñar soluciones totalmente acopladas al robot de cocina de moda.</p>
            <strong><p>El problema es que cuando pones en práctica estas ideas en el mundo real empiezan a surgir los
                problemas de mantenimiento.</p></strong>
            <p>Añadimos tal cantidad de complejidad accidental que el proyecto en unas pocas semanas o meses se nos va
                de las manos.</p>
            <p><strong>Diseñar software centrándote en librerías y frameworks es como cocinar usando la Thermomix. </strong></p>
                <p>Ser un verdadero
                chef profesional es otra cosa.</p>
            <p><strong>Hablo sobre todo esto (y mucho más) en mi newsletter. Además, al suscribirte recibes gratis una guía con con 5 principios fundamentales de Ingeniería y Artesanía del Software que todo developer debería conocer.</strong></p>
            <p>Únete gratis a las miles de personas que han descubierto una forma diferente de entender la
                programación. Eso sí, si tienes la piel fina, mejor no te suscribas.</p>
            <Newsletter hideEntry={true}/>
            <h2 className={styles.subtitleWithIcon}>Ser un verdadero Programador Senior es otra historia</h2>
            <p>El significado de la palabra senior no ha cambiando demasiado durante los últimos 20 años.</p>
            <p><strong>Aún hoy en día en muchas empresas a los developers se les considera seniors (o se consideran
                ellos mismos) por el simple hecho de llevar “n años” en la industria, sin tener en cuenta su
                conocimiento.</strong></p>

            <p>Y no me refiero solo a sus habilidades técnicas, hay soft skills que también se esperan de un programador
                experimentado, especialmente las relacionadas con la comunicación. Y si, el código también comunica.</p>

            <p><strong>Para esto es fundamental entender cómo funciona el negocio, cómo hace dinero, dónde se aporta
                valor y dónde no.</strong></p>

            <p>A ver, no estoy diciendo que llevar años en la industria no sea necesario.</p>

            <p><strong>Sin lugar a dudas lo es, no hay mejor aprendizaje que sufrir las calamidades del paso del tiempo
                en los proyectos para entender la importancia de saber escribir código de calidad.</strong></p>

            <p>Eso solo se consigue con horas de vuelo y, como diría Nassim Taleb, con Skin in the game. Sufriendo las
                consecuencias en tu propia piel. No hay otra.</p>

            <p><strong>Ahora bien, hay una enorme diferencia entre 10 años de experiencia y un año de experiencia
                repetido 10 veces.</strong></p>

            <p>No es lo mismo 10 años de aprendizaje constante trabajando en varios proyectos, con diferentes lenguajes,
                tecnologías y paradigmas, y rodeado de desarrolladores con mucho nivel.</p>

            <p><strong>Que pasar 10 años trabajando en la misma empresa, con un equipo mediocre y resolviendo siempre el
                mismo tipo de problemas, en un proyecto que hace aguas, sin tests y plagado de malas prácticas.</strong>
            </p>

            <p>Esto, después de poco tiempo, limita tu capacidad de aprendizaje. O lo que es peor, consolida una forma
                de programar que no te llevará muy lejos en tu carrera.</p>

            <p><strong>No te digo que estés saltando de empresa cada poco tiempo, eso también es un error.</strong></p>

            <p>Debemos de convivir el tiempo suficiente con nuestro propio código para sufrir en nuestra piel las
                decisiones que tomamos.</p>

            <p><strong>Lo que sí te recomiendo es que te expongas y practiques. Sal de tu zona de confort y enfréntate a
                problemas y retos diferentes.</strong></p>

            <p>No dejes de formarte, la vida es un continuo aprendizaje.</p>

            <p><strong>Mejora tu inglés, tus habilidades de comunicación y sobre todo tu técnica de
                programación.</strong></p>

            <p>Con las dos primeras no podemos ayudarte. En lo que sí podemos ayudarte es a convertirte en mejor
                programador.</p>
            <p><strong>Únete gratis a las miles de personas que han descubierto una forma diferente de entender la programación. Eso sí, si tienes la piel fina, mejor no te suscribas.</strong></p>
            <Newsletter hideEntry={true}/>
        </div>
    )
}

export async function generateMetadata({params}: { params: { slug: string }; }) {
    return blogMetadata();
}



