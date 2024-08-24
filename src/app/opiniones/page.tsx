import styles from '../home.module.css';
import Link from "next/link";
import {Routes} from "@/app/routes";

export default async function Legal() {
    return (
        <div className={styles.container}>
            <h2 className={styles.subtitle}>Todas estas opiniones son inventadas </h2>
            <p>Así que mejor que no te creas nada... </p>
            <p><strong>Algunas opiniones no solicitadas sobre Miguel A. Gómez y Software Crafters Academy: </strong></p>
            <blockquote>
                <p>Buenas tardes, Miguel:</p>

                <p>Acabo de terminar el curso de Testing Sostenible con Typescript.</p>

                <p>Lo compré en septiembre gracias al budget de formación de la empresa. Trabajo en Ironhack. Así que me ha llevado la friolera de 6 meses jaja... pero cuando tienes niños pequeños no dispones de mucho tiempo libre. Pero bueno, aunque mi dedicación al curso ha sido intermitente, no he dejado de avanzar. También he tratado no sólo de resolver las katas y ver los videos si no de asimilar los conceptos que subyacen a lo largo de todo el curso, que son muchos y muy profundos: estructura de tests, casos de uso, mocking, value objects, patrones, premisa de prioridad de transformación, inyección de dependencias, simetría en las clases, etc.</p>

                <p>La verdad es que durante el curso he tenido como material de referencia tu libro de Clean Javascript que compré creo que por 2020 (y que vuelvo a él con relativa frecuencia pues me ayuda con los conceptos básicos) así como el de Código Sostenible de Carlos, mucho más profundo y denso.</p>

                <p>No sé si habrá sido intencional pero el caso es que las 3 cosas se complementan muy bien y he ido saltando de uno a otro para afianzar los contenidos. Supongo que soy de la vieja escuela, estudié ingeniería industrial y necesito leer también en papel, sobre todo cosas de requieren tomar notas, profundizar, etc. De hecho me parecería una muy buena idea lanzar cursos con contenido online pero que tuviesen algún tipo de soporte físico, aunque fuese a modo de cuadernito donde se profundizase en los conceptos que tratan de abordar los ejercicios. Aunque supongo que esto es complicado comercialmente...</p>

                <p>En cuanto al curso, lo que más me ha ayudado ha sido lo siguiente:</p>

                <ul>
                    <li>Refactorización de tests: considerar los tests como código de producción y refactorizarlos ha sido para mi toda una revolución. Usar factorías ha sido algo que desde el minuto uno he incorporado a mi día a día en el trabajo.</li>
                    <li>Casos de uso: plantear correctamente los casos de uso y hablar el lenguaje del negocio también me ha parecido un salto cualitativo.</li>
                    <li>Herramientas del IDE para refactorización: sabía que existía pero no lo había usado nunca xD. Aunque yo uso VS Code y ciertamente WebStorm parece muy superior.</li>
                    <li>Kata CSV filter: esta me pareció buenísima, sobre todo por el resultado que obtienes al final cuando vas abordando el desarrollo con buenas prácticas.</li>
                    <li>Value Objects: llevaba tiempo intentando interiorizar estos conceptos de DDD y me ha encantado la kata de word wrap. Tomé una aproximación más funcional a raíz de la charla de Ricardo Borillo en MadridJS donde tocó esto entre otras cosas. Aunque estoy intentando también incorporar OOP a mi trabajo, actualmente nuestra base de código no usa este enfoque.</li>
                    <li>Patrones de diseño: también llevo meses interesándome por los patrones de diseño y me ha ayudado mucho vuestro ejemplo en la última kata donde se utiliza el patrón repository.</li>
                </ul>

                <p>En cuanto a conceptos en los que me gustaría profundizar más:</p>

                <ul>
                    <li>Mocking: yo antes usaba mucho mocks en lugar de spys y ahora después del curso estoy usando vuestra aproximación pero qué mockear y qué no mockear me genera dudas aún.</li>
                    <li>Aunque sé que quizás no es el scope del curso pero ver algo de estrategias de testing de front estaría genial también.</li>
                </ul>

                <p>Mi siguiente paso será atacar los materiales complementarios que habéis ido sacando y después ponerme con el curso de Diseño Sostenible que compré en noviembre (este ya con mi budget xD).</p>

                <p>Solo quería agradeceros vuestro trabajo y animaros a seguir adelante. Realmente es muy necesario. Después de 9 años programando y aunque leo mucha documentación en inglés me di cuenta hace un par de años que algunos conceptos necesitaba comprenderlos en mi lengua materna sobre todo yo que aunque tengo formación de ingeniería no he estudiado nada relacionado con la informática desde un punto de vista conceptual.</p>

                <p>Bueno perdona por el rollo 😅 y en resumen, muchas gracias!</p>

                <p>Un fuerte abrazo<br/>Juanan</p>

            </blockquote>
        </div>
    );
}

