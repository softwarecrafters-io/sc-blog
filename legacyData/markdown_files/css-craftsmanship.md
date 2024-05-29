**¡Me encanta CSS!**. Quien me conoce lo sabe, seguro que se notará en este artículo, y estoy orgulloso de ello. No pienso entrar en la guerra de si es un lenguaje de programación o no. Para mí es un lenguaje de estilos y "ATENCIÓN SPOILER" **CSS es parte de la Web**. Es por ello que me sorprende la gran cantidad de personas que se definen como Frontends o FullStack pero dicen: "Ah! no, yo CSS no lo toco, eso no es programar".

Esa frase da para otro artículo, pero no quiero desviarme del objetivo de este, hablar de CSS para Crafters. Sí, me permito añadir la palabra crafters (artesano/a) junto a CSS. Y espero que al final del artículo consiga convencerte de que realmente podemos añadir artesanía a cualquier cosa que queramos trabajar de forma cuidadosa.

## ¿Qué es el CSS para Crafters?

### CSS

Hojas de Estilo en Cascada (del inglés Cascading Style Sheets) o CSS es el lenguaje de estilos utilizado para describir la presentación de documentos HTML o XML _(incluyendo varios languages basados en XML como SVG, MathML o XHTML)_. CSS describe como debe ser renderizado el elemento estructurado en la pantalla, en papel, en el habla o en otros medios. - [MDN web docs](https://developer.mozilla.org/es/docs/Web/CSS)

### Artesania de software

Artesanía se refiere tanto al trabajo de la persona artesana (crafter), como al objeto o producto obtenido en el que cada pieza es distinta a las demás. - [Wikipedia](https://es.wikipedia.org/wiki/Artesan%C3%ADa)

Pero en nuestro contexto vamos a hacer referencia a la Artesanía de Software según la definición del manifiesto de la [Artesanía de Software](http://manifesto.softwarecraftsmanship.org/#/es).

Veamos una lista de las cosas a tener en cuenta y herramientas que tenemos disponibles para ser auténticas/os artesanas/os del CSS.

- [CSS Styleguides](#css-styleguides)
- [CSS Naming](#css-naming)
- [CSS Architecture](#css-architecture)
- [CSS Testing](#css-testing)
- [CSS Frameworks](#css-frameworks)
- [CSS Knowledges](#css-knowledges)
- [CSS for Developers](#css-for-developers)
- [CSS Tools](#css-tools)
- [CSS Audits](#css-audits)
- [CSS Refactor](#css-refactor)
- [CSS Books](#css-books)
- [Conclusiones](#conclusiones)

## CSS Styleguides

Como en cualquier otro lenguaje de programación, existen guías de estilos. Tiene todo el sentido, ya que una guía de estilo no es más que una convención para escribir código legible, mantenible y escalable por uno o varios equipos.

Hay varias guías de estilos en CSS, y todas ellas propuestas por gente muy influyente en el desarrollo de la web.

- [Idiomatic CSS](https://github.com/necolas/idiomatic-css) _(Nicolas Gallagher)_
- [CSS Guidelines](https://cssguidelin.es/) _(Harry Roberts)_
- [Code Guide](https://codeguide.co/) _(Mark Otto)_
- [Primer](https://github.com/primer) _(GitHub)_
- [Airbnb CSS](https://github.com/airbnb/css) _(Airbnb Engineers)_
- [Sass Guidelines](https://sass-guidelin.es/) _(Hugo Giraudel)_

> Un ejemplo de sintaxis

```css
/* Bad CSS */
.selector, .selector-secondary, .selector[type=text] {
  padding:15px;
  margin:0px 0px 15px;
  background-color:rgba(0, 0, 0, 0.5);
  box-shadow:0px 1px 2px #CCC,inset 0 1px 0 #FFFFFF
}

/* Good CSS */
.selector,
.selector-secondary,
.selector[type="text"] {
  padding: 15px;
  margin-bottom: 15px;
  background-color: rgba(0,0,0,.5);
  box-shadow: 0 1px 2px #ccc, inset 0 1px 0 #fff;
}
```

No hay una mejor que otra. Como he comentado antes son convenciones, reglas a seguir por las personas que forman parte del equipo. Por lo que nos tenemos que sentir cómodas, ser ágiles y pracmáticas. He trabajado en varios equipos, y proyectos, he utilizado casi todas ellas. Es una decisión de equipo, pero eso sí, una vez hemos decidido una (ya sea una de ellas o una mezcla de varias) debemos ser consistentes y aplicarla en nuestro desarrollo.

Hoy en día es una tarea muy simple, ya que podemos configurar el linter para que al guardar los cambios nos "reformatee" el código según las reglas que hayamos decidido seguir. Aquí encontraréis las que estamos utilizando en [SUI Components](https://github.com/SUI-Components/sui/blob/master/packages/sui-lint/stylelint.config.js), utilizando Sass como preprocesador.

## CSS Naming {#css-naming}

En CSS no nos podemos librar de uno de [los dos grandes problemas en las Ciencias de la Computación](https://martinfowler.com/bliki/TwoHardThings.html), nombrar cosas. Si llevas un tiempo en el desarrollo seguro que te has llevado más de una sorpresa con el nombrado de variable, funciones o clases.

A la hora de desarrollar en las hojas de estilo tenemos el mismo problema, tanto para el nombrado de selectores de clases, las [custom properties](https://developer.mozilla.org/es/docs/Web/CSS/Using_CSS_custom_properties), como las variables, funciones o mixins de los preprocesadoes, que nos ofrecen una sintaxis de programación.

Como solución a estos problemas aparecen una serie de convenciones para, como en el punto anterior, conseguir un código más legible, mantenible y escalable. Vamos a ver algunas de ellas (algunas muy conocidas y otras no tanto)

- [OOCSS](https://github.com/stubbornella/oocss/wiki) _(Nicole Sullivan)_
- [SMACSS](http://smacss.com/) _(Jonathan Snook)_
- [BEM](https://en.bem.info/) _(Yandex)_
- [BEMIT](https://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/) _(Harry Roberts)_
- [SUIT CSS](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md) _(Nicolas Gallagher)_
- [Modular CSS naming conventions](http://thesassway.com/advanced/modular-css-naming-conventions) _(The Sass Way)_
- [NCSS](https://ncss.io/) _(Henry Ruhs)_

La primera en ver la luz (2009) fue OOCSS de [Nicole Sullivan](https://twitter.com/stubbornella), donde Nicole ofrecía una nomenclatura orientada a objeto, extendiendo las clases.

> Un ejemplo de la propuesta de Nicole

```css
.media {
  @extend %baseSpacing;
  @include clearfix-me(micro);
  > .mediaImg {
    float: left;
    margin-right: 10px;
    > img {
      display: block;
    }
  }
  > .mediaImgExt {
    float: right;
    margin-left: 10px;
    margin-right: 0;
  }
  > .mediaBody {
    @include clearfix-me(facebook);
  }
}
```

Pero la más popular ha sido [BEM](https://en.bem.info/methodology/naming-convention/) (Block Element Modifier) del equipo de desarrollo de [Yandex](https://yandex.com/) _(la versión Rusa de Google)_. La popularidad que ha ganado BEM, en mi opinión, se debe a la simplicidad de la solución y a la gran documentación disponible desde el principio. Una de las cosas que supieron hacer es reaccionar a las peticiones de la comunidad y adaptar las ["Naming rules"](https://en.bem.info/methodology/naming-convention/#naming-rules) a unas ["Alternative naming schemes"](https://en.bem.info/methodology/naming-convention/#alternative-naming-schemes).

Personalmente he utilizado BEM en más de un proyecto y en cuanto lo hemos utilizado en un equipo, hemos llegado a hacer alguna modificación para sentirnos cómodos. Recordad que son convenciones, las podemos adaptar a nuestras necesidades.

> Un ejemplo de implementación de BEM

```html

<ul class="mainMenu">
    <li class="menu__item">...</li>
    <li class="menu__item">...</li>
    <li class="menu__item menu__item_size_m">...</li>
</ul>
```

```css
/* Block */
.mainMenu {
    ...
}

/* Element */
.menu__item {
    ...
}

/* Modifier */
.menu__item_size_m {
    ...
}
```

En [SUI Components](https://github.com/SUI-Components/sui-components) y los productos de [Adevinta Spain](https://www.adevinta.com/es/spain/) estamos utilizando [SUIT CSS](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md) de [Nicolas Gallagher](https://twitter.com/necolas). Llegamos a la conclusión de utilizar esta convención porque tiene un enfoque orientado a componente y creemos que ganamos en legibilidad. Cosa que es de agradecer en proyectos de gran tamaño y con un equipo de gente grande.

> Ejemplo de implementación de SUIT CSS

```html
<div class="sui-AtomCard">
  <div class="sui-AtomCard-media"> ... </div>
  <div class="sui-AtomCard-info"> ... </div>
</div>
```

```css
/* ComponentName */
.sui-AtomCard {
  /* Descendent Name */
  &-media { ... }
  &-info { ... }

  /* Modifier Name */
  &--vertical { ... }
  &--responsive { ... }

  /* State Of Component */
  &.is-highlight { ... }
}
```

Como se puede apreciar, hemos optado por añadir un prefijo, eso nos ayuda a identificar el scope del componente. En esta captura del HTML de la web de [Coches.net](https://www.coches.net/), podemos ver componentes de Motor `mt` dentro de componentes SUI `sui`.

![Componentes de Motor dentro de componentes SUI](https://user-images.githubusercontent.com/1307927/95793455-e8efb600-0ce5-11eb-817b-6a174b5c7dc0.png)

Como podéis ver hay varias convenciones, igual que en las Styleguides, no hay ninguna mejor que otra, simplemente hay que decidir usar una convención. En nuestro caso, tuvimos varias reuniones _(hace ya unos años)_ frontends de todos los productos, para conseguir alinearnos y llegar a una convención sólida, y lo más importante, cómoda para todas las personas.

## CSS Architecture

¿Cómo?, ¿arquitectura en CSS?, así es. A mucha gente le sorprende escuchar hablar de arquitectura en CSS, pero en nuestro contexto, arquitectura se refiere a cómo están organizados los recursos, conectadas las dependencias entre ellos, la comunicación, incluso incluimos bajo el mismo paraguas la escalabilidad. Y todos esos temas se deben tener en cuenta a la hora de desarrollar la parte del código que nos ayuda a estilizar la información que consumirán las/os usuarias/os.

Aquí hay que tener algunas cosas en cuenta. Si optamos, o el proyecto en el que trabajamos, usa [CSS in JS](https://octuweb.com/css-in-js/), los estilos estarán incluidos dentro del componente JavaScript. En este caso la parte de arquitectura queda limitada a algunos estilos globales. Así que en nuestro caso vamos a enfocarlo desde el punto de vista que el CSS lo tenemos en otra capa de la aplicación.

De la misma manera que para las Styleguides y el Naming, gente referente en la comunidad frontend, han definido propuestas de cómo resolver el tema de la arquitectura CSS.

- [OOCSS](https://github.com/stubbornella/oocss/wiki) _(Nicole Sullivan)_
- [SMACSS](http://smacss.com/) _(Jonathan Snook)_
- [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) _(Brad Frost)_
- [7-1 Pattern](https://sass-guidelin.es/#architecture) _(Hugo Giraudel)_
- [ITCSS](https://itcss.io/) _(Harry Roberts)_
- [haiticss](https://github.com/haiticss/haiticss) _(Dani Fornells)_

Aquí seguro que os llamará la atención que los dos primeros puntos se repiten. Eso es porque las propuestas de Nicole y Jonathan incluyen convención de nombres y de arquitectura.

SMACSS (Scalable and Modular Architecture CSS) de [Jonathan Snook](https://twitter.com/snookca) ganó popularidad, y gran parte de esa popularidad fue gracias a que Jonathan publicó un libro, el cual ahora puedes [descargar](http://smacss.com/) de forma gratuita.

Usé la propuesta de SMACSS en un par de proyectos, pero me dejé llevar por la tendencia seguida por mucha gente de utilizar el 7-1 Pattern, donde [Hugo Giraudel](https://twitter.com/hugogiraudel) proponía la siguiente estructura.

```sh
base/
components/
layout/
pages/
themes/
abstracts/
vendors/
main.scss
```

> 7 carpetas definiendo la estructura de carpetas y un solo punto de entrada, de ahí su nombre **7-1 Pattern**.

La propuesta de [Brad Frost](https://twitter.com/brad_frost) con **[Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)** es muy similar.

```sh
base/
atom/
molecule/
organism/
template/
page/
style.scss
```

Este es otro caso de éxito de una propuesta apoyada por un libro, una buena documentación, un montón de charlas e incontables artículos hablando sobre este enfoque de Diseño Atómico.

Esta es la arquitectura que estamos utilizando en [SUI Components](https://github.com/SUI-Components/sui-components/tree/master/components), la cual nos encaja por el mismo enfoque que se está haciendo desde el departamento de UX/UI.

No quiero dejar de comentar la propuesta de [Harry Roberts](https://twitter.com/csswizardry), ITCSS (Invert Triable CSS), ya que he hecho [algunas charlas](https://slides.com/joanleon/arquitectura-itcss) y un curso hablando de esta arquitectura. He de confesar que en cuanto la conocí, me gustó, y cometí el gran error _(luego me di cuenta)_ de quererlo aplicar en todos los proyectos. Incluso hice la propuesta de aplicarla en los productos de la empresa, pero no era la mejor opción. Un **cambio** de arquitectura sin necesidad, un proyecto grande con mucha gente a la que hacer una formación, cambiar el chip. Y como ya sabemos, las personas, por naturaleza son reacias al cambio. Así que no fué más allá de implementarlo en un par de proyectos en los que colaboré.

> La manera más rápida de entender el enfoque de ITCSS es con este gráfico

![ICSS](https://user-images.githubusercontent.com/1307927/95793441-e2f9d500-0ce5-11eb-949e-9cdc24275a22.png)

## CSS Functional _(Utility-first)_

Functional CSS _(en el título mantengo el patrón del resto 🤷🏽‍♂️)_, también conocido como Utily-first CSS, también lo podemos definir como una arquitectura CSS, pero lo he querido separar del resto por el enfoque tan controvertido y por la etiqueta de "anti-pattern" que rápidamente le fué otorgada por la comunidad frontend. He de confesar que yo estuve entre la comunidad que pensaba (mucha gente lo sigue pensando) que su planteamiento acopla la capa de estilos a la capa de presentación.

En mi opinión, creo que esto pasa continuamente, cuando hay alguien que plantea un nuevo enfoque por naturaleza rechazamos el cambio. Y más aún si ese cambio nos implica modificar la manera de cómo hacemos las cosas. Para poder formarnos una opinión tenemos que documentarnos, entender el motivo que ha llevado a que alguien plantee algo que a priori parece tan disruptivo. Eso es lo que hizo [Sarah Dayan](https://twitter.com/frontstuff_io) en su artículo [In Defense of Utility-First CSS](https://frontstuff.io/in-defense-of-utility-first-css), en él encontrarás frases como:

> “Favor composition over inheritance”. This piece of wisdom from Design Patterns, one of the most influential software engineering books, is the foundation of utility-first CSS. It also shares many principles with functional programming: immutability, composability, predictability, and avoidance of side-effects. The goal behind all those fancy terms is to write code that’s easier to maintain and to scale.

> BEM encourages you to use modifiers to handle component variations. This may seem smart at first, yet unfortunately leads up to other problems: you end up creating tons of modifiers you only use once for a specific use-case.

Tanto si te planteas utilizar Utility-first CSS como si no, te aconsejo leer el artículo de Sarah, ya que te abrirá la mente y te ayudará a poder argumentar los motivos de usarlo o no usarlo en tu próximo proyecto.

Si filtramos en GitHub por el _topic_ [#functional-css](https://github.com/topics/functional-css) podremos ver que hay una gran cantidad de proyectos. En el top 3 podemos encontrar los frameworks [tailwindcss](https://tailwindcss.com/), [Tachyons](https://tachyons.io/) y [Basscss](https://basscss.com/).

Es muy probable que te suenen los dos primeros, ambos disponen de una gran documentación y comunidad. A **Basscss** le tengo cierto aprecio porque [Brent Jackson](https://twitter.com/jxnblk) ya apostó por este enfoque con [Basscss-sass](https://github.com/basscss/basscss-sass) en el 2015.

Veamos un ejemplo de implementación de **tailwindcss**.

```html
<div class="md:flex bg-white rounded-lg p-6">
  <img class="h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6" src="avatar.jpg">
  <div class="text-center md:text-left">
    <h2 class="text-lg">Erin Lindford</h2>
    <div class="text-purple-500">Product Engineer</div>
    <div class="text-gray-600">erinlindford@example.com</div>
    <div class="text-gray-600">(555) 765-4321</div>
  </div>
</div>
```

> Este es el ejemplo de cómo, con el patrón composición, podemos encontrar en la home de su site.

Antes de juzgar la legibilidad, si eso es lo mismo que escribir estilos en línea **(que NO lo es)** u opinar sobre la escalabilidad que tiene un desarrollo así, por favor, echa un vistazo al artículo de Sarah.

## CSS Testing

Lo primero que debemos aclarar es que el Testing en CSS se aleja mucho del Testing que conocemos en los lenguajes de programación. Sí, lo sé, con los preprocesadores podemos hacer tests tal y como los conocemos, ya que nos ofrecen una sintaxis, un compilador con gestión de errores y con resultados predecibles. Por ejemplo, para Sass podemos utilizar [True](https://github.com/oddbird/true) un framework que nos permite implementar test unitarios en el código Sass de nuestros proyectos.

Otro punto, y quizás el más importante, es que debemos tener claro que el CSS NO se renderiza igual en todos los navegadores. Si no me crees, puedes entrar en esta web [Do websites need to look exactly the same in every browser?](http://dowebsitesneedtolookexactlythesameineverybrowser.com/) 😊.

> Tenía pensado añadir una imagen con los iconos de los navegadores, pero el primer error es pensar que no dejaré ninguno fuera. Hoy en día existen más navegadores de los que creemos, en [Cam I Use](https://caniuse.com/usage-table) podemos ver una lista de la cantidad de navegadores y versiones.

Seguro que llegado a este punto, puede que pienses que no tiene mucho sentido el testing en CSS, pero deja que te explique las opciones que tenemos disponibles desde el punto de vista de CSS y renderizado en el navegador, ya hemos visto que en los preprocesadores sí que tenemos opción de desarrollar tests unitarios.

### Manual Testing

Como desarrolladores, es complicado hacerse a la idea que a estas alturas debemos hacer testing manual. Ya no por la tarea en sí de tener que probar una nueva funcionalidad en diferentes navegadores y dispositivos, sino por el peligro a error en la revisión. Es una balanza complicada de equilibrar, por un lado tenemos el trabajo y el riesgo a errores, pero por el otro está el validar que nuestras/os usuarias/os no tendrán una mala experiencia al utilizar nuestra aplicación.

Es realmente sorprendente a la vez que esperanzador, ver que la propia W3C tiene test manuales para validar el funcionamiento esperado de las nuevas funcionalidades que poco a poco van adoptando los navegadores, lo podemos encontrar en las [Test suites for Web-platform specs](https://github.com/web-platform-tests/wpt) o incluso personas tan referentes en el mundo web como [Eric Meyer](https://twitter.com/meyerweb), donde podemos ver en su repositorio [css-tests](https://github.com/meyerweb/css-tests) una gran cantidad de tests.

Aun siendo una tarea tediosa, la validación manual, nos permite asegurarnos que podemos ver correctamente renderizado ese componente de una nueva funcionalidad. Eso sí, asumiendo que será imposible llegar a todos los dispositivos y de una manera actualizada.

### Automatic Testing

Existen varias herramientas para poder validar que no hemos roto nada al desplegar una nueva funcionalidad, cambio de copy o al eliminar un test A/B.

Posiblemente la herramienta de testing en el navegador sea [BrowserStack](https://www.browserstack.com/) que nos permite hacer integración con diferentes entornos de despliegue, automatización de frameworks, gestores de proyectos o herramientas de desarrollo, echa un vistazo a la [larga lista](https://www.browserstack.com/integrations). Es un servicio de pago, pero creo que muy asumible teniendo en cuenta el gran beneficio que nos aporta.

Hay más, como [Sauce Labs](https://saucelabs.com/) o [Browserling](https://www.browserling.com/) pero no los conozco.

El servicio que sí he utilizado y me parece una gran herramienta para validar e-mails es [Litmus](https://www.litmus.com/). Nos permite tener una previsualización de nuestra plantilla de mail en un montón de clientes de correo y en varias versiones.

### CSS Regression Testing

Otra opción que tenemos es basar nuestros test en **Visual Regression Testing**, hace un tiempo (2016) dí una charla en [Software Crafters Barcelona](http://slides.com/joanleon/css-regression-testing/) donde hablé de varias herramientas para ello.

En aquel momento la herramienta más completa (IMHO) era [PhantomCSS](https://github.com/HuddleEng/PhantomCSS), proyecto que ya está archivado. Actualmente la herramienta más completa para implementar un sistema de Visual Regression Testing con CLI es [Puppeteer](https://pptr.dev/).

El sistema de regresión visual consiste en guardar un snapshot, imagen en formato PNG, y comparar entre las imágenes los cambios a nivel de pixel.

![Visual Regression Testing](https://user-images.githubusercontent.com/1307927/95793464-ed1bd380-0ce5-11eb-9b8f-30bb59038656.jpg)

Este tipo de test tiene un alto porcentaje de falsos positivos, ya que como podemos ver en el ejemplo los cambios pueden ser intencionados, ya que estamos capitalizando el título de ese bloque.

Seguro que he conseguido desanimarte con todo esto de los test en CSS, pero no pasa nada, está bien darse cuenta que esto de CSS va más allá de convertir los diseños a colores hexadecimales.

Por suerte es un sector que va avanzando poco a poco. En el caso de que estés utilizando [Storybook](https://storybook.js.org/), existe un plugin llamado [chromatic](https://www.chromatic.com/) que te permitirá automatizar los tests de regresión visual a nivel de componente.

En la reciente [JamStackConf 2020](https://jamstackconf.com/), [Angie Jones](https://twitter.com/techgirl1908) dió una charla ["Adding Eyes to your Automation Framework"](https://www.youtube.com/watch?v=spyKZ-p3UgE&ab_channel=JamstackConf) hablando de [Eye](https://applitools.com/products-eyes/) un servicio que apoyándose en Inteligencia Artificial promete dar solución a todas las lagunas que nos hemos encontrado hasta ahora.

Así que creo que no tardaremos mucho en olvidar lo complicado que es validar que no se está rompiendo nada cuando hacemos cambios o añadimos CSS en nuestras nuevas funcionalidades.

## CSS Frameworks

Quiero empezar esta sección recomendando una gran charla de una amiga, [You might not need a CSS framework](https://www.youtube.com/watch?v=kED5eDjMfGM) de [Belén Albeza](https://www.belenalbeza.com/), donde nos habla de que no tenemos la necesidad de utilizar un framework CSS, luego daré mi opinión sobre este punto de vista.

Mi primer recuerdo de un framework CSS me lleva a [960 Grid System](https://960.gs/), he tenido la curiosidad de ver la fecha de inicio y he encontrado el [primer commit](https://github.com/nathansmith/960-Grid-System/commit/0d61cf12e44bacc100f25c08b8b1dcc00b39b0d3) _(Dec 20, 2009)_ en el repositorio, pero es de la versión 1.4. Hay personas que ya estábamos codeando antes del nacimiento de GitHub 😅.

### Objetivo de los frameworks CSS

Los frameworks CSS, como la mayoría de lenguajes y herramientas que utilizamos día a día, surgen de la necesidad de solucionar un problema puntual en un proyecto, sin un objetivo comercial. Simplemente para poder ser más ágiles a la hora de resolver el mismo problema en cada proyecto. Muchas personas ya teníamos nuestras "cajas de herramientas" sin saber que estábamos construyendo un framework, simplemente teníamos estructura y fragmentos de código que utilizamos en cada nuevo proyecto.

El nacimiento de los frameworks hizo mucho más fácil que la información se presentara con más coherencia, con más diseño. Eso los popularizó de forma rápida.

**EL FRAMEWORK CSS** es [Boostrap](https://getbootstrap.com/), durante mucho tiempo era fácil reconocer que una web estaba utilizando Bootstrap sin mirar el código fuente. La mejor baza del creador de Bootstrap [Mark Otto](https://twitter.com/mdo) fue **la documentación**. Una documentación donde cualquier persona solo tenía que incluir el archivo CSS en el proyecto y con un simple a la vez que poderoso `Copy & Paste` de la estructura HTML del "componente" necesario, teníamos funcionando una web en unas horas. Curiosamente se veía aparentemente igual en todos los navegadores.

Hay muchos, muchos frameworks CSS. Cada año aparecen varios artículos del estilo "XX Best CSS Frameworks in 20XX", un ejemplo de ello puede ser este [Best CSS Frameworks in 2020](https://dev.to/theme_selection/best-css-frameworks-in-2020-1jjh).

Hay frameworks que nos definen más el aspecto gráfico, como es el caso de [Materialize](https://materializecss.com/) basado en [Material](https://material.io/design) de Google, donde nos facilitan una interfaz, layout e interacciones pensadas para aplicaciones Android. [Bulma](https://bulma.io/) suele estar en el top 10 de las listas de frameworks CSS, su popularidad la ganó por ser uno de los frameworks que basó su layout en Flexbox. Y otro que también está en el top 5 o 3 (según la lista) es [tailwindcss](https://tailwindcss.com/), el cual tiene un enfoque de composición en el lado de HTML, como ya hemos visto en la sección de arquitectura.

> Hay muchos, y no es el objetivo de este artículo nombrarlos o analizarlos todos. Si te interesa profundizar en ellos, puedes echar un vistazo a este artículo [100+ Best CSS Frameworks For Responsive Design](https://cssauthor.com/css-frameworks/)

### Mi opinión sobre los frameworks CSS

Como he comentado, aparecen para resolver problemas o funciones concretas, así que no pueden resolver todos los casos. Un claro ejemplo de ello es [NES.css](https://nostalgic-css.github.io/NES.css/), un framework CSS que emula el estilo de una NES de 8bits, es genial, me encanta, lo podría usar como tema en un blog, la web de un juego pixelart, pero no lo veo como imagen de un producto o eCommerce. Pueden estar bien para un MVP, una landing con objetivos de SEO, un side project, un gestor de contenidos _(yo he usado bootstrap en dos proyectos de gestión)_. Pero creo que no es una buena opción para un producto digital. Los productos evolucionan, se tienen que adaptar a nuevas necesidades, nuevos dispositivos.

Personalmente he sido reacio a utilizar frameworks CSS por mi sensación de falta de control. Creo que se debe a que prefiero tener conocimiento de CSS que a conocer la API de un framework, donde además sé lo que hacen las propiedades CSS que se esconden detrás de una clase.

Durante un tiempo estuve leyendo muchos de esos frameworks, tenía una carpeta con los repositorios con los que me interesaba analizar. Incluso me creé un [alias](https://gist.github.com/nucliweb/c2163e31029255d068eb) para poder mantener todos los repositorios actualizados.

![Listado de Frameworks CSS](https://user-images.githubusercontent.com/1307927/95793467-f016c400-0ce5-11eb-8b8e-dea436999d98.png)

Muy friki sí, pero ahí estaba yo, analizando estructuras, nombres de clases, código, o cómo conseguía Bootstrap que un botón se viera igual en todos los navegadores (la magia está en el `line-height`). En algunos proyectos yo tenía que definir la arquitectura, naming y escalabilidad del código CSS. Y la verdad, quién soy yo frente a un montón de gente ingeniera que estaba ofreciendo soluciones globales a problemas concretos. Puede ser que en este momento estés pensando, vaya, Joan lo que hacía es copiar (o como un compañero diseñador decía: "creatividad asociativa") el código de los frameworks. No, deja que me explique.

He hecho varios cursos en formaciones online, y me di cuenta que siempre repetía la misma frase "Me gusta tener el control". Y hablo de un control de saber qué y porqué está renderizando eso el navegador. Tener referencias para aprender es básico, aprendemos así cualquier cosa que estudiemos.

Así que mi opinión es que debemos tener el conocimiento suficiente como para poder crear nuestro propio framework. Esto nos permitirá valorar si uno de los frameworks disponible nos puede ayudar (siempre hay que ser pragmático), si con algunas variaciones de uno de ellos (que hoy en día muchos ofrecen) nos vale o si tenemos que crear nuestro propio framework para poder tener el control total del producto que estamos creando.

## CSS Knowledges

Tener conocimientos de CSS es básico. CSS forma parte de la web [#cssIsPartOfTheWeb](https://twitter.com/hashtag/cssIsPartOfTheWeb).

No quiero ganarme enemigas/os con lo que voy a decir, aunque no me importa si con ello consigo dar visibilidad de lo importante que es tener conocimiento CSS: **"Si CSS es tan fácil, ¿por qué hay tanta gente que no lo conoce?**.

Existe un comité, el [CSS Working Group](https://wiki.csswg.org/) con un [grupo de gente](https://www.w3.org/Style/CSS/members.en.html) muy top que forman parte de muchas compañías punteras en el desarrollo de software. Una de las personas más influyentes en las especificaciones de CSS, [fantasai](https://twitter.com/fantasai), escribió el artículo [about:csswg](http://fantasai.inkedblade.net/weblog/2011/inside-csswg/) explicando cómo funciona el **CSSWG**.

IMHO, el primer sitio donde tenemos que mirar para aprender CSS es en [MDN](https://www.w3.org/Style/CSS/), ya que mantiene una estructura de la información mucho más fácil de seguir. El siguiente nivel es leer la documentación, drafts y discusiones que mantienen en [CSSWG](https://www.w3.org/Style/CSS/) sobre los bugs, revisiones y futuras funcionalidades sobre CSS.

Hay algunos recursos que nos pueden ayudar a estar al día en las nuevas funcionalidades soportadas, las nuevas por venir o las que ya están ¨deprecadas¨. La mayoría las podemos encontrar en esta magnífica recopilación [What’s happening in CSS?](https://rachelandrew.co.uk/archives/2017/05/01/whats-happening-in-css/) de [Rachel Andrew](https://twitter.com/rachelandrew).

Me parecen geniales los enlaces a los "\[Browser\] Platform Status", y otra fuente interesante de información son [las noticias de Can I Use](https://caniuse.com/#info_news) donde podemos ver las novedades que se añaden en los diferentes navegadores.

Un recurso que no me canso de recomendar, y yo mismo leer de vez en cuando, es [Cómo funcionan los navegadores: lo que hay detrás de los navegadores web actuales](https://www.html5rocks.com/es/tutorials/internals/howbrowserswork/) donde podremos aprender cómo funciona de forma interna el navegador. Está escrito en 2011, pero en su mayoría es totalmente válido para los navegadores actuales. Si quieres profundizar más en cómo funciona internamente el renderizador del navegador, también puedes leer [Inside a super fast CSS engine: Quantum CSS](https://hacks.mozilla.org/2017/08/inside-a-super-fast-css-engine-quantum-css-aka-stylo/) de [Lin Clark](https://twitter.com/linclark), donde nos explica de forma muy detallada el funcionamiento del motor de estilos con unas impresionantes ilustraciones.

## CSS for Engineers

Los preprocesadores han sido una gran herramienta para acercar a la gente que necesita trabajar con un lenguaje de programación. Lenguajes como [Sass](https://sass-lang.com/) nos da una sintaxis, un compilador, una gestión de errores, la opción de añadir tests unitarios (como hemos visto más arriba).

Otro gran preprocesador es [PostCSS](https://postcss.org/) el cual nos permite utilizar JavaScript para extender las posibilidades de CSS. Sobre PostCSS encontraréis un post que escribí hace un tiempo en este mismo blog [PostCSS Preset Env, el Babel de CSS](https://softwarecrafters.io/css/postcss-preset-env-babel-css).

## CSS Tools

Existen muchas herramientas para facilitarnos trabajar con CSS, si no me equivoco, la primera herramienta para CSS fue el [validador de CSS](https://jigsaw.w3.org/css-validator/) de la propia W3C.

### Styleguide Generators

- [kss-node](https://github.com/kss-node/kss-node) este lo hemos usado en el framework CSS [rubik](https://github.com/InfoJobs/rubik) en InfoJobs.
- [postcss-style-guide](https://github.com/morishitter/postcss-style-guide) este también lo he utilizado en un proyecto, para generar la guía de estilos de una web.
- [CSS Parsing](https://github.com/davidhund/styleguide-generators#css-parsing-css-source) aquí encontrarás una lista de varios de ellos, probé StyleDocco, pero me gustó más kss-node.

### Linters

- [CSS Lint](http://csslint.net/) el primer linter de CSS que recuerdo, muy útil en su momento, pero al tratarse de un servicio online donde tienes que "pastear" el CSS que quieres analizar en un TextArea, es inviable integrarlo en cualquier entorno de desarrollo.
- [stylelint](https://stylelint.io/) es una gran herramienta para localizar errores en nuestro código, es lo más cercano a un gestor de errores cuando compilamos en un lenguaje. Lo podemos integrar en muchos editores y entornos de desarrollo, permitiendo cambiar a la sintaxis que tengamos acordada en el fichero de configuración en el momento de guardar nuestros cambios.

### Critical-path

Estas herramientas están relacionadas con la web performance, por lo que afectan directamente a la experiencia de usuaria/o.

- [Penthouse](https://github.com/pocketjoso/penthouse) de Jonas Ohlsson
- [Critical](https://github.com/addyosmani/critical) de Addy Osmani
- [CriticalCSS](https://github.com/filamentgroup/criticalcss) de FilamentGroup

### Developer Tools

Las developer tools de los navegadores están repletas de funcionalidades para facilitarnos el desarrollo y depuración del CSS de nuestros proyectos.

Enumerar todas ellas darían para un artículo dedicado (uno de Chrome y otro de Firefox), así que os dejo los enlaces a la fuente y si tenéis alguna duda me podéis consultar.

- [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools?hl=es)
- [Firefox Developer Tools](https://developer.mozilla.org/es/docs/Tools)

## CSS Audits

Las herramientas que voy a comentar aquí podrían estar perfectamente en la sección de CSS Tools, pero les he querido dar una mayor importancia debido a lo realmente útiles que nos pueden llegar a ser en muchas ocasiones y para mantener las buenas prácticas en nuestro CSS.

### CSS Stats

[CSS Stats](https://cssstats.com/) es un servicio online gratuito y Open Source que analiza el CSS de una web o url específica y genera un informe muy detallado. Peso, número de reglas, de selectores, pseudo elementos, colores, fuentes, etc...

[![SoftwareCrafters.io CSS Stats Report](https://user-images.githubusercontent.com/1307927/95793471-f3aa4b00-0ce5-11eb-9f86-84163044b32f.png)](https://cssstats.com/stats/?url=https%3A%2F%2Fsoftwarecrafters.io)

> Aquí podemos ver un ejemplo del CSS de este blog. A primera vista podemos ver que el tamaño del CSS es bastante superior al de Bootstrap 🙈.

Uno de los informes que nos facilita es el de la [especificidad](https://developer.mozilla.org/es/docs/Web/CSS/Especificidad), un tema que puede traernos de cabeza si no lo tenemos interiorizado.

![SoftwareCrafters.io CSS Specificity Report](https://user-images.githubusercontent.com/1307927/95793484-f9079580-0ce5-11eb-8614-770c46a03bad.png)

### Project Wallance

[Project Wallance](https://www.projectwallace.com) es otro proyecto para auditar nuestro código CSS. Es un servicio de pago, que permite tener un historial de los informes para poder compararlos.

![joanleon.dev Project Wallace Dashboard](https://user-images.githubusercontent.com/1307927/95793476-f60ca500-0ce5-11eb-84e3-e114519a1c64.png)

La versión gratuita permite auditar un proyecto, pero sin poder integrarlo con sistemas de integración continua.

## CSS Refactor

En cualquier lenguaje de programación en el momento que guardamos un archivo estamos generando deuda técnica. En el desarrollo CSS no es distinto. Conforme avanza el proyecto tendremos que refactorizar, así como aplicar buenas prácticas en el desarrollo nos ayudará en ese proceso de refactorizar el código, de mejorarlo.

Tenemos herramientas como [autoprefixer](https://autoprefixer.github.io/) que basándose en [Browserslist](https://github.com/browserslist/browserslist) añade los prefijos necesarios a las propiedades CSS para mantener la retrocompatibilidad de los navegadores que estemos soportando en nuestro proyecto.

```css
/* Input ------- */
.example {
    display: grid;
    transition: all .5s;
    user-select: none;
    background: linear-gradient(to bottom, white, black);
}

/* Output -------- */
/*
* Prefixed by https://autoprefixer.github.io
* PostCSS: v7.0.29,
* Autoprefixer: v9.7.6
* Browsers: last 4 version
*/

.example {
    display: -ms-grid;
    display: grid;
    -webkit-transition: all .5s;
    -o-transition: all .5s;
    transition: all .5s;
    -webkit-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
    background: -webkit-gradient(linear, left top, left bottom, from(white), to(black));
    background: -o-linear-gradient(top, white, black);
    background: linear-gradient(to bottom, white, black);
}
```

Aquí estamos definiendo que queremos compilar un código compatible con las últimas 4 versiones de todos los navegadores. En un producto, el cual suponemos que tendrá un vida larga, en 4 años es muy probable que esos prefijos no tengan sentido, hay que eliminarlos, hay que refactorizar.

Si tenemos un flujo de trabajo donde ese proceso esté automatizado, solo tendremos que cambiar la configuración del fichero `.browserslistrc` o actualizar un `@mixin` de Sass, será una tarea fácil, pero sino, nos tocará hacer un refactor considerable.

Existe un libro titulado **CSS Refactoring**, pero es más un libro de buenas prácticas para no generar legacy o facilitar el refactor que casos de uso de refactor como tal, hablo de ello en la sección de los libros.

Tal y como yo tengo entendido el refactor hay dos posibles escenarios:

- Refactor de un código CSS por un cambio de diseño. Esto puede llevar mucho tiempo y muchos test para validar que no estamos rompiendo nada.
- Refactorizar el código conforme vemos mejoras. Cada día aprendemos algo, un nuevo truco, una nueva propiedad CSS que ya es compatible, corregir valores como `margin: 0px`. Como crafters queremos hacer bien las cosas, que nuestro yo del futuro esté orgulloso de nuestro trabajo, pues mejoremos todo lo que podamos o sepamos en ese momento, eso sí, sin presión...no lo sabemos todo, refactorizamos porque hemos aprendido a hacer mejor las cosas.

## CSS Books

Hay bastantes libros sobre CSS, muchos de ellos son genéricos de desarrollo web y dedican unos capítulos a CSS.

Como es un tema que me interesa mantener actualizado, os dejo un enlace a un artículo de mi blog donde tengo, e iré añadiendo, reseñas de los que he leido 👉🏼 [Libros CSS](https://joanleon.dev/libros-css).

## Conclusiones

Aprender CSS es básico para poder desarrollar buenos productos web. CSS no es solo poner colores y montar el grid para que todo encaje. Hay muchas cosas a tener en cuenta como habrás podido ver, y eso que no hemos entrado en temas de accesibilidad o performance. Hay gente muy profesional desarrollando las funcionalidades en lenguajes como C++ para que el motor del navegador acabe convirtiendo en pixeles, en contenido para la usuaria/o.

Hay muchas cosas por aprender, como en cualquier lenguaje, como en cualquier disciplina, hay que aprender, entender, interiorizar y entrenar (aka katas) para mejorar.

Soy Frontend y trabajo con los 3 lenguajes disponibles HTML, CSS y JS para aportar valor en mis soluciones, para aportar valor al producto, para aportar valor a las usuarias/os.

CSS forma parte de la web [#cssIsPartOfTheWeb](https://twitter.com/hashtag/cssIsPartOfTheWeb).
