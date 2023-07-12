La **programación funcional** es una forma de entender nuestro software como una serie de *funciones matemáticas* en las que, dadas unas *entradas* determinadas, siempre obtenemos las mismas *salidas*.

Aunque esté "de moda", este paradigma existe desde antes que la *orientación a objetos*, y está basado en el *cálculo lambda*. Sin embargo, hasta hace relativamente poco permanecía en el ámbito académico y científico.

En el caso de **JavaScript**, aunque no es un lenguaje funcional puro (ya que implementa características imperativas), su flexibilidad y dinamismo nos permiten adoptar un enfoque funcional y métodos como *map*, *filter* y *reduce* nos son de gran ayuda.

Los beneficios de la FP sobre nuestro código son:

- Es mucho más fácil de testear.
- Se reduce la complejidad, al enfocarse en qué vamos a hacer, y no cómo lo haremos.
- El código es más modular, y por lo tanto, más sencillo de entender.
- También es más confiable, al tener la seguridad de que no cambiaremos el valor de ningún recurso compartido.

## Algunos conceptos de la programación funcional

### Parámetros y argumentos

Los **argumentos** son los valores con los que llamamos a las funciones, mientras que los **parámetros** son las variables nombradas que reciben estos valores dentro de nuestra función:

```javascript
const double = x => x * 2; // x es el parámetro de nuestra función

double(2); // 2 es el argumento con el que llamamos a nuestra función
```

### Aridad

La **aridad** de una función hace referencia al número de *parámetros* que tiene. Así pues, una función de *aridad 1* (o unaria) tiene 1 parámetro, una unidad de *aridad 2* (o binaria) tiene 2 parámetros y así sucesivamente (por cierto, a la de *aridad 3* se le llama ternaria).

En **JavaScript**, es posible llamar a una función con más *argumentos* de los *parámetros* que soporta. Simplemente serán ignorados.

```javascript
const double = x => x * 2;

console.log(double(2, 5)); // double(2); // 4;
```

### Funciones puras

Una **función** es **pura** cuando:

- Su salida depende sólamente de los *parámetros* recibidos (es **determinista**), por lo que una llamada a la función se podría sustituir por el valor que devuelve sin que el funcionamiento de la aplicación se viese alterado (**transparencia referencial**).
- Los *parámetros* no son modificados y no se producen **efectos colaterales**. Imaginemos que varias partes de la aplicación apuntasen a la misma referencia que ha recibido nuestra función como argumento y que esta referencia original fuese alterada...


En el caso de **JavaScript**, esto tiene especial importancia, porque tanto los *arrays* como los *objetos* (también las funciones) se copian por referencia y no por valor. Veamos un ejemplo de un *efecto colateral*.

```javascript
// Queremos crear un objeto igual a objA, pero con "prop2" igual a  "newVal2"

const objA = {
  prop1: 'val1',
  prop2: 'val2',
};

const objB = objA;
objB.prop2 = 'newVal2';

console.log(objB); // { prop1: 'val1', prop2: 'newVal2' } ✅ Tenemos nuestro nuevo objeto, pero...
console.log(objA); // { prop1: 'val1', prop2: 'newVal2' } ❌ hemos modificado el objeto original

console.log(objA === objB); // true ❌
```

Si queremos obtener un nuevo objecto, tan solo tenemos que hacer una destructuración del objeto, añadiendo las claves que queremos modificar, o bien usar `Object.assign`:

```javascript
const objA = {
  prop1: 'val1',
  prop2: 'val2',
};

const objB = { ...objA, prop2: 'newVal2');
// o
const objB = Object.assign({}, objA, { prop2: 'newVal2' });

console.log(objB); // { prop1: 'val1', prop2: 'newVal2' } ✅
console.log(objA); // { prop1: 'val1', prop2: 'val2' } ✅

console.log(objA === objB); // false ✅
```

Debemos llevar cuidado con métodos como `reverse`, `splice`, etc, ya que mutan el array original. Una solución sería buscar un método alternativo o bien crear un nuevo array antes de llamar a esos métodos:

```javascript
const options = ['a', 'b', 'c', 'd'];

// en vez de splice(1, 2);
const filteredOptions = options.filter(option => option !== 'b' && option !== 'c'); 

const reversedOptions = [...options].reverse();
```

Algunas librerías, como React, basan su filosofía en el concepto de *immutabilidad*, ya que los componentes son renderizados solo cuando alguna de las propiedades cambia.

En el caso anterior de efecto colateral,  como `objA` es igual a `objB`, si se pasase ese objeto como propiedad, podría suceder que el componente no fuese capaz de detectar esos cambios, y reflejase un estado desactualizado.

Con repecto a la transparencia referencial, imaginemos esta función:

```javascript
const runAtFive = () => {
	if ((new Date()).getHours() === 17) {
		externalFunction();
	}
};
```

Si quisieramos testearla correctamente, necesitaríamos hacer un mock del objeto `Date` (o ejecutar el test solo a las 17h 🤣), además de tener que observar `externalFunction`.

Una aproximación más correcta sería pasar como argumento la hora actual, así como el callback que queremos ejecutar.
El retorno sería el resultado de ejecutar el callback, o `false` en caso contrario, lo que hace a nuestra función mucho más sencilla de testear.

```javascript
const runAtFive = (hour, cb) => hour === 17 && cb();
```

Algunos autores consideran que la utilización de constantes dentro de las funciones no viola los principios anteriormente descritos. Por ejemplo:

```javascript
const SITE_NAME = 'Software Crafters';

const getFullTitle = (sectionTitle) => `${sectionTitle} | ${SITE_NAME}`;
```

En este caso, `getFullTitle` produciría siempre el mismo resultado para una determinada entrada y, además, si en la función reemplazásemos el uso de `SITE_NAME` por su valor, el resultado de la función permanecería inalterable.

### Funciones de Alto Orden (Higher Order Functions)

Las funciones de alto orden son aquellas que se envían como argumento a otra función, o bien son devueltas como resultado de la ejecución de otra función.

```javascript
const double = x => x * 2;
[1,2,3,4,5].map(double); // double actuaría como HOF (Higher Order Function);

// add devuelve una HOF
const add = (x) => {
  if (typeof x === 'number') {
    return y => x + y;
  }
  return y => `${x}${y}`;
}

const addFive = add(5); HOF: y => 5 + y;
console.log(addFive(3)); // 8
console.log(addFive(12)); // 17
```

Dado que, como veremos más adelante, una de las características principales de la programación funcional es la composición de funciones, este concepto nos resulta realmente útil.

### Forma declarativa

Tal y como la propia palabra expresa, cuando programamos de forma declarativa estamos haciendo uso de un alto nivel de abstracción, para decirle al lenguaje (o librería) qué es lo que queremos obtener, en vez de decirle cómo debe obtenerlo.

En el ejemplo anterior, podemos escribir en forma declarativa:

```javascript
[1,2,3,4,5].map(double);
```

o bien en forma imperativa:

```javascript
let arr = [];
for(i=0; i<5; i++) {
  arr.push((i + 1) * 2);
}
```

Ejemplos de lenguajes y librerías declarativas podrían ser GraphQL y React:

```javascript
export const USERS_QUERY = gql`
  query usersQuery {
    users {
      edges {
        node {
          id
          title
          description
          categories
        }
      }
    }  
  }
`;


const { data, loading, error } = useQuery(USERS_QUERY);
return (
  <div>
    {data.map(({ id, title }) => <div key={id}>{title}</div>)}
  </div>
)
```

### Recursividad

La recursividad se da cuando una función se llama a si misma, y es esencial cuando queremos trabajar de forma funcional con estructuras de datos.

```javascript
const concatenateAll = (target, source) => {
  if (Array.isArray(source)) {
    return source.reduce(concatenateAll, target);
  }
  if (typeof source === 'object') {
    return Object.values(source).reduce(concatenateAll, target);
  }
  return `${target}#${source}`;
};

const data = {
  name: 'José Manuel',
  surname: 'Lucas',
  pet: {
    type: 'dog',
    name: 'Hustle',
  },
  hobbies: ['travelling', 'music', 'mountain biking'],
};

console.log(concatenateAll('', data)); // #José Manuel#Lucas#dog#Hustle#travelling#music#mountain biking
```

### Composición de funciones

Imaginemos estas dos funciones:

```javascript
const add3 = x => x + 3;
const double = x => x * 2;
```

Podríamos decir que `double(add3(2))` es el resultado de componer "double" y "add3" sobre "2".

- Se calcula el resultado de aplicar la función "add3" a "2".
- Se calcula el resultado de aplicar la función "double" al resultado anterior.

Dado que podemos predecir el resultado de "add3" y de "double" por separado basándonos en su argumento, podríamos predecir de igual manera el resultado de la composición de las dos funciones.

Para facilitar la escritura de las composiciones de nuestras funciones, se suele hacer uso de las utilidades `compose` y `pipe`. Incluídas en librerías como [ramda](https://ramdajs.com/) o [lodash/fp](https://github.com/lodash/lodash/wiki/FP-Guide), si bien es cierto que la implementación básica es muy sencilla:

```javascript
const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);
const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x);
```

La diferencia es el orden en el que se pasan las funciones:

- **Compose**: Derecha a izquierda. Más cercano a la notación matemática.
- **Pipe**: Izquierda a derecha, más cercano al orden de evaluación.

```javascript
console.log(pipe(add3, double)(2)); // 10 ✅
console.log(compose(add3, double)(2)); // 7❌
console.log(compose(double, add3)(2)); // 10 ✅
```

### Estilo tácito o "point free"

Consiste en omitir los argumentos en aquellos casos donde es posible y hace que nuestra composición de funciones quede mucho más limpia.

Comparemos el ejemplo anterior con un ejemplo sin aplicar el estilo tácito:

```javascript
pipe(add3, double)(2);

//vs

pipe(
  x => add3(x),
  x => double(x),
)(2);
```

### Currificación

La currificación (estricamente hablando) consiste en transformar una función con x parámetros en una secuencia de x funciones con un solo argumento.

```javascript
const sum3 = (a, b, c) => a + b + c;
const curriedSum3 = curry(sum3);

console.log(sum3(2, 4, 3)); // 9
console.log(curriedSum3(2)(4)(3)); // 9
```


Una implementación sencilla podría ser:

```javascript
const curry = (fn, arity = fn.length) => {
  const nextCurried = prevArgs => nextArg => {
    const args = [...prevArgs, nextArg];
    return args.length >= arity ? fn(...args) : nextCurried(args);
  };
  return nextCurried([]);
}
```

Sin embargo, en librerías como ramda, la utilidad curry permite llamar a la función en cualquiera de sus formas, y no sólo argumento a argumento:

```javascript
import { curry } from 'ramda'; 

const sum3 = (a, b, c) => a + b + c;
const curriedSum3 = curry(sum3);

sum3(2, 4, 3);
sum3(2)(4)(3);
sum3(2, 4)(3);
sum3(2)(4, 3);
```

### Aplicación parcial

La aplicación parcial es una técnica similar a la currificación, solo que en este caso producimos una función con una aridad que no necesariamente es 1, simplemente es menor que la función original:

```javascript
const operation = (a, b, c) => a + b - c;

const partialedOp = partial(operation, [2]);
console.log(partialedOp(4, 3)); // 3

// o

const partialedOp = partial(operation, [2, 4]);
console.log(partialedOp(3)); // 3
```

La implementación podría ser algo así:

```javascript
const partial = (fn, predefArgs) => (...args) => fn(... predefArgs, ...args);
```

También es posible la aplicación parcial desde la derecha, es decir, pasar los últimos argumentos y después los primeros:

```javascript
const operation = (a, b, c) => a + b - c;

const partialedOp = partialRight(operation, [3]);
console.log(partialedOp(2, 4)); // 3

// o

const partialedOp = partialRight(operation, [4, 3]);
console.log(partialedOp(2)); // 3
```

## Aislando los efectos colaterales

Si nuestras aplicaciones no pudiesen manejar efectos colaterales bajo ningún concepto no podrían hacer uso de:

- Estado compartido
- Eventos
- Peticiones a una API
- Input del usuario
- Lecturas de tiempo
- Escritura o lectura en disco
- Generación de hashes o de números aleatorios
- etc

Al aplicar un enfoque funcional a nuestro código, el objetivo debe ser aislar todos esos efectos colaterales, no sustituirlos por completo.

Esto se podría resolver mediante una inyección simple de dependencias...

```javascript
/**
 * CÓDIGO PURO
 */
const updateKey = (key, fn) => (obj) => ({
	...obj,
	[key]: fn(obj[key]),
});

const applyPrizeDecrease = updateKey('prize', currentPrize => currentPrize * 0.95);
const applyExpiryDecrease = updateKey('expiry', currentExpiry => currentExpiry > 0 ? currentExpiry - 1 : 0);

const updateItem = pipe(
	applyPrizeDecrease,
	applyExpiryDecrease,
);
const updateData = currentData => currentData.map(getUpdatedItem);

/**
 * CÓDIGO IMPURO
 */
(async () => {
	// Usamos un array vacío como salvaguarda, en caso de que la API responda con un valor "falsy"
	let data = await APIService.get('/endpoint') || [];
	setTimeout(() => {
		data = updateData(data);
	}, 86400000);
})();
```

Imaginemos que queremos obtener el breakpoint actual en base a la anchura de nuestra pantalla. Tan sólo deberíamos aislar nuestros *side effects* (obtener el objeto window) e inyectarlo como dependencia en nuestras funciones puras, que se encargan de extraer la anchura de la pantalla, y de transformarla en un string con el valor del breakpoint.

```javascript
/**
 * CÓDIGO PURO
 **/
const getWidth = x => x.screen.width;
const getBreakpoint = (x) => {
  if (x > 1200) {
    return 'desktop';
  }
  if (x > 600) {
    return 'tablet';
  }
  return 'mobile';
}

const getBreakpointFromWidth = pipe(getWidth, getBreakpoint);

/**
 * CÓDIGO IMPURO
 **/
 console.log(getBreakpointFromWidth(width));

```

Otra opción sería usar un **functor**, que es una función que se encarga de transformar una categoría en otra.

Un ejemplo sencillo sería el functor `Array`, que con el método map nos permite transformar cada uno de sus elementos de una categoría a otra (por ejemplo de `number` a `string`, mediante la función `getFeelFromTemp `).

```javascript
const getFeelFromTemp = temp => (temp > 22 ? 'hot' : 'cold');

const temps = [24, 19, 13, 32];
const feels = temps.map(getFeelFromTemp);
console.log(feels); // ['hot', 'cold', 'cold', 'hot']
```

Para el propósito que nos ocupa, crearemos un functor *effect*, que se encargará de mantener nuestro código puro mientras lo "mapeamos", hasta que lo lancemos con "run".

```javascript
/**
 * CÓDIGO PURO
 */
class Effect {
  static of(f) {
    return new Effect(f);
  }
  
  constructor(f) {
    this.f = f;
  }
  
  map(g) {
    return Effect.of(x => g(this.f(x)));
  }
  
  run() {
    return this.f();
  }
}

const getWindow = () => window;
const getWidth = x => x.screen.width;
const getBreakpoint = (x) => {
  if (x > 1200) {
    return 'desktop';
  }
  if (x > 600) {
    return 'tablet';
  }
  return 'mobile';
}

const breakpointEffect = Effect.of(getWindow).map(getWidth).map(getBreakpoint);

/**
 * CÓDIGO IMPURO
 */
console.log(breakpointEffect.run(100));
```


## Bibliografía

- [Funcional Light JavaScript - Kyle Sympson](https://github.com/getify/Functional-Light-JS)
- [Professor Frisby's Mostly Adequate Guide to Funcional Programming - Brian Lonsdorf](https://mostly-adequate.gitbooks.io/mostly-adequate-guide/)
- [JavaScript Array Methods: Mutating vs. Non-Mutating](https://lorenstewart.me/2017/01/22/javascript-array-methods-mutating-vs-non-mutating/)
- [How to deal with dirty side effects in your pure functonal JavaScript](https://jrsinclair.com/articles/2018/how-to-deal-with-dirty-side-effects-in-your-pure-functional-javascript/)