import styles from '../home.module.css';
import opinionStyle from './opinions.module.css';
import {Newsletter} from "@/app/components/client/newsletter/newsletter";
export default async function Opinions() {
    return (
        <div className={styles.container}>
            <h2 className={styles.subtitle}>Opiniones que podrían ser inventadas... </h2>
            <p><strong>... así que mejor que no te creas nada. </strong></p>
            <p>Algunas opiniones no solicitadas sobre Miguel A. Gómez y Software Crafters Academy. Aquí encontrarás
                testimonios sobre la newsletter, el libro, los cursos, los bonus… Todo sin un orden concreto. </p>
            <Newsletter hideEntry={true}/>
            <blockquote className={opinionStyle.opinion}>
                <p>No recuerdo bien como llegué a tu Newsletter pero es la única que he leído desde que uso internet
                    desde principios del 2000... </p>
            </blockquote>
            <p>Maxi Alaniz - Analista de Sistemas y Programador</p>
            <blockquote className={opinionStyle.opinion}>
                <p>Miguel, acabo de terminar el curso de Testing Sostenible con Typescript.</p>
                <p>Lo compré en septiembre gracias al budget de formación de la empresa. Trabajo en Ironhack.</p>
                <p>Me ha llevado la friolera de 6 meses jaja... pero cuando tienes niños pequeños no dispones de mucho
                    tiempo libre. Pero bueno, aunque mi dedicación al curso ha sido intermitente, no he dejado de
                    avanzar.</p>
                <p> También he tratado no sólo de resolver las katas y ver los videos si no de asimilar los conceptos
                    que subyacen a lo largo de todo el curso, que son muchos y muy profundos: </p>
                <p>Estructura de tests, casos de uso, mocking, value objects, patrones, premisa de prioridad de
                    transformación, inyección de dependencias, simetría en las clases, etc.</p>
                <p>La verdad es que durante el curso he tenido como material de referencia tu libro de Clean Javascript
                    que compré creo que por 2020 (y que vuelvo a él con relativa frecuencia pues me ayuda con los
                    conceptos básicos) así como el de Código Sostenible de Carlos, mucho más profundo y denso.</p>
                <p>No sé si habrá sido intencional pero el caso es que las 3 cosas se complementan muy bien y he ido
                    saltando de uno a otro para afianzar los contenidos. Supongo que soy de la vieja escuela, estudié
                    ingeniería industrial y necesito leer también en papel, sobre todo cosas de requieren tomar notas,
                    profundizar...</p>
                <p>En cuanto al curso, lo que más me ha ayudado ha sido lo siguiente:</p>
                <ul>
                    <li>Refactorización de tests: considerar los tests como código de producción y refactorizarlos ha
                        sido para mi toda una revolución. Usar factorías ha sido algo que desde el minuto uno he
                        incorporado a mi día a día en el trabajo.
                    </li>
                    <li>Casos de uso: plantear correctamente los casos de uso y hablar el lenguaje del negocio también
                        me ha parecido un salto cualitativo.
                    </li>
                    <li>Herramientas del IDE para refactorización: sabía que existía pero no lo había usado nunca xD.
                        Aunque yo uso VS Code y ciertamente WebStorm parece muy superior.
                    </li>
                    <li>Kata CSV filter: esta me pareció buenísima, sobre todo por el resultado que obtienes al final
                        cuando vas abordando el desarrollo con buenas prácticas.
                    </li>
                    <li>Value Objects: llevaba tiempo intentando interiorizar estos conceptos de DDD y me ha encantado
                        la kata de word wrap...
                    </li>
                    <li>Patrones de diseño: también llevo meses interesándome por los patrones de diseño y me ha ayudado
                        mucho vuestro ejemplo en la última kata donde se utiliza el patrón repository.
                    </li>
                </ul>
                <p>Mi siguiente paso será atacar los materiales complementarios que habéis ido sacando y después ponerme
                    con el curso de Diseño Sostenible que compré en noviembre (este ya con mi budget xD).</p>
                <p>Solo quería agradeceros vuestro trabajo y animaros a seguir adelante. Realmente es muy necesario.</p>
                <p> Después de 9 años programando y aunque leo mucha documentación en inglés me di cuenta hace un par de
                    años que algunos conceptos necesitaba comprenderlos en mi lengua materna sobre todo yo que aunque
                    tengo formación de ingeniería no he estudiado nada relacionado con la informática desde un punto de
                    vista conceptual.</p>
                <p>Bueno perdona por el rollo 😅 y en resumen, muchas gracias!</p>
                <p>Un fuerte abrazo<br/>Juanan</p>
            </blockquote>
            <p>Juan Antona - Ingeniero de Software</p>

            <blockquote className={opinionStyle.opinion}>
                <p>Una de las mejores newsletter que he leído en mucho tiempo, ¡gracias!</p>
            </blockquote>
            <p>Paula Quitián - Developer</p>

            <blockquote className={opinionStyle.opinion}>
                <p>Miguel, tu curso ha sido la mejor inversión que he hecho en todos los años que llevo invirtiendo en
                    formación. </p>
                <p>Lo habéis clavado porque me está explotando la cabeza con muchas cosas que tengo la sensación que
                    debería haber controlado desde hace mucho tiempo</p>
            </blockquote>
            <p>Luis del Amo - Full Stack Developer</p>

            <blockquote className={opinionStyle.opinion}>
                <p>Me ha llevado tiempo y esfuerzo pero por fin he completado el curso de Testing. He de decir que la
                    calidad es enorme, no me imagino la cantidad de tiempo que les ha llevado hacerlo</p>
            </blockquote>
            <p>Kevin Hierro - Artesano de Software (wolfremium.dev)</p>

            <blockquote className={opinionStyle.opinion}>
                <p>Estoy encantada con tus emails.. me gusta mucho el tono directo, desenfadado y provocador en el que
                    te diriges a tus lectores.</p>
            </blockquote>
            <p>Carolina Manzanares - Developer</p>

            <blockquote className={opinionStyle.opinion}>
                <p>Siento que he mejorado mucho este último año gracias a Testing Sostenible y ahora con este último
                    curso de Ingeniería y Artesanía del Software.</p>
                <p> He profundizado en Clean Code, he descubierto DDD y por fin he aprendido TDD bien.</p>
                <p> Con más de 10 años de experiencia no puedo evitar sentir el síndrome del impostor pero ahora creo
                    que poco a poco me estoy acercando a un senior de verdad.</p>
            </blockquote>
            <p>Alex Iraola - Full Stack Developer</p>

            <blockquote className={opinionStyle.opinion}>
                <p>Hola Miguel, geniales tus correo y mejor el curso...</p>
            </blockquote>
            <p>Edar José Blanco</p>

            <blockquote className={opinionStyle.opinion}>
                <p>Solamente quería decirte que recientemente he finalizado el curso de Diseño Sostenible y quería darte
                    las gracias por la formación.</p>
                <p>Comentarte que soy también antiguo alumno del curso de Testing Sostenible.</p>
                <p>Empecé a principios del año pasado y desde entonces tengo la sensación de haber encontrado un pequeño
                    tesoro con vosotros en términos de aprendizaje.</p>
                <p>Cuando comentas en las newsletter la idea de subir de nivel como desarrollador, creo que con vuestra
                    ayuda siento que lo estoy consiguiendo paso a paso.Consciente que me queda mucho todavía, pero sé
                    que estoy en el buen camino. </p>
                <p>Soy desde el inicio un "early adopter", y pienso apuntarme a todos los programas formativos que
                    publiquéis.</p>
                <p>Desde aquí os animo a seguir porque creo sinceramente que en mi caso me estáis ayudando
                    muchísimo. </p>
                <p>Muchas gracias.</p>
            </blockquote>
            <p>Marcos Rodrigo - Desarrollador de Sistemas</p>

            <blockquote className={opinionStyle.opinion}>
                <p>Buenas señor! Primero que nada, los elogios y toda esa movida XD.</p>
                <p>Mil felicidades por todos los cursos y el libro de Clean Javascript. Es 100% calidad. Estoy suscrito
                    a tus dos cursos, he comprado tu libro tanto en digital como en físico, y creo que tus emails son la
                    única newsletter que me suelo leer...</p>
            </blockquote>
            <p>Killian Jimenez - Developer</p>

            <blockquote className={opinionStyle.opinion}>
                <p>El curso de Testing es una verdadera joya para cualquier profesional que desee subir de nivel.</p>
            </blockquote>
            <p>Aitor Reviriego - Software Developer</p>
            <blockquote className={opinionStyle.opinion}>
                <p>El módulo 2 del curso de Testing Sostenible me ha fascinado. Me ha resuelto las dudas que tenía con
                    respecto a spies, stubs y mocks.</p>
            </blockquote>
            <p>Manuel Pérez - Frontend Developer</p>
            <blockquote className={opinionStyle.opinion}>
                <p>Estoy haciendo el curso de Diseño Sostenible, y he convencido a mi jefe para que nos comprara a un
                    compañero y a mí el de Testing Sostenible antes de que lo cerrárais...</p>
                <p>La verdad es que el curso de Diseño Sostenible me está encantado. Y no solo a mí, somos 6 compañeros
                    de GMV los que lo estamos haciendo a la vez (unos más rápido que otros, cada uno a su ritmo) pero
                    gusta, gusta 😊.</p>
            </blockquote>
            <p>Belén Moreno - Developer</p>

            <blockquote className={opinionStyle.opinion}>
                <p>La sección del módulo 3 de Testing Sostenible, TDD como herramienta de diseño, es increíble. </p>
                <p>Ayuda mucho a entender cómo crear tests que validen los requerimientos del negocio. Sois unos
                    cracks</p>
            </blockquote>
            <p>Leonardo Omaña - Frontend Developer</p>
            <Newsletter hideEntry={true}/>
            <blockquote className={opinionStyle.opinion}>
                <p>Mi enhorabuena por el curso, me está siendo muy útil e interesante, incluso en conceptos que ya creía
                    saber estoy descubriendo cosas nuevas</p>
            </blockquote>
            <p>Darío Beiró - Frontend Developer</p>
            <blockquote className={opinionStyle.opinion}>
                <p>Tengo los 2 cursos y tu libro de clean Javascript. Me parecen obras de arte...</p>
                <p>Muchas gracias por tu dedicación y dar la máxima calidad en tus cursos.</p>
            </blockquote>
            <p>Pedro La Rosa - Developer</p>
            <blockquote className={opinionStyle.opinion}>
                <p>Soy Alex, alumno del curso de testing sostenible con TypeScript y tengo que decir que fue una gozada
                    de curso aunque mi expertise está más enfocado en Backend y lenguajes JVM (Java y Kotlin) pero una
                    vez más se confirma que los mejores conocimientos y aprendizajes son agnósticos del lenguaje de
                    programación, ya que no deja de ser un detalle de implementación para solucionar un "problema" de
                    negocio.</p>
                <p>También disfruto mucho de tus correos de la newsletter y aunque no lo necesites, te animo a continuar
                    haciéndolo!.</p>
            </blockquote>
            <p>Alejandro Torres - Backend Developer</p>
            <blockquote className={opinionStyle.opinion}>
                <p>Soy alumno de tu curso de Diseño Sostenible y quería felicitarte por el contenido del mismo, las
                    explicaciones claras y concisas y la calidad del mismo en general, pero además debo decir que
                    disfruto los mails que llegan desde tu newsletter, son una genialidad!</p>
                <p>Me identifico mucho con la frase de "Escribir código para personas, no para máquinas", dado que es
                    algo que he venido aplicando, y antes de ver tu curso, simplemente no sabía como explicarle a mi
                    equipo, el "porqué" de cada comentario en mis code reviews, sobre todos esos orientados a mejorar
                    legibilidad y escalabilidad.</p>
            </blockquote>
            <p>Gustavo Dominguez - Developer Lead</p>

            <blockquote className={opinionStyle.opinion}>
                <p>Hola Miguel, recibo tus emails desde hace bastante tiempo. Por un error garrafal al quedarse sin
                    espacio mi cuenta Gmail, eliminé sin querer tus emails que atesoraba fervientemente. Tendrás dichas
                    publicaciones en algún blog, donde poderlos releer de vez en cuando, como solía hacerlo.?
                </p>
                <p> No imaginas el dolor que me causó eliminar esos correos de tu newsletter.</p>
                <p>Muchas gracias.</p>
            </blockquote>
            <p>Marcos Rodrigo - Developer</p>
            <blockquote className={opinionStyle.opinion}>
                <p>Si eres tan bueno haciendo tus cursos como tus mails, valen cada céntimo! 👌</p>
            </blockquote>
            <p>Ismael Berón - Developer</p>
            <blockquote className={opinionStyle.opinion}>
                <p>Genial email sobre como ser mejor profesional...</p>
                <p>Gracias por todo este material de alto valor que compartes.</p>
            </blockquote>
            <p>Armando Cruz - Developer</p>
            <blockquote className={opinionStyle.opinion}>
                <p>Hola Miguel, Me gustan mucho las historias que envías. Aprendo mucho de ellas y aunque nunca he
                    contratado un curso encuentro gran valor en tu newsletter y lo que haces.</p>
            </blockquote>
            <p>Fernando Palma - Developer</p>
            <blockquote className={opinionStyle.opinion}>
                <p>Quería agradecer por su contenido de la Newsletter, además de qué disfrute mucho el libro de "Clean
                    JavaScript", recomendado por uno de nuestros arquitectos como manera eficiente de aprender buenas
                    prácticas.</p>
            </blockquote>
            <p>Tomas Gonzalez - Developer</p>
            <blockquote className={opinionStyle.opinion}>
                <p>Me encantan tus email diarios y me ayudan mucho a reflexionar...</p>
            </blockquote>
            <p>Nicolás Mayorga - Estudiante de Ingeniería</p>
            <blockquote className={opinionStyle.opinion}>
                <p>Hola, solo quería decirte que me parecen super interesantes tus consejos muchas gracias por tu
                    valiosa ayuda.</p>
            </blockquote>
            <p>Maximiliano Valeta - Developer</p>
            <blockquote className={opinionStyle.opinion}>
                <p>Hola.. te leo todos los días.. gracias por todo</p>
            </blockquote>
            <p>Luis Corales - Developer</p>
            <blockquote className={opinionStyle.opinion}>
                <p>Antes que nada, darte la enhorabuena por el contenido que generas que considero que es de muy buena
                    calidad...</p>
            </blockquote>
            <p>Antonio J. Galisteo - Developer</p>
            <blockquote className={opinionStyle.opinion}>
                <p>Me encantan tus mails. Me mola mucho el contenido de los mismos, aprendo mucho con ellos, pero con
                    este me siento muy identificado, yo siempre uso el simil del futbol cuando hablo con mi equipo y
                    este especialmente me ha recordado muchas de las charlas que tenemos en las dailies. Siempre les
                    digo que se juega como se entrena.</p>
            </blockquote>
            <p>Carlos García - Developer</p>
            <blockquote className={opinionStyle.opinion}>
                <p>Mi nombre es Sergio Gil, un fiel seguidor. Estudié Ing. Informática en Almería y ya con más de 10
                    años de experiencia pero con vuestro contenido, un plus para que esa experiencia sea real.</p>
                <p>Compré tu libro de JS y los dos de Carlos (TDD y Código Sostenible), así como las dos formaciones que
                    habéis sacado.</p>
                <p>He de confesarte que he sido más fiel al formato en papel que al vídeo, que los tengo a 1/3 pero yo
                    siempre colaboré con vosotros en lo que saquéis porque me parece un material excepcional.</p>
            </blockquote>
            <p>Sergio Gil Martinez - Ingeniero de Software</p>
            <blockquote className={opinionStyle.opinion}>
                <p>Ya he acabado el curso, y nada más que felicitaros por el gran trabajo que habéis hecho, espectacular
                    y un boom mental!! Ahora a hacer pet projects practicando lo aprendido</p>
                <p>Enhorabuena, un cursazo de 10</p>
            </blockquote>
            <p>Achraf - Frontend Developer</p>

            <blockquote className={opinionStyle.opinion}>
                <p>Felicidades a ti y a Carlos Blé por el curso porque es una maravilla...</p>
            </blockquote>
            <p>Alberto Morales - Fullstack Developer</p>

            <blockquote className={opinionStyle.opinion}>
                <p>Aunque de momento voy por la mitad del curso (repito los módulos para comprender mejor la teoría), el
                    bonus de regalo: backing testing ha sido de gran ayuda. Trata los conceptos que estamos aprendiendo
                    en el curso y en mi caso me ha permitido ver como se implementan los repositorios en TS (métodos
                    asincronos haciendo uso de Promise).</p>
                <p> Siempre he participado en proyectos cuyo back es java y en el curso es TS. Este bonus me ha
                    permitido entender mucho mejor lo que explicais en el curso, son un gran aporte.</p>
            </blockquote>
            <p>Josecho- Backend Developer</p>
            <blockquote className={opinionStyle.opinion}>
                <p>He terminado el de bonus de frontend y Miguel me ha parecido E X C E L E N T E. Maravilloso
                    trabajo. </p>
                <p> Es cierto que para los que no estamos al día de React a veces pasa rápido aspectos del framework,
                    pero ciertamente no me ha importado, al contrario, me ha encantado que fuera al grano con lo que me
                    interesaba: como hacer tests baratos que cubran la mayoría de funcionalidad y nos permita hacer el
                    refactor.</p>
                <p>Y también me ha parecido genial ver un proyecto frontend que usa DDD. Muy inspirador.</p>
            </blockquote>
            <p>Javi G. C. - Developer</p>

            <blockquote className={opinionStyle.opinion}>
                <p>Pues terminado Testing Sostenible!! Me ha gustado mucho cómo lo contáis. Enhorabuena!</p>
            </blockquote>
            <p>Juanma- Developer</p>

            <blockquote className={opinionStyle.opinion}>
                <p>Primero muchas gracias por el recordatorio en la newsletter 📬 , segundo gracias por el bonus del
                    property based testing, me gustó mucho, no conocía "fast-check" 🫶</p>
            </blockquote>
            <p>Luis del Amo - Fullstack Developer</p>

            <blockquote className={opinionStyle.opinion}>
                <p>Yo también lo he acabado Testing Sostenible. Está genial, felicidades porque se nota que está hecho
                    con mucha intención (iba a decir amor,jeje) de mejorar nuestro código todo lo posible. </p>
                <p>A mí personalmente me cuesta extrapolarlo al FrontEnd, a componentes más visuales, y a secciones
                    formadas de otros componentes más pequeños pero me he quedado con el TDD -Outside-In y con que casi
                    mis tests de lo que llamamos secciones (formadas por módulos formados por átomos) casi podrían ser
                    tests de integración. </p>
                <p>Y sobre todo, con que los tests deben cumplir las reglas de negocio, no las mías,jeje... Muchas
                    gracias! </p>
            </blockquote>
            <p>Itziar ZG - Frontend Developer</p>

            <blockquote className={opinionStyle.opinion}>
                <p>Este curso está de lokos. Ojalá hubiese existido cuando empecé.</p>
                <p>Para codear como un pro y adelantar por la derecha a mucha gente. Y lo genial es que todo el conocimiento traspasa al lenguaje. </p>
            </blockquote>
            <p>Kevin Hierro - Artesano de Software</p>
            <Newsletter hideEntry={true}/>
        </div>
    );
}

