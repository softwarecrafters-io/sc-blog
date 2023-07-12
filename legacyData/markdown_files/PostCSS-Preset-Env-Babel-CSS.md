La definición oficial de **PostCSS Preset Env** dice:

> PostCSS Preset Env le permite convertir CSS moderno en algo que la mayoría de los navegadores pueden entender, determinando los polyfills<sup>(1)</sup> que necesita en función de sus navegadores de destino o entornos de tiempo de ejecución, utilizando cssdb<sup>(2)</sup>.

Lo primero que me llamó la atención de la definición es lo de **CSS moderno**, pero creo que encajaría mejor si dijera **"Funcionalidades CSS de la especificación"**. Espera, ¿eso qué quiere decir?

Pues que podemos utilizar las funcionalidades que se están definiendo en el CSSWG<sup>(3)</sup> antes de que acaben como un estándar de la W3C<sup>(4)</sup> y lo tengamos disponible en los navegadores.

## ¿Cómo funciona el estándar CSS?

El **CSS Working Group** es un grupo de personas profesionales de la web, la mayoría de ellas empleadas de las grandes marcas que están detrás de los navegadores, sistemas operativos y dispositivos, como Apple, Google, Microsoft, Adobe, Mozilla o Amazon, aquí os dejo un enlace a la lista completa de [miembros de la CSSWG](https://www.w3.org/Style/CSS/members/members.en.php3)

El foco de ese grupo de trabajo es estandarizar las funcionalidades de CSS, así como la definición de nuevas. Es aquí donde nos vamos a centrar. Esas nuevas funcionalidades en muchas ocasiones tardan mucho en llegar a los navegadores de los usuarios. Sí, sí, de los usuarios. Nosotros como freakis de la tecnología tenemos las últimas versiones de los navegadores, además tenemos más de uno para poder validar el correcto funcionamiento de nuestros desarrollos, pero los usuarios suelen tener el navegador instalado por defecto en los dispositivos y muchos de ellos no actualizan el software por miedo a perder configuraciones.

Aquí es donde en muchas ocasiones sentimos una gran frustración, vemos que aparecen nuevas e impresionantes funcionalidades en las que están trabajando, pero tardan en llegar al usuario.

## ¿Qué tiene que ver esto con Babel?

De igual forma que para CSS existe el CSSWG, para Javascript existe el **TC39**<sub>(5)</sub>, donde de forma similar, un grupo de personas debaten y definen las nuevas funcionalidades para el lenguaje de la web.

La adopción de esas nuevas funcionalidades no tienen la misma velocidad de implementación por parte de los diferentes navegadores, en la tabla **compat-table** podemos ver una lista del soporte por cada una de las features.

![](https://swcrafters.fra1.cdn.digitaloceanspaces.com/Posts/postcss-babel-css/compat-table.png)
Aquí podemos ver la tabla para [ES2016+](https://kangax.github.io/compat-table/es2016plus/)

Para gestionar y versionar las propuestas, el TC39 definió los siguientes estados:

| Estado                  | Descripción                                                                                                                                                                                                                                                                                                                                                                                                                             |
| :---------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **stage-0** (Strawman)  | En este estado se suben ideas del comité TC39 o de alguien registrado como contribuidor. De estas características, algunas se llegan a implementar y otras són descartadas.                                                                                                                                                                                                                                                             |
| **stage-1** (proposal)  | El "champion" se convierte en el responsable de la propuesta. En este punto ya existe una descripción formal de la idea, descrita en forma de ejemplos, una API, semántica y algoritmos.                                                                                                                                                                                                                                                |
| **stage-2** (draft)     | Es una primera versión de lo que se incluirá en la especificación. Normalmente cuando se llega a este punto suele ser segura su inclusión en el estándar. Se necesita tener una descripción usando el lenguaje de **ECMAScript**. Además, se requiere dos implementaciones experimentales, pero una de ellas puede ser haciendo uso de un transpilador como **Babel**.                                                                  |
| **stage-3** (candidate) | La propuesta está casi finalizada y ahora se necesitan las opiniones de los usuarios de las implementaciones para progresar. El texto de la especificación debe estar completo. Los evaluadores designados por el TC39 deben finalizar la especificación. Debe haber al menos dos implementaciones funcionales. Los cambios sólo se harán en respuesta a problemas críticos que se hayan descubierto por las implementaciones y su uso. |
| **stage-4** (finished)  | La propuesta está lista para ser incluida en el estándar.                                                                                                                                                                                                                                                                                                                                                                               |

Como podemos ver en la descripción del stage-2, para poder utilizar las nuevas funcionalidades debemos transpilar el código para que lo pueda entender el navegador. Para ello podemos utilizar **[Babel](https://babeljs.io/)**, pero hay otros, como **[Traceur](https://github.com/google/traceur-compiler)** de Google.

## Babel

**Babel**<sup>(6)</sup> es un transpilador que se encarga de convertir nuestro código JavaScript, con las nuevas funcionalidades y sintaxis, a un código que sea capaz de interpretar el navegador.

Para hacer esta transpilación Babel nos ofrece **[@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env)**, para poder configurar el soporte de navegador que deseamos para nuestro proyecto.

## PostCSS Preset Env

Aquí es donde encontramos la similitud con Babel, **PostCSS Preset Env**, creado por [Jonathan Neal](https://twitter.com/jon_neal), nos ofrece la opción de trabajar con las nuevas funcionalidades CSS que están en modo borrador en la W3C.

Para hacerlo se basa en **cssdb**, que es una lista completa de características CSS y sus posiciones en el proceso de convertirse en estándares web implementados.

Al igual que lo hace Babel, dispone de varios estados:

| Estado                                                                       | Descripción                                                                                                                                                                                                                                                                                                                     |
| :--------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Stage 0**: Aspirational<br>"Esta es una idea loca"                         | Un borrador no oficial o un borrador de editor defendido por un miembro del W3C Working Group. Debe considerarse altamente inestable y sujeto a cambios. Las características de la etapa 0 están abiertas a ideas y discusión, pero no pueden considerarse serias.                                                              |
| **Stage 1**: Experimental<br>"Esta idea podría no ser una locura"            | Un borrador de editor o un borrador de trabajo inicial defendido por un miembro del W3C Working Group. Debe considerarse altamente inestable y sujeto a cambios. Las características de la etapa 1 se reconocen como un problema real, pero pueden no estar vinculadas a ninguna solución en particular.                        |
| **Stage 2**: Allowable<br>"Esta idea no es una locura"                       | Un borrador de trabajo inicial defendido por un miembro del W3C Working Group. Debe considerarse relativamente inestable y sujeto a cambios. Las características de la etapa 2 están vinculadas a una forma particular de resolver un problema.                                                                                 |
| **Stage 3**: Embraced<br>"Esta idea se está convirtiendo en parte de la web" | Una recomendación candidata defendido por un miembro del W3C Working Group, generalmente implementado por al menos 2 proveedores de navegadores reconocidos, posiblemente detrás de un flag. Debe considerarse estable y sujeto a pocos cambios. Las características de la etapa 3 probablemente se convertirán en un estándar. |
| **Stage 4**: Standardized<br>"Esta idea es parte de la web"                  | Una recomendación defendido por el W3C. Debe ser implementado por todos los proveedores de navegadores reconocidos. Las características de la etapa 4 són estándares web.                                                                                                                                                       |

En PostCSS Preset Env actualmente disponemos de 33 propiedades CSS repartidas entre los diferentes estados.

- **Stage 3**: 6 propiedades
- **Stage 2**: 20 propiedades
- **Stage 1**: 6 propiedades
- **Stage 0**: 1 propiedades

En la web podemos ver un listado muy detallado de todas las propiedades CSS en desarrollo que tenemos disponible, indicando el estado, un enlace a la especificación en la W3C, un enlace al plugin PostCSS que se encarga de transpilar nuestro código y finalmente un ejemplo de código.

![Función CSS image-set()](https://swcrafters.fra1.cdn.digitaloceanspaces.com/Posts/postcss-babel-css/image-set.png)

## Instalación

Vamos a ver cómo podemos instalar PostCSS Preset Env. Como la mayoría de herramientas que tenemos hoy en día en el desarrollo frontend, lo tenemos disponible como un paquete de **npm**. Hay varias maneras de utilizar PostCSS Preset Env, lo podemos integrar con Node, PostCSS CLI, Webpack, Create React App, Gulp, Grunt y recientemente con Rollup. En el fichero [INSTALL.md](https://github.com/csstools/postcss-preset-env/blob/master/INSTALL.md) del repositorio oficial podemos ver detalladamente cada una de esas instalaciones.

Para el ejemplo nos vamos a basar en PostCSS CLI.

```bash
npm install postcss-preset-env --save-dev
```

Esto nos instalará el paquete *postcss-preset-env* en nuestro proyecto, pero ahora necesitamos utilizarlo con PostCSS CLI. Vamos a instalarlo:

```bash
npm install postcss-cli --save-dev
```

Utilizaremos el fichero `postes.config.js` para configurarlo, esto es lo que tendremos en su interior:

```javascript
const postcssPresetEnv = require("postcss-preset-env");

module.exports = {
  plugins: [postcssPresetEnv(/* pluginOptions */)]
};
```

En el ejemplo estamos definiendo sólo la parte que afecta a *postcss-preset-env*, pero en este fichero podríamos añadir otros plugins, como *postcss-import* para poder importar archivos CSS, ya que import no está en la especificación.

Ahora vamos a adentrarnos en las opciones de configuración que tenemos disponibles. En lugar del comentario *pluginOptions* pasaremos un objeto. Veamos algunos ejemplos.

### Configuración por estado

Si configuramos **Stage 0** tenemos disponibles todas las nuevas funcionalidades:

```javascript
...
	postcssPresetEnv({ stage: 0 })
...
```

### Configuración por funcionalidad

En este ejemplo además de definir el estado, en este caso el 3, añadimos la clave *feature* al objeto y le indicamos la funcionalidad que queremos.

```javascript
...
	postcssPresetEnv({
	  /* use stage 3 features + css nesting rules */
	  stage: 3,
	  features: {
	    'nesting-rules': true
	  }
	})
...
```

Con esta configuración estamos definiendo que queremos las propiedades con estado 3, que són las previas a formar parte del estándar, pero también queremos que se añada *nesting-rukes*, que actualmente pertenece al grupo con estado 1. Esta es una de las cosas que más me gusta de PostCSS Preset Env, podemos configurar y adaptar el entorno de desarrollo en cada proyecto.

### Configuración por navegador

Otra manera que tenemos de configurar las funcionalidades CSS es definiendo el soporte de los navegadores:

```javascript
...
	postcssPresetEnv({ browsers: 'last 2 versions' })
...
```

Como indica la propia documentación en este caso también podríamos utilizar una clave *browserlist* en *package.json* o añadir el fichero *.browserlist*<sup>(7)</sup>.

### Configuraciones avanzadas

Hay dos de las opciones de configuración que me parecen una auténtica maravilla, són **importFrom** y **exportTo**.

**importFrom** nos permite definir, uno o varios archivos, donde tengamos configuradas variables como Custom Media, Custom Properties, Custom Selectors. Y he dicho variables porque podemos importar CSS, Javascript o Json.

Si tenemos un archivo *src/themes/sw_crafters/settings.css* con el contenido:

```css
@custom-media --small-viewport (max-width: 30em);
@custom-selector :--seo-headings h1, h2, h3;
:root {
  --color-primary: #434343;
  --font-family: Monserrat, HelveticaNeue, "Helvetica Neue", Helvetica, Arial,
    sans-serif;
}
```

Podremos importar el archivo de configuración del tema **sw_creafter** de la siguiente forma:

```javascript
...
	postcssPresetEnv({
	  stage: 0,
	  importFrom: 'src/themes/sw_crafters/settings.css'
	})
...
```

Al contrario que importFrom, **exportTo** se encarga de exportar las Custom Media, Custom Properties y Custom Selectors de nuestro proyecto. De igual manera, podemos hacerlo en formato CSS, Javascript y Json, solo tenemos que indicar la ruta, y la extensión del archivo definirá el formato de salida.

```javascript
...
	postcssPresetEnv({
	  stage: 0,
	  esportTo: 'data/themes/sw_crafters/settings.js'
	})
...
```

Así quedaría la exportación de la configuración del tema sw_crafters:

```javascript
module.exports = {
  customMedia: {
    "--small-viewport": "(max-width: 30em)"
  },
  customProperties: {
    "--color-primary": "#434343",
    "--font-family":
      'Monserrat, HelveticaNeue, "Helvetica Neue", Helvetica, Arial, sans-serif'
  },
  customSelectors: {
    ":--seo-headings": "h1,h2,h3"
  }
};
```

Estas dos opciones nos van a permitir tener un mayor control de los tokens<sup>(8)</sup> de nuestro Design System<sup>(9)</sup>.

## Recursos

El recurso principal es la web oficial https://preset-env.cssdb.org/

![Web PostCSS Preset Env](https://swcrafters.fra1.cdn.digitaloceanspaces.com/Posts/postcss-babel-css/postcss-preset-env-web.png)

En ella encontraremos todas las nuevas funcionalidades CSS, un playground donde poder probarlo directamente en nuestro navegador.

![PostCSS Playground](https://swcrafters.fra1.cdn.digitaloceanspaces.com/Posts/postcss-babel-css/playground.png)

A la izquierda podemos escribir nuestro código CSS, y a la derecha tendremos el código transpilado para dar soporte a los navegadores actuales según el estado y soporte de navegadores que hayamos elegido.

En la web también encontraremos un enlace a soporte, donde nos lleva a una room<sup>(10)</sup> de Gitter<sup>(11)</sup>, donde encontraremos soporte de una gran comunidad de PostCSS.

![Gitter](https://swcrafters.fra1.cdn.digitaloceanspaces.com/Posts/postcss-babel-css/gitter.png)

Por último también tenemos el enlace al repositorio en GitHub.

### Ask Me Anything!

Como último recurso os quiero compartir este repositorio [ama](https://github.com/nucliweb/ama)<sup>(12)</sup> en GitHub, donde a través de los issues estoy abierto a resolver cualquier duda de temas relacionados con CSS, PostCSS, SVG, CSS Houdini, Web Animation y Media Optimization. Así que si tenéis alguna duda sobre PostCSS o alguno de los otros temas, estaré encantado de ayudar en lo que pueda.

![Ask Me Anything!](https://swcrafters.fra1.cdn.digitaloceanspaces.com/Posts/postcss-babel-css/ama.png)

## Conclusiones

Yo aposté por PostCSS desde hace tiempo, aún a día de hoy veo que hay gente que se confunde al acercarse a este preprocesador. Es normal, hay tanta flexibilidad que puede llevar a confusión. Pero creo que utilizar PostCSS Preset Env, que funciona como un paquete para poder seguir desarrollando en CSS nativo, es una gran puerta de entrada, y podemos ampliar y adaptar nuestro entorno de desarrollo poco a poco.

Os invito a utilizarlo en vuestro nuevo proyecto o integrarlo en el proyecto actual, ya que PostCSS puede convivir sin problema con otros preprocesadores como Sass. Seguro que mucha gente ya lo está haciendo... ¿sabes que si estás utilizando [Autoprefixer](https://autoprefixer.github.io/), ya estás utilizando PostCSS?

#### Notas

- (1) [Polyfill](<https://en.wikipedia.org/wiki/Polyfill_(programming)>)
- (2) [Web cssdb](https://cssdb.org/)
- (3) [CSS Working Group](https://drafts.csswg.org/)
- (4) [World Wide Web Consortium](https://www.w3.org/)
- (5) [Technical Committee 39](https://www.ecma-international.org/memento/tc39-rf-tg.htm)
- (6) [Babel](https://babeljs.io/)
- (7) [Configuración de browserlist](https://github.com/browserslist/browserslist#readme)
- (8) [Tokens](https://css-tricks.com/what-are-design-tokens/)
- (9) [Design System](https://www.learnstorybook.com/design-systems-for-developers/)
- (10) Una room en Gitter es como un team en Slack
- (11) Gitter es una herramienta de comunicación, similar a Slack, pero relacionada con un repositorio de GitHub.
- (12) As Me Anything, es una idea original de **‌Avi Flombaum** que creó un repositorio para poder utilizar el sistema de issues de GitHub y resolver dudas.
