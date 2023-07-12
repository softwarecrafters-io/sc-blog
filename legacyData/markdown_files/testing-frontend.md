Hace calor, mucho calor, y nadie quiere perder mucho tiempo haciendo tests, leyendo sobre tests y sobre todo escribiendo sobre tests así que voy a intentar condensar en un pequeño artículo todo lo necesario para introducirse en el mundo del testing en frontend.

Voy a saltarme la parte aburrida con un pequeño resumen:

**¿Qué es un test?**

Un test automático es un programa que permite verificar rápidamente que otro programa funciona de la forma esperada.

**¿Qué ventajas tienen los tests?**

Principalmente los tests se utilizan para detectar bugs antes de que los detecten los usuarios del software, contribuyen a aumentar la calidad del código porque facilita a los programadores realizar refactorizaciones más frecuentemente, aceleran la velocidad de desarrollo, sirven como documentación y ayudan a que la arquitectura del software sea más limpia.

**Probablemente ya hagas tests**

Siempre que doy la turra sobre testing a alguien intento hacerle ver que sin darse cuenta está haciendo <u>tests manuales</u> mientras programa. Probablemente te habrás encontrado alguna vez saltando entre el editor de código y la applicación en desarrollo siguiendo una secuencia como esta:

Escribir una linea de código para mostrar un popup, abrir el navegador para ver que se muestra un popup, no se muestra el popup :thinking: abrir el editor, borrar todo y escribir `console.log('hola')` volver al navegador, recargar con la consola abierta, no se muestra nada... el script no se estaba importando... repetir hasta completar la tarea.

El proceso en el que abres el navegador y pruebas a mano algo justo después de escribir código relacionado es un TEST. La clave de todo esto es entender que este proceso <u>se puede</u>, y se debe, <u>automatizar</u>.

**¿Qué forma tiene un test?**

Cuando escribimos un test nos interesa saber cómo se comporta el sistema ante una situación determinada para determinar si este comportamiento es el esperado. Generalmente se habla de 3 fases claramente diferenciadas:

- Una fase inicial en la que establecemos un entorno conocido para ver cómo se comporta el sistema.
- Una fase en la que ejecutamos el código que queremos probar.
- Una fase final en la que comprobamos que el comportamiento del sistema es correcto.

Además, es importante que el test tenga una descripción que indique precisamente:

- Qué parte del sistema se está probando.
- En qué condiciones se está ejecutando ese código.
- Cuál es el resultado esperado.

**Un test debe tener una descripción significativa!**

Para ayudarnos a escribir tests existen librerias cómo por ejemplo [Jest](https://jestjs.io/) sobre las que podríamos dedicar todo el artículo pero en nuestro caso simplemente vamos a ver un ejemplo de cómo escribir un test básico de la función [isArray](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/isArray) del objeto Array.

Lo primero es escribir las descripciones de los tests de forma que se entienda claramente lo que queremos probar:

```js
describe('Array.isArray', () => {
  it('should return true when the parameter is an array');
  it('should return false when the parameter is not an array');
});
```

Esto es muy importante! Mucha gente no le da importancia a escribir buenas descripciones y te encuentras cosas como estas:

```js
describe('isArr', () => {
  it('works ok with object')
  it('pass with array')
});
```

Recuerda, la descripción del test debe responder siempre a las siguientes cuestiones: ¿Qué parte del sistema estamos probando? ¿Bajo que condiciones se está ejecutando el código? ¿Cuál es el resultado esperado?

> Existe una metodolgía para escribir descripciones llamada SWA por sus siglas Should When And que facilita mucho este proceso.

**Implementación**

Una vez tenemos la descripcion escrita, pasamos a implementar el test, siguiendo las tres fases comentadas previamente:

```js
describe('Array.isArray', () => {
  it('should return false when the parameter is not an array', () => {
    const parameter = 'dummy_string'; // Arrange
    const actual = Array.isArray(parameter); // Act
    expect(actual).toBe(false); // Assert
  });
  it('should return true when the parameter is an array', () => {
    const parameter = ['dummy', 'array']; // Arrange
    const actual = Array.isArray(parameter);  // Act
    expect(actual).toBe(true);  // Assert
  });
});
```

**De donde venimos**

Se puede ver que resulta relativamente sencillo probar lógica de negocio escribiendo tests con Jest pero ¿Cómo se aplica esto al mundo del frontend?

Tradicionalmente se recomendaba tener la lógica de negocio escrita en archivos llamados controladores y probados mediante test de unidad y por otro lado tener componentes de "vista" encargados de pintar el html de nuestra aplicación.

El problema es que los tests unitarios sólamente probaban una parte de la aplicación (los controladores) y aunque la lógica esté bien, esto no garantiza que la aplicación funcione correctamente y la única opción que quedaba para probar la aplicación era recurrir a los llamados tests End to End (de principio a fin) con herramientas como [Protractor](https://www.protractortest.org/#/) o [Selenium](https://www.selenium.dev/).

Estos tests lanzaban un navegador automatizado y realizaban tareas similares a las de un usuario o un tester: *Navegar a cierta URL, Comprobar que X boton es visible y está activo, Escribir usuario y contraseña, Hacer click en el botón "login" etc...*

Por desgracia estos tests eran terriblemente engorrosos, el navegador se quedaba colgado, había que recurrir a timeouts, necesitas tener un servidor de desarrollo corriendo...una serie de penurias que los hacían inviables.

**Hacia donde vamos.**

Hace relativamente poco, el proyecto [JSDOM](https://github.com/jsdom/jsdom) se volvió maduro y estable, JSDOM es una implementación para NodeJS de las APIS del DOM, es decir, nos permite tener una especie de navegador web virtual en Node.

Esto entre otras cosas, permitiría montar un componente de Angular/React/Vue, rellenar inputs, o hacer click en sus elementos de forma totalmente sincrona y estable.

Esto hizo que Kent C Dodds escribiese una librería llamada [Testing Library](https://testing-library.com/docs/guiding-principles) cuyo principio fundamental se basa en **escribir tests que imiten el comportamiento del usuario/tester, en lugar de centrarse en detalles de implementación**.

**Un ejemplo sencillo**

Imaginemos una aplicación para comprar tickets de un evento cuya interfaz sería más o menos así:

![](https://user-images.githubusercontent.com/2657897/91171743-4babd480-e6db-11ea-939d-ed299e763047.png)

y se espera que al hacer click en el checkbox *VIP* el precio cambie a 0€. Al final la lógica de negocio es muy sencilla: *Un usuario VIP tiene derecho a entradas gratis y un usuario normal tiene que pagar 20€*

Tradicionalmente, escribiríamos por un lado la [lógica de negocio](https://github.com/IagoLast/frontend-testing-examples/blob/master/src/tickets.service.js) y [su test](https://github.com/IagoLast/frontend-testing-examples/blob/master/src/tickets.service.spec.js) y por otro [un componente de vista](https://github.com/IagoLast/frontend-testing-examples/blob/master/src/AppHooks.js) que utilize esta lógica de negocio pero ¿Cómo probarías esto a mano? ¿Cómo probarías esto si no supieses nada de tests automáticos?

Probablemente abrirías la aplicación, verías que el precio de la entrada son 20€ por defecto, harías click en el checkbox y comprobarías que el precio ha cambiado a 0€ entonces... ¿Por qué no hacer justo esto en los tests automáticos? Esto es justamente lo que se puede conseguir con testing-library y es la corriente dominante en los tests de frontend:

```js
// Importamos las dependencias necesarias, librerías de testing, react y el componente
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from './AppHooks'; 


it('should display 20€ when the user is not VIP ', () => {
  // Renderizamos la app en una pantalla virtual
  render(<App />);
  // Comprobamos que el texto 20€ está visible en la pantalla
  expect(screen.queryByText('20€')).toBeVisible();
});

it('should display 0€ when the user clicks on VIP checkbox ', () => {
  // Volvemos a renderizar la app
  render(<App />); 
  // Hacemos click en el checkbox con la etiqueta "VIP"
  userEvent.click(screen.queryByLabelText('VIP'));
  // Comprobamos que el texto 0€ es visible
  expect(screen.queryByText('0€')).toBeVisible();
});
```

Evidentemente esto es un pequeño ejemplo de todo lo que se puede hacer, pero creeme que una vez empiezas a hacer tests no hay vuelta atrás porque en menos de 10 segundos tienes un feedback realista sobre el comportamiento de tu aplicación que te evitará bugs, regresiones y dolores de cabeza.

Si te interesa saber más sobre el tema, puedes echarle un vistazo a mi libro en [frontend-testing.org](http://frontend-testing.org/) o seguirme en [@iagolast](https://twitter.com/iagolast).