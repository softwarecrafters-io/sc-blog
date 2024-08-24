import fs from 'fs';
import path from 'path';
import {remark} from 'remark';
import htmlHtml from 'remark-html';
import {Newsletter} from "@/app/components/client/newsletter/newsletter";
import styles from './legal.module.css';

export default async function Legal() {
    return (
        <div className={styles.container}>
            <h1>Aviso legal y Política de Privacidad</h1>
        <p>Aviso legal, política de privacidad, información de cookies y demás burocracia que nos obligan a incluir.</p>
            <strong>Este aviso legal define las condiciones establecidas para los siguientes dominios:</strong>
            <ul>
                <li><a href={'https://softwarecrafters.io'} target={'_blank'}>softwarecrafters.io</a></li>
                <li><a href={'https://motivacion.dev'} target={'_blank'}>motivacion.dev</a></li>
                <li><a href={'https://cleanjavascript.es'} target={'_blank'}>cleanjavascript.es</a></li>
                <li><a href={'https://testingsostenible.com'} target={'_blank'}>testingsostenible.com</a></li>
            </ul>
            <p>Por cierto, en la web <a href={'https://softwarecrafters.io'} target={'_blank'}>softwarecrafters.io</a> no usamos cookies, en el resto si. Si te interesan saber cuales son, las detallamos un poco más abajo.</p>
            <strong>Titular de los sitios web softwarecrafters.io, cleanjavascript.es <br/> y testingsostenible.com</strong>
            <ul>
                <li><strong>Identidad del Responsable:</strong>&nbsp;Software Crafters, SLU</li>
                <li><strong>Nombre comercial:</strong>&nbsp;Software Crafters</li>
                <li><strong>NIF/CIF:</strong>&nbsp;B-76730373</li>
                <li><strong>Dirección</strong>: C/ Barranco del Inglés, 6B – Santa Cruz de Tenerife (38670)</li>
                <li><strong>Correo electr&oacute;nico:</strong> miguel.gomez@softwarecrafters.io&nbsp;</li>
                <li><strong>Actividad:</strong>&nbsp;Programaci&oacute;n, consultor&iacute;a y otras actividades relacionadas con la inform&aacute;tica.</li>
                <li><strong>Inscrita en el Registro Mercantil</strong>&nbsp;de Sta.Cruz de Tenerife, Tomo 3494., Libro 0, Folio 81, Hoja TF-58805, Inscripci&oacute;n 1&ordf; .</li>
            </ul>
            <p>Al usar este sitio web se entiende que El Usuario (en adelante, tú) ha leído, entendido y aceptado
                íntegramente y sin reservas esta página y demás avisos o instrucciones que figuran en este sitio
                web, comprometiéndose a hacer un buen uso del mismo conforme a la ley, la moral y el orden
                público.</p>
            <p>Nos reservamos el derecho de modificar en cualquier momento los términos de este sitio web y demás
                avisos legales, por lo que si esto te preocupa, te recomendamos revisar esta información
                periódicamente.</p>
            <p>En caso de que no estés de acuerdo, deberás abstenerte de utilizar el sitio web.</p>
            <h2>Exención de responsabilidad</h2>
            <p>En este sitio web&nbsp;existen enlaces a sitios web de terceros sobre los que no asumimos
                responsabilidad.</p>
            <h2>Propiedad intelectual</h2>
            <p>Está prohibido cualquier uso del contenido de este sitio web sin la autorización escrita de
                Software Crafters.</p>
            <h2>Comunicaciones comerciales</h2>
            <p>Si recibes mensajes publicitarios de Software Crafters y deseas dejar de hacerlo, debes comunicarlo en
                miguel.gomez@softwarecrafters.io.</p>
            <h2>Política de privacidad</h2>
            <p>Cumplimos el Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo relativo a la protección
                de las personas físicas. También cumplimos con otras leyes, aunque eso no nos obligan a decirlo.</p>
            <h3><strong>Responsable del tratamiento</strong></h3>
            <p>Los datos personales recabados a través de este sitio web serán incorporados un fichero
                responsabilidad de Software Crafters.</p>
            <h3><strong>Principio de calidad</strong></h3>
            <p>El Usuario será responsable de cualquier daño o perjuicio que ocasione a Software Crafters o a cualquier tercero
                por rellenar los formularios de este sitio web con datos falsos, inexactos o con datos de
                terceros.</p>
            <h3><strong>Finalidad del tratamiento</strong></h3>
            <p>Nuestro sitio web obtiene los datos personales mediante la recepción de formularios y por medio de
                correo electrónico, para:</p>
            <ul>
                <li>Enviar comunicaciones comerciales relacionadas con los servicios de Software Crafters.</li>
                <li>Atender la petición de información y prestación de los servicios ofrecidos.</li>
            </ul>
            <h3><strong>Recopilación de información</strong></h3>
            <p>La única información que recopilamos son los datos que nos suministras al rellenar un formulario o al
                enviarnos un mensaje de correo electrónico.</p>


            <h3><strong>Derechos de los usuarios</strong></h3>


            <p>Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, portabilidad y
                limitación, escribiendo a miguel.gomez@softwarecrafters.io.</p>


            <h3><strong>Plazo de conservación</strong></h3>


            <p>Conservamos los datos durante el tiempo estrictamente necesario para las finalidades del tratamiento
                para cuyo uso hayan sido proporcionados y siguiendo como criterio el principio de minimización de
                datos contemplado en la normativa aplicable.</p>


            <p>En caso de ejercer tu derecho de supresión, tus datos serán bloqueados y conservados de forma
                restringida a disposición de las autoridades competentes durante el tiempo y a los efectos legales
                establecidos en la normativa aplicable. Transcurrido este plazo se procederá a la eliminación de los
                mismos.</p>


            <h3><strong>Legislación aplicable y Fuero</strong></h3>


            <p>La ley aplicable en caso de disputa o conflicto de interpretación de los términos que conforman estas
                Condiciones de Uso, así como cualquier cuestión relacionada con los servicios del Portal, será la
                ley española.</p>


            <p>Para la resolución de cualquier controversia que pudiera surgir con ocasión del uso del Portal y sus
                servicios, las partes acuerdan someterse a la jurisdicción de los Juzgados y Tribunales de la ciudad
                de Madrid (España) y sus superiores jerárquicos, con expresa renuncia a otros fueros si lo tuvieren
                y fueran diferentes de los reseñados.</p>


            <h2><em>Cookies</em></h2>

            <p>La web <a href={'https://softwarecrafters.io'} target={'_blank'}>softwarecrafters.io</a> no usa cookies, en el resto si. </p>

            <p>Las <em>cookies</em> que usamos son de Google, Facebook y LinkedIn que me sirven para mostrar
                publicidad a usuarios que se parezcan a ti. En concreto, las siguientes:</p>


            <div className="cky-audit-table-element"><h5 >Necesarias</h5>
                <div className="cky-table-wrapper" id="cky-table-wrapper-necessary">
                    <table id="cky-anywhere-cookie-audit-table-necessary" className="cky-cookie-audit-table">
                        <thead>
                        <tr>
                            <th >Cookie</th>
                            <th>tipo</th>
                            <th>Duración</th>
                            <th>Descripción</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>PHPSESSID</td>
                            <td >https</td>
                            <td></td>
                            <td>This cookie is native to PHP applications.
                                The cookie is used to store and identify a users unique session ID for the purpose
                                of managing user session on the website. The cookie is a session cookies and is
                                deleted when all the browser windows are closed.
                            </td>
                        </tr>
                        <tr>
                            <td>cky-active-check</td>
                            <td>https</td>
                            <td>1 dia</td>
                            <td>CookieYes establece la cookie para
                                comprobar si el banner de consentimiento está activo en el sitio web.
                            </td>
                        </tr>
                        <tr>
                            <td>cookieyesID</td>
                            <td>https</td>
                            <td >1 año</td>
                            <td>Identificador único para visitantes
                                utilizado por CookieYes con respecto al consentimiento.
                            </td>
                        </tr>
                        <tr>
                            <td>cky-consent</td>
                            <td>https</td>
                            <td>1 año</td>
                            <td>CookieYes establece la cookie para
                                recordar el consentimiento del usuario para el uso de cookies en el sitio web.
                            </td>
                        </tr>
                        <tr>
                            <td>cookieyes-necessary</td>
                            <td>https</td>
                            <td>1 año</td>
                            <td>CookieYes establece esta cookie y
                                se utiliza para recordar el consentimiento de los usuarios para el uso de cookies en
                                la categoría Necesarias.
                            </td>
                        </tr>
                        <tr>
                            <td>cookieyes-functional</td>
                            <td>https</td>
                            <td>1 año</td>
                            <td>CookieYes establece esta cookie
                                y se utiliza para recordar el consentimiento de los usuarios para el uso de cookies
                                en la categoría Funcional.
                            </td>
                        </tr>
                        <tr>
                            <td>cookieyes-analytics</td>
                            <td>https</td>
                            <td>1 año</td>
                            <td>CookieYes establece esta cookie y
                                se utiliza para recordar el consentimiento de los usuarios para el uso de cookies en
                                la categoría Analíticas.
                            </td>
                        </tr>
                        <tr>
                            <td>cookieyes-performance</td>
                            <td>https</td>
                            <td>1 año</td>
                            <td>CookieYes establece esta cookie
                                y se utiliza para recordar el consentimiento de los usuarios para el uso de cookies
                                en la categoría Rendimiento.
                            </td>
                        </tr>
                        <tr>
                            <td>cookieyes-advertisement</td>
                            <td>https</td>
                            <td>1 año</td>
                            <td>CookieYes establece esta
                                cookie y se utiliza para recordar el consentimiento de los usuarios para el uso de
                                cookies en la categoría Anuncios.
                            </td>
                        </tr>
                        <tr>
                            <td>cky-action</td>
                            <td>https</td>
                            <td>1 año</td>
                            <td>CookieYes establece esta cookie y se
                                utiliza para recordar la acción realizada por el usuario.
                            </td>
                        </tr>
                        <tr>
                            <td>cookieyes-other</td>
                            <td>https</td>
                            <td>1 año</td>
                            <td>CookieYes sets this cookie to
                                remember the consent of users for the use of cookies in the Other category.
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <h5>Funcionales</h5>
                <div className="cky-table-wrapper" id="cky-table-wrapper-functional">
                    <table id="cky-anywhere-cookie-audit-table-functional" className="cky-cookie-audit-table">
                        <thead>
                        <tr>
                            <th>Cookie</th>
                            <th>tipo</th>
                            <th>Duración</th>
                            <th>Descripción</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>lang</td>
                            <td>https</td>
                            <td>session</td>
                            <td>Esta cookie se utiliza para almacenar las
                                preferencias de idioma de un usuario para ofrecer contenido en ese idioma almacenado
                                la próxima vez que el usuario visite el sitio web.
                            </td>
                        </tr>
                        <tr>
                            <td>bcookie</td>
                            <td>https</td>
                            <td>2 años</td>
                            <td>Esta cookie está configurada por linkedIn. El
                                propósito de la cookie es habilitar las funcionalidades de LinkedIn en la página.
                            </td>
                        </tr>
                        <tr>
                            <td>lidc</td>
                            <td>https</td>
                            <td>1 dia</td>
                            <td>Esta cookie la establece LinkedIn y se utiliza
                                para el enrutamiento.
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <h5>Analíticas</h5>
                <div className="cky-table-wrapper" id="cky-table-wrapper-analytics">
                    <table id="cky-anywhere-cookie-audit-table-analytics" className="cky-cookie-audit-table">
                        <thead>
                        <tr>
                            <th>Cookie</th>
                            <th>tipo</th>
                            <th>Duración</th>
                            <th>Descripción</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>_ga_RZTKTJ0WKY</td>
                            <td>https</td>
                            <td>2 años</td>
                            <td>Esta cookie es instalada por Google
                                Analytics.
                            </td>
                        </tr>
                        <tr>
                            <td>_ga</td>
                            <td>https</td>
                            <td>2 años</td>
                            <td>Esta cookie es instalada por Google Analytics. La
                                cookie se utiliza para calcular los datos de visitantes, sesiones y campañas y
                                realizar un seguimiento del uso del sitio para el informe de análisis del sitio. Las
                                cookies almacenan información de forma anónima y asignan un número generado
                                aleatoriamente para identificar visitantes únicos.
                            </td>
                        </tr>
                        <tr>
                            <td>_gid</td>
                            <td>https</td>
                            <td>1 dia</td>
                            <td>Esta cookie es instalada por Google Analytics.
                                La cookie se utiliza para almacenar información sobre cómo los visitantes usan un
                                sitio web y ayuda a crear un informe analítico de cómo está funcionando el sitio
                                web. Los datos recopilados, incluido el número de visitantes, la fuente de donde
                                provienen y las páginas visitadas de forma anónima.
                            </td>
                        </tr>
                        <tr>
                            <td>_gat_UA-200470740-1</td>
                            <td cky-i18n="cookies._gat_UA-200470740-1.type">https</td>
                            <td cky-i18n="cookies._gat_UA-200470740-1.duration">1 minute</td>
                            <td cky-i18n="cookies._gat_UA-200470740-1.description">Esta es una cookie de tipo patrón
                                establecida por Google Analytics, donde el elemento de patrón en el nombre contiene
                                el número de identidad único de la cuenta o sitio web con el que se relaciona.
                                Parece ser una variación de la cookie _gat que se utiliza para limitar la cantidad
                                de datos registrados por Google en sitios web de alto volumen de tráfico.
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <h5 cky-i18n="detail.tabItem.advertisement.title">Publicitarias</h5>
                <div className="cky-table-wrapper" id="cky-table-wrapper-advertisement">
                    <table id="cky-anywhere-cookie-audit-table-advertisement" className="cky-cookie-audit-table">
                        <thead>
                        <tr>
                            <th cky-i18n="auditTable.cookie">Cookie</th>
                            <th cky-i18n="auditTable.type">tipo</th>
                            <th cky-i18n="auditTable.duration">Duración</th>
                            <th cky-i18n="auditTable.description">Descripción</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>_fbp</td>
                            <td cky-i18n="cookies._fbp.type">https</td>
                            <td cky-i18n="cookies._fbp.duration">3 months</td>
                            <td cky-i18n="cookies._fbp.description">Facebook configura esta cookie para entregar
                                publicidad cuando están en Facebook o en una plataforma digital impulsada por
                                publicidad de Facebook después de visitar este sitio web.
                            </td>
                        </tr>
                        <tr>
                            <td>bscookie</td>
                            <td cky-i18n="cookies.bscookie.type">https</td>
                            <td cky-i18n="cookies.bscookie.duration">2 años</td>
                            <td cky-i18n="cookies.bscookie.description">Esta cookie es una cookie de identificación
                                del navegador establecida por los botones de compartir vinculados y las etiquetas
                                publicitarias.
                            </td>
                        </tr>
                        <tr>
                            <td>fr</td>
                            <td cky-i18n="cookies.fr.type">https</td>
                            <td cky-i18n="cookies.fr.duration">3 months</td>
                            <td cky-i18n="cookies.fr.description">Facebook establece la cookie para mostrar anuncios
                                relevantes a los usuarios y medir y mejorar los anuncios. La cookie también rastrea
                                el comportamiento del usuario en la web en sitios que tienen píxeles de Facebook o
                                complementos sociales de Facebook.
                            </td>
                        </tr>
                        <tr>
                            <td>YSC</td>
                            <td cky-i18n="cookies.YSC.type">https</td>
                            <td cky-i18n="cookies.YSC.duration">session</td>
                            <td cky-i18n="cookies.YSC.description">Estas cookies son establecidas por Youtube y se
                                utilizan para rastrear las vistas de videos incrustados.
                            </td>
                        </tr>
                        <tr>
                            <td>VISITOR_INFO1_LIVE</td>
                            <td cky-i18n="cookies.VISITOR_INFO1_LIVE.type">https</td>
                            <td cky-i18n="cookies.VISITOR_INFO1_LIVE.duration">5 months 27 dias</td>
                            <td cky-i18n="cookies.VISITOR_INFO1_LIVE.description">Youtube establece esta cookie. Se
                                utiliza para rastrear la información de los videos de YouTube incrustados en un
                                sitio web.
                            </td>
                        </tr>
                        <tr>
                            <td>IDE</td>
                            <td cky-i18n="cookies.IDE.type">https</td>
                            <td cky-i18n="cookies.IDE.duration">1 año 24 dias</td>
                            <td cky-i18n="cookies.IDE.description">Utilizado por Google DoubleClick y almacena
                                información sobre cómo el usuario utiliza el sitio web y cualquier otro anuncio
                                antes de visitar el sitio web. Se utiliza para presentar a los usuarios anuncios que
                                son relevantes para ellos de acuerdo con el perfil del usuario.
                            </td>
                        </tr>
                        <tr>
                            <td>test_cookie</td>
                            <td cky-i18n="cookies.test_cookie.type">https</td>
                            <td cky-i18n="cookies.test_cookie.duration">15 minutes</td>
                            <td cky-i18n="cookies.test_cookie.description">Esta cookie la establece doubleclick.net.
                                El propósito de la cookie es determinar si el navegador del usuario admite cookies.
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <h5 cky-i18n="detail.tabItem.other.title">Otros</h5>
                <div className="cky-table-wrapper" id="cky-table-wrapper-other">
                    <table id="cky-anywhere-cookie-audit-table-other" className="cky-cookie-audit-table">
                        <thead>
                        <tr>
                            <th cky-i18n="auditTable.cookie">Cookie</th>
                            <th cky-i18n="auditTable.type">tipo</th>
                            <th cky-i18n="auditTable.duration">Duración</th>
                            <th cky-i18n="auditTable.description">Descripción</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>UserMatchHistory</td>
                            <td cky-i18n="cookies.UserMatchHistory.type">https</td>
                            <td cky-i18n="cookies.UserMatchHistory.duration">1 mes</td>
                            <td cky-i18n="cookies.UserMatchHistory.description">Linkedin: se utiliza para rastrear a
                                los visitantes en múltiples sitios web, con el fin de presentar publicidad relevante
                                según las preferencias del visitante.
                            </td>
                        </tr>
                        <tr>
                            <td>AnalyticsSyncHistory</td>
                            <td cky-i18n="cookies.AnalyticsSyncHistory.type">http</td>
                            <td cky-i18n="cookies.AnalyticsSyncHistory.duration">1 mes</td>
                            <td cky-i18n="cookies.AnalyticsSyncHistory.description">No description</td>
                        </tr>
                        <tr>
                            <td>li_gc</td>
                            <td cky-i18n="cookies.li_gc.type">http</td>
                            <td cky-i18n="cookies.li_gc.duration">2 años</td>
                            <td cky-i18n="cookies.li_gc.description">No description</td>
                        </tr>
                        <tr>
                            <td>CONSENT</td>
                            <td cky-i18n="cookies.CONSENT.type">http</td>
                            <td cky-i18n="cookies.CONSENT.duration">16 años 6 meses</td>
                            <td cky-i18n="cookies.CONSENT.description">No description</td>
                        </tr>
                        <tr>
                            <td>yt-remote-device-id</td>
                            <td cky-i18n="cookies.yt-remote-device-id.type">https</td>
                            <td cky-i18n="cookies.yt-remote-device-id.duration">never</td>
                            <td cky-i18n="cookies.yt-remote-device-id.description">No description available.</td>
                        </tr>
                        <tr>
                            <td>yt-remote-connected-devices</td>
                            <td cky-i18n="cookies.yt-remote-connected-devices.type">https</td>
                            <td cky-i18n="cookies.yt-remote-connected-devices.duration">never</td>
                            <td cky-i18n="cookies.yt-remote-connected-devices.description">No description
                                available.
                            </td>
                        </tr>
                        <tr>
                            <td>wewlap.grsf.uuid</td>
                            <td cky-i18n="cookies.wewlap.grsf.uuid.type">http</td>
                            <td cky-i18n="cookies.wewlap.grsf.uuid.duration">1 hora</td>
                            <td cky-i18n="cookies.wewlap.grsf.uuid.description">No description</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <br/>
            <br/>
            <p><strong>Si te has leído esto imagínate lo que disfrutarás leyendo el newsletter:</strong></p>
            <Newsletter/>
        </div>
    );
}

async function getMarkdown() {
    const legalTerms = fs.readFileSync(path.join('./src/app/legal', 'legal.md')).toString();
    const legalTermsHtml = await remark().use(htmlHtml).process(legalTerms);

    return legalTermsHtml.toString();
}
