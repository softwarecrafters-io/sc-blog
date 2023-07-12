>**El testing de software puede verificar la presencia de errores pero no la
ausencia de ellos. – Edsger Dijkstra**

**Test Driven Development (TDD)**, o **desarrollo dirigido por test** en castellano, es una técnica de ingeniería de *software* para, valga la redundancia, diseñar *software*. Como su propio nombre indica, esta técnica dirige el desarrollo de un producto a través de ir escribiendo pruebas, generalmente unitarias.

El TDD fue desarrollado por Kent Beck a finales de la década de los 90 y forma parte de la metodología **extreme programming**. Su autor y los seguidores del TDD aseguran que con esta técnica se consigue un código más tolerante al cambio, robusto, seguro, más barato de mantener e, incluso, una vez que te acostumbras a aplicarlo, promete una mayor velocidad a la hora de desarrollar.

![Viñeta de commit strip sobre la importancia de los tests.](https://swcrafters.fra1.cdn.digitaloceanspaces.com/Posts/tdd_test_driven_development/testing_strip.jpg =90%x*)

###### Viñeta de Commit Strip sobre la importancia de los tests.

**NOTA:** Este artículo es un extracto de la sección de testing y TDD de nuestro libro [Clean Code, SOLID y Testing aplicado a JavaScript](https://softwarecrafters.io/ebook-cleancode-javascript). ¡Espero que lo disfrutes!

## Las tres leyes del TDD

Robert C. Martin describe la esencia del TDD como un proceso que atiende a las siguientes tres reglas:

* No escribirás código de producción sin antes escribir un test que falle.
* No escribirás más de un test unitario suficiente para fallar (y no compilar es fallar).
* No escribirás más código del necesario para hacer pasar el test.
  
Estas tres leyes derivan en la repetición de lo que se conoce como el ciclo *Red-Green-Refactor*. Veamos en qué consiste:

## El ciclo Red-Green-Refactor

El ciclo *Red-Green-Refactor*, también conocido como algoritmo del TDD, se basa en:

* **Red**: Escribir un test que falle, es decir, tenemos que realizar el test antes de escribir la implementación. Normalmente se suelen utilizar test unitarios, aunque en algunos contextos puede tener sentido hacer TDD con test de integración.
* **Green**: Una vez creado el test que falla, implementaremos el mínimo código necesario para que el test pase.
* **Refactor**: Por último, tras conseguir que nuestro código pase el test, debemos examinarlo para ver si hay alguna mejora que podamos realizar.
* Una vez que hemos cerrado el ciclo, empezamos de nuevo con el siguiente requisito.

![Ciclo Red-Green-Refactor](https://swcrafters.fra1.cdn.digitaloceanspaces.com/Posts/tdd_test_driven_development/testing_tdd_rgr.png =85%x*)

###### Ciclo Red-Green-Refactor.

Esta forma de programar ofrece dos beneficios principales. El primero y más obvio es que obtenemos un código con una buena cobertura de test, lo que es positivo hasta cierto punto. Recuerda, nos pagan por escribir código que funciona, no por hacer test.

El segundo beneficio es que escribir primero las pruebas nos ayuda a diseñar la API que va a tener nuestro componente, ya que nos obliga a pensar en cómo queremos utilizarlo. Esto suele acabar derivando en componentes con responsabilidades bien definidas y bajo acoplamiento.

## TDD como herramienta de diseño

Cuando Kent Beck desarrolló esta metodología lo hizo centrándose en el segundo de los beneficios que describimos en el apartado anterior, es decir, en TDD como una herramienta de diseño de software que nos ayuda a obtener mejor código, no a obtener más test. Para ello, una vez que tenemos una lista con los primeros requisitos que debe satisfacer el producto, debemos seguir los siguientes pasos:

1. Escogemos un requisito.
2. Escribimos un test que falla.
3. Creamos la implementación mínima para que el test pase.
4. Ejecutamos todos los tests.
5. Refactorizamos.
6. Actualizamos la lista de requisitos.

En el último paso, cuando actualizamos la lista de requisitos, además de marcar como completado el requisito implementado, debemos añadir los nuevos requisitos que hayan podido aparecer.

Normalmente, cuando desarrollamos un producto *software*, los requisitos no están completamente definidos desde el principio, o estos sufren cambios a corto y medio plazo, bien porque son descartados, modificados o porque surgen otros nuevos. TDD encaja muy bien con este tipo de escenarios ya que, además de ir añadiendo test que evalúan que nuestro diseño cumple con los requisitos especificados, ayuda a descubrir nuevos casos que no se habían detectado previamente. A esto último se le conoce como **diseño emergente**.

Esta es la razón por la que para muchos de sus seguidores la última “D” de TDD debería significar *design* en vez de *development*.

## Estrategias de implementación, de rojo a verde.

Quizás uno de los puntos más delicados a la hora de aplicar TDD como herramienta de diseño es en el paso en el que ya tenemos un test que falla y debemos crear la implementación mínima para que el test pase. Para ello Kent Beck, en su libro *[Test Driven Development by Example](https://amzn.to/2mkC2Vt)*, expone un conjunto de estrategias, también conocidas como patrones de barra verde, que nos van a permitir avanzar en pasos pequeños hacia la solución del problema.

### Implementación falsa

Una vez que tenemos el test fallando, la forma más rápida de obtener la primera implementación es creando un fake que devuelva una constante. Esto nos ayudará a ir progresando poco a poco en la resolución del problema, ya que al tener la prueba pasando estamos listos para afrontar el siguiente caso.

La mejor forma de entender el concepto es con un ejercicio práctico. El ejercicio es simple, vamos a construir una función que reciba como parámetro un número entero n y devuelva el n-ésimo número de Fibonacci. Recuerda la sucesión de Fibonacci comienza con 0 y 1, los siguientes términos siempre son la suma de los dos anteriores:

![Sucesión de Fibonacci.](https://swcrafters.fra1.cdn.digitaloceanspaces.com/Posts/tdd_test_driven_development/testing_fibonacci.png =90%x*)

###### Sucesión de Fibonacci

Observando la tabla anterior, podemos darnos cuenta de que los casos *edge* son 0 y 1, además de los más sencillos de implementar. Vamos a empezar por crear el test para n = 0:

```javascript
//Fibonacci, primer test.
describe('Fibonacci should', () => {
  it('return zero if receive zero', () => {
    expect(fibonacci(0)).toBe(0);
  });
});
```

La implementación *fake* más obvia que permite que el test pase es hacer que la función fibonacci devuelva 0 como una constante:

```javascript
function fibonacci(n) {
  return  0;
}
```

Puedes acceder al ejemplo interactivo [desde aquí.](https://repl.it/@SoftwareCrafter/TDD-Fibonnacci)

Una vez que tenemos el primer test pasando, la idea es transformar gradualmente la constante en una expresión. Veámoslo en el ejemplo, para ello primero debemos crear un test para el siguiente caso obvio, n = 1;

```javascript

it('return one if receive one', () => {
  expect(fibonacci(1)).toBe(1);
});
```


Ya tenemos el siguiente test fallando. El siguiente paso obvio es escribir una pequeña expresión con un condicional para una entrada con n = 0 devuelva 0 y para n = 1 devuelva 1:

```javascript
function fibonacci(n) {
  if(n ==0)
    return  0;
  else
   return  1;
}
```


Puedes acceder al ejemplo interactivo [desde aquí.](https://repl.it/@SoftwareCrafter/TDD-Fibonnacci-1)

Como puedes observar, la técnica de la implementación falsa nos ayuda a progresar poco a poco. Principalmente tienes dos ventajas inherentes, la primera es a nivel psicológico, ya que se hace más llevadero tener algunos test en verde, en vez de en rojo, que nos permitan ir dando pasos pequeños hacia la solución. La segunda tiene que ver con el control del alcance, ya que esta práctica nos permite mantener el foco en el problema real, evitando caer en optimizaciones prematuras.

### Triangular

Triangular, o la técnica de la triangulación, es el paso natural que sigue a la técnica de la implementación falsa. Es más, en la mayoría de los contextos, forma parte de la triangulación, basándose en lo siguiente:

1. Escoger el caso más simple que debe resolver el algoritmo.
2. Aplicar *Red-Green-Refactor*.
3. Repetir los pasos anteriores cubriendo las diferentes casuísticas.

Para comprender cómo funciona la triangulación, vamos a continuar desarrollando el ejemplo de Fibonacci, el cual, en parte, ya hemos empezado a triangular. El siguiente caso que podríamos cubrir es para n = 2.

```javascript

it('return one if receive two’, () => {
  expect(fibonacci(2)).toBe(1);
});
```


Puedes acceder al ejemplo interactivo [desde aqui.](https://repl.it/@SoftwareCrafter/TDD-Fibonnacci-2)

En esta ocasión el test pasa, por lo tanto, nuestro algoritmo también funciona para n = 2. El siguiente paso sería comprobar qué ocurre para n = 3.

```javascript
it('returns two if receive three', () => {
  expect(fibonacci(3)).toBe(2);
});
```


Como suponíamos, el test falla. Este paso nos ayudará a aproximarnos a la implementación de una solución más genérica. Ya que podríamos crear una implementación falsa para n = 3 y añadir otro condicional que devuelva 1 para n = 1 y n = 2.

```javascript
function fibonacci(n) {
  if(n == 0)
    return  0;
  if(n == 1 || n == 2)
    return  1;
  else
    return  2; 
}
```

Puedes ver el ejemplo interactivo [desde aquí](https://repl.it/@SoftwareCrafter/TDD-Fibonnacci-3).

Ahora que tenemos los test pasando, vamos a comprobar qué sucede para n = 4:

```javascript
it('returns three if receive four', () => {
  expect(fibonacci(4)).toBe(3);
});
```

Al llegar a este punto, ya te habrás dado cuenta de que sería más fácil escribir la implementación obvia que seguir haciendo ramas de decisión:

```javascript
function fibonacci(n) {
  if(n == 0)
    return 0;
  
  if(n == 1 || n == 2)
    return 1;
  
  else
    return fibonacci(n - 1) + fibonacci(n - 2);
}
```

En este paso, nuestro algoritmo funciona para cualquier valor de n, aunque aún podemos refactorizarlo para eliminar duplicidades y darle un aspecto más funcional:

```javascript
function fibonacci(n) {
  const partialFibonacci = (n) => 
    n == 1
      ? 1
      : fibonacci(n - 1) + fibonacci(n - 2)

  return n == 0
    ? 0
    : partialFibonacci(n)
}
```

Puedes acceder al ejemplo interactivo [desde aquí](https://repl.it/@SoftwareCrafter/TDD-Fibonnacci-4).

Con este último paso hemos resuelto el algoritmo de Fibonacci aplicando un enfoque funcional y utilizando la triangulación. Quizás en un hipotético siguiente paso deberíamos eliminar los test para n=3, n=4 y n=5, ya que en este punto no aportan demasiado valor, y crear un test que compruebe el algoritmo generando un número aleatorio mayor que 2 cada vez que se ejecuta.

Como puedes observar, la triangulación es una técnica muy conservadora para aplicar TDD, su uso tiene sentido cuando no tenemos clara la implementación obvia de la solución.

### Implementación obvia

Cuando la solución parece muy sencilla, lo ideal es escribir la implementación obvia en las primeras iteraciones del ciclo *Red-Green-Refactor*.

La problemática con esto surge cuando nos precipitamos, creyendo que se trata de un problema sencillo, cuando en realidad no lo es, porque tiene, por poner un ejemplo, algún caso *edge* sobre el que no habíamos reflexionado.

## Limitaciones del TDD


Por muchos beneficios inherentes que tenga (o que nos prometan), la técnica del TDD no debe entenderse como una religión ni como una fórmula mágica que vale para todo. Seguir TDD a rajatabla y en todos los contextos no garantiza que tu código vaya a ser más tolerante al cambio, robusto o seguro, ni siquiera te asegura que vayas a ser más productivo a la hora de diseñar *software*.

Desde mi punto de vista, aplicar TDD no encaja bien en todos los contextos. Por ejemplo, si existe una implementación obvia para un caso de uso, directamente la escribo y luego hago las pruebas. En el caso de estar trabajando en el *frontend* tampoco me planteo hacer TDD para diseñar componentes de la *UI*. Incluso es discutible si se deberían hacer test unitarios para probar elementos de la *UI*, desarrolladores de la talla de Ward Cunningham han comentado repetidas veces que no conviene hacer test automatizados sobre esta, ya que es muy cambiante y los test quedan desactualizados con demasiada frecuencia.

Mi consejo es que pruebes, trates de aplicarlo en tu día a día durante una temporada y luego decidas por ti mismo. 

Recuerda que esta entrada es un extracto de la sección de testing y TDD de nuestro libro [Clean Code, SOLID y Testing aplicado a JavaScript](https://softwarecrafters.io/ebook-cleancode-javascript). Si te ha gustado, valora y comparte en tus redes sociales. No dudes en comentar dudas, aportes o sugerencias. ¡Estaré encantado de responder!