Hoy en día es bien sabido que la utilización de patrones y buenas prácticas de programación nos ayudan en la creación y mantenimiento de nuestro software.

Hay una gran variedad de patrones interesantes, a medida que los vas aplicando descubres que cada uno de ellos te ayuda a cumplir que tu software sea más ***-ble** (mantenible, extensible, entendible, testeable, etc.)

En este artículo me gustaría introducirte el patrón **Inyección de Dependencias** relacionado con una serie de buenas prácticas y patrones que veremos a continuación, empecemos.

## ¿Por qué aprender este patrón?

Una de las principales razones para las que me gusta aplicarlo, es para **reducir el acoplamiento** entre las diferentes piezas de mi software.

La práctica me demuestra que si **reduzco el acoplamiento** tendré una mejora en mis **-ble**(recuerda: mantenible, extensible, entendible, testeable, etc.) Pero… ¿Por qué quiero cumplir todo esto? Pues entre otras cosas podré hacer mejor software con menor coste que no tenerlos en cuenta. ¿Qué más me da tener menos costes? Bueno parece que si cumplo todo esto reduciré mis tiempos en las mismas tareas, menos estrés y quién sabe si una vida más feliz.

Es decir, si usará un poco de *clickbait*, podría cambiar el título por **Cómo ser más feliz gracias a la inyección de dependencias :)**

![](https://swcrafters.fra1.cdn.digitaloceanspaces.com/Posts/inyeccion-de-dependencias-componentes/1.gif)

Aun así, puede ser que el *clickbait* no sea suficiente para convencerte, veamos algunas otras ideas, para ello necesito presentarte a la **D** de [**SOLID](https://softwarecrafters.io/cleancode-solid-testing-js).**

¿Los principios qué? Los principios [SOLID](https://softwarecrafters.io/cleancode-solid-testing-js), son unos principios pensados para hacer nuestro software más **-ble** son un resumen de las buenas prácticas propuestas en el año 2000 por el famoso **Uncle Bob ([Robert C. Martin](https://en.wikipedia.org/wiki/Robert_C._Martin)) **y son unos principios básicos del mundo del software que deberías conocer (y no solo porqué los pregunten en las entrevistas).

Si quieres profundizar en SOLID, te recomiendo que le eches un vistazo al e-book de Software Crafters:

* [https://softwarecrafters.io/cleancode-solid-testing-js](https://softwarecrafters.io/cleancode-solid-testing-js)

## Inversión de Dependencias

El principio de **Inversión de Dependencias** más conocido como [*Dependency Inversion](https://en.wikipedia.org/wiki/Dependency_inversion_principle)** nos introduce que dados dos módulos relacionados entre si, por ejemplo **A** y **B**. Ninguno de ellos dos debería depender del otro, deberíamos usar una **abstracción** para esa relación. Eso permite que **A** o **B** no conozcan realmente al otro, simplemente entienden que cumple esa abstracción mencionada anteriormente.

En la mayoría de los lenguajes *(en casi todos los que se me ocurren)* a esa abstracción la llamamos **Interfaz** y las interfaces en software no son más que **contratos** que deben ser cumplidos, es decir si **A** necesita a **B**, oficialmente diremos que **A** necesita a alguien que cumpla la interfaz (el contrato) **IB** (la mayoría de las veces si tenemos un módulo llamado **B**, al contrato le pondremos una **I** delante para identificarlo como interfaz de **B**). Y en este caso **B** cumplirá ese contrato, aunque a **A** le da igual que quién cumpla **IB** sea **B, C, D **o** Z.**

![](https://swcrafters.fra1.cdn.digitaloceanspaces.com/Posts/inyeccion-de-dependencias-componentes/2.gif)

¿Interesante verdad? Antes de pasar a la inyección de dependencias me gustaría hablarte de un **Patrón de Diseño** también muy interesante y relacionado.

## Inversión de Control

El patrón de diseño, **Inversión de Control** conocido como [*Inversion of Control* (IoC)](https://en.wikipedia.org/wiki/Inversion_of_control). Nos explica que cuando una clase (o componente, pieza de software) depende de otra clase la primera no debería gestionar el **ciclo de vida** de la segunda, esto debería ser hecho en **otro ámbito**.

En palabras sencillas, viene a decir que si en el constructor de tu clase haces un new B(); parece que puedes hacerlo mejor. 

Este otro ámbito no suele estar especificado, aunque casi siempre acabaremos llamándolo **Contenedor**.

Lo que haremos cuando estemos en **A** y queramos usar **B** no será crear una nueva instancia del segundo, le pediremos a este **Contenedor** (o el elemento correspondiente) que nos provee de **B** y será en este en el que caerá la responsabilidad de gestionar todo el ciclo de vida de **B**.

![](https://swcrafters.fra1.cdn.digitaloceanspaces.com/Posts/inyeccion-de-dependencias-componentes/3.gif)

## ¿Y entonces qué es la Inyección de Dependencias?

Una vez damos por hecho que nos interesa la **Inversión de Dependencias** y la **Inversión de Control** puede ser muy interesante tener una herramienta (o en este caso un patrón) que nos ayude a cumplir ambas. 

Esto es la **Inyección de Dependencias**, un patrón que nos da una solución a las dos prácticas anteriores, pero no tiene por qué ser la única solución a esas prácticas, puede haber otras distintas. Esta simplemente nos da solución a ambas a la vez.

Cuando estamos en **A** y queremos **B**, le pedimos a nuestro **Contenedor** que por favor nos provee a alguien que cumpla el contrato **IB** y dependiendo del caso este contenedor nos dará **B** o un equivalente que corresponda. Por ejemplo, si estamos testeando quizá recibimos **MockB**.

![](https://swcrafters.fra1.cdn.digitaloceanspaces.com/Posts/inyeccion-de-dependencias-componentes/4.gif)

## Empezando a trabajar con Inyección de Dependencias

Después de toda la teoría expuesta, vamos a empezar a trabajar con la Inyección de Dependencias de forma práctica, poco a poco.

Imaginemos primero que tenemos un **Servicio** llamado **CartService** básicamente es un servicio que nos ayuda a gestionar el carrito de la compra de nuestro software. Pero tenemos la necesidad de usar otro servicio de **Insights** para saber cuando un usuario añade un producto, lo borra, etc.

![](https://swcrafters.fra1.cdn.digitaloceanspaces.com/Posts/inyeccion-de-dependencias-componentes/5.gif)

Podemos importar este otro servicio de **Insights** de diferentes modos, una forma seria importar el objeto entero de tal modo que en cualquier otro servicio que importemos **Insights** tendremos la misma instancia.

Esto sería lo más parecido a un [**’’’Singleton’’’](https://en.wikipedia.org/wiki/Singleton_pattern)** que hagamos en Frontend.

![](https://swcrafters.fra1.cdn.digitaloceanspaces.com/Posts/inyeccion-de-dependencias-componentes/6.png)

Y si no queremos que cada vez que se importe **Insights** sea la misma instancia, lo que podemos hacer es importar la clase e instanciar cada vez que lo necesitemos. Muy bien esto parece algo más de tipo **’’’Transient’’’.**

![](https://swcrafters.fra1.cdn.digitaloceanspaces.com/Posts/inyeccion-de-dependencias-componentes/7.png)

¡Felicidades! Con esto tendríamos una aproximación muy simple a lo que es **Inyección de Dependencias** pero una vez leída la teoría podemos al menos entender que está pasando.

El problema es que siguen faltando muchos puntos a comentar, las clases tienen mucha responsabilidad, no he hablado de ningún contenedor, ni siquiera menciono las abstracciones, etc.

Vamos a ver la **Inyección de Dependencias** paso a paso, hasta llegar a lo que considero el escenario ideal en Frontend para inyectar dependencias.

## Paso 1: Semi-Inyección

![](https://swcrafters.fra1.cdn.digitaloceanspaces.com/Posts/inyeccion-de-dependencias-componentes/8.png)

En este caso ya no importamos **Insights** directamente, sino que importamos una [**Factoría](https://es.wikipedia.org/wiki/Factory_Method_(patr%C3%B3n_de_dise%C3%B1o))**, esto nos ayuda a abstraernos y no saber (desde **CartService**) si este primero es **Singleton** o **Transient** de hecho nos da igual.

Además pasamos las dependencias por el constructor de **CartService** lo que empieza a parecer una **Inyección** al uso.

Este primer nivel es un nivel académico y no tiene por qué ser un patrón ideal para usar en proyectos, pero a veces puede ser más que suficiente (tal y como me demostró mi compañero [Carlos de Miguel](https://twitter.com/demiguelfer)).

## Paso 2: Auto-Inyección

![](https://swcrafters.fra1.cdn.digitaloceanspaces.com/Posts/inyeccion-de-dependencias-componentes/9.png)

En el siguiente ejemplo académico, lo que buscamos es que no tengamos que depender siquiera de ninguna factoría, y además utilizamos unos decoradores para ocultar el hecho de que tengamos que pasar las dependencias por el constructor. 
Se parece un poco a como lo hacía Angular 1 y los decoradores se parece a librerías más modernas.

De momento sigue siendo **Insights** quién decide que tipo de inyección va a realizar, lo cual es bueno porqué no lo hace **CartService** pero se puede mejorar.

## Paso 3: Inyección con Contenedores

![](https://swcrafters.fra1.cdn.digitaloceanspaces.com/Posts/inyeccion-de-dependencias-componentes/10.png)

Este ejemplo empieza ya a ser interesante y algo más práctico, añadimos un **Contenedor** que se encargue de manejar todo lo relacionado con las dependencias del proyecto (o del módulo).

Esto nos ayuda mucho ya que ahora los **Servicios** son solo responsables de su lógica y es este **Contenedor** el encargado de decidir:

* Cuando se instancias las dependencias.

* Cómo se instancia cada una de ellas (*Singleton, Transient*)

* En qué orden se van a registrar.

Hemos llegado al ecuador de los pasos, pero todavía no tenemos algo totalmente funcional, sigamos con el paso 4.

## Paso 4: Un mundo más realista

![](https://swcrafters.fra1.cdn.digitaloceanspaces.com/Posts/inyeccion-de-dependencias-componentes/11.png)

Aunque en el ejemplo anterior tenemos algo bastante funcional, es verdad que eso de pasar al constructor un parámetro y que mágicamente aparezca ahí sin darle un tipo o un id o algo es bastante automágico (Angular 1 :D).

En este siguiente paso decoramos los parámetros asignando un ID que van a ser con los que nuestro contenedor identifique la dependencia.

Esto nos da una solución bastante sencilla y real, pero en otros lenguajes utilizamos **Abstracciones** para ahorrarnos el ID.

## Paso 5: Añadiendo Abstracciones

![](https://swcrafters.fra1.cdn.digitaloceanspaces.com/Posts/inyeccion-de-dependencias-componentes/12.png)

Si añadimos [**TypeScript](https://www.typescriptlang.org/)** a la mezcla podemos usar **Interfaces** como **Abstracción.**

Primero, permíteme comentar que esto no es un paso obligatorio si trabajas en Frontend, pero si quieres una capa de **Abstracción** va a ayudarte mucho.

Ahora identificamos las dependencias por su **Interfaz** además de por su ID y aquí es donde se abre un pequeño debate.

Aunque solo con la **Interfaz** debería ser más que suficiente, por el momento los navegadores no interpretan **TypeScript**, así que una vez compilado el navegador no va a tener nada que interpretar si no tenemos ese ID, por suerte si ponemos un poco de la famosa automagia, podemos llegar a ocultar eso con un poco de [**Reflection](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Reflect).**

## Paso 6: Implementando DI en los Componentes

![](https://swcrafters.fra1.cdn.digitaloceanspaces.com/Posts/inyeccion-de-dependencias-componentes/13.png)

Aunque en la mayoría de lenguajes de programación usamos **Inyección de Dependencias** a través del constructor, en los componentes puede ser más sencillo cambiar a inyección por propiedad, como por ejemplo se hacía en algunas versiones de Android.

La funcionalidad es exactamente la misma pero nos quedará un código más parecido al de la foto anterior, al que también se le ha añadido **Reflection** para que no tengamos que usar los id* (aunque debe ser siempre un paso opcional).*

¿Pero hay de verdad algo real detrás de todo esto?

## La librería para inyectar dependencias

Cómo siempre en el software, podríamos crear nuestra propia librearía de **Inyección de Dependencias** o utilizar una que ya exista. En mi caso me gusta mucho [Inversify](http://inversify.io/) de [Remo H. Jansen](https://twitter.com/RemoHJansen).

Tras mucho tiempo utilizándola en proyectos reales y en producción, creamos un pequeño *wrapper* llamado [**Inversify-Props](https://github.com/CKGrafico/inversify-props)** que ayuda en el **Paso 6** de los ejemplos anteriores.

![](https://swcrafters.fra1.cdn.digitaloceanspaces.com/Posts/inyeccion-de-dependencias-componentes/14.gif)

En la [documentación](https://github.com/CKGrafico/inversify-props) se pueden observar ejemplos de cómo usar la librería, pero analicemos un par de ellos.
```javascript
    import 'reflect-metadata'; // Import only once
    import { container, inject } from 'inversify-props';
    
    container.addSingleton<IService1>(Service1);
    container.addSingleton<IService2>(Service2);
    
    export default class extends Component {
      @inject() service1: IService1;
      @inject() service2: IService2;
    }
```

Esta librería ya gestiona el contenedor por ti, simplemente lo importas y añades los servicios que quieras, después en cada componte *(de cualquier framework)* inyectas la dependencia utilizando decoradores.

En el ejemplo anterior se usa *reflection* para no tener que utilizar IDs pero es algo totalmente opcional y la librería autogenera IDs para que puedas utilizarlos si no quieres usar *reflection*.
```javascript
    import 'reflect-metadata'; // Import only once
    import { cid, container, inject } from 'inversify-props';
    
    container.addSingleton<IService1>(Service1);
    
    export default class extends Component {
      @inject(cid.IService1) service1: IService1;
    }
```

Incluso puedes usar cualquier ID que prefieras.
```javascript
    import 'reflect-metadata'; // Import only once
    import { container, inject } from 'inversify-props';
    
    container.addSingleton<IService1>(Service1, 'myid');
    
    export default class extends Component {
      @inject('myid') service1: IService1;
    }
```

Para marcar un servicio como candidato a ser inyectado utilizamos el decorador propio de **Inversify**.
```javascript
    // iservice1.ts
    export interface IService1 {
        method1(): string;
    }
    
    // service.ts
    @injectable()
    export class Service1 implements IService1 {
      method1(): string {
        return 'method 1';
      }
    }
```

Pues esto es todo sobre **Inyección de Dependencias, Inversión de Control e Inversión de Dependencias** ¿Qué te parece? ¿Sueles inyectar dependencias en tus proyectos de Frontend? ¿Y en los de Backend? Empieza ahora mismo y disfruta de las facilidades de uno de los patrones más interesantes que podrás aprender este año.

**BONUS:** ¿Usas *hooks*? No te pierdas la [versión simplificada para usar en Hooks](https://github.com/CKGrafico/inversify-hooks).
