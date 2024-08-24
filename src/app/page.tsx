import {BlogComponent, blogMetadata} from "@/app/components/server/home/BlogComponent";
import styles from './home.module.css';
import {Newsletter} from "@/app/components/client/newsletter/newsletter";

export default async function Home({params}: { params: { slug: string }; }) {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Software Crafters Academy</h1>
            <Newsletter hideEntry={true}/>
            <h2 className={styles.subtitle}>Formaciones de alto nivel para Developers Profesionales</h2>
            <p>A la mayoría de los desarrolladores nos han enseñado a programar mal... y muchos ni siquiera lo saben.</p>
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
            <strong><p>Diseñar software usando librerías y frameworks es como cocinar usando la Thermomix, cocinar como
                un chef profesional no es eso.</p></strong>
            <p>Ser un verdadero programador senior es otra cosa.</p>

            <Newsletter hideEntry={true}/>
        </div>
    )
}

export async function generateMetadata({params}: { params: { slug: string }; }) {
    return blogMetadata();
}



