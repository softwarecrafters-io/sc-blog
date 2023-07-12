[TypeScript](https://www.typescriptlang.org/) es un lenguaje que extiende JavaScript para dotarlo de un *tipado estático*. Esto quiere decir que la comprobación y verificación de los tipos se realiza en tiempo de *compilación* (cuando se convierte de TS a JS) en vez de en tiempo de *ejecución* (cuando el motor de JS interpreta el código).

Una de las características principales de JavaScript es su dinamismo. Una variable se puede asignar a cualquier tipo, sin necesidad de declararlo previamente.

Este código, aunque engorroso e inútil, sería perfectamente válido en JS:

```js
let return;

function cb(value) {
  return = value;
}
```

Sin embargo, el compilador de TS necesita conocer previamente qué tipo de valores vamos a asignar a esta variable, de tal forma que se pueda operar con ella con seguridad (por ejemplo evitando que se puedan sumar un *string* y un *number*, dando lugar a resultados impredecibles).

```typescript
// la forma de declarar el tipado es añadiendo
// dos puntos ":" junto a la declaración
let return: number;

function cb(value: number) {
  return = value;
}
```

Dada la filosofía modular y orientada a componentes de React, TypeScript se convierte en el aliado perfecto, asegurando la perfecta cohesión de todos los elementos de nuestra arquitectura.

## Instalando y configurando el entorno de trabajo

Tal y como cuando trabajamos con JavaScript, la forma más sencilla de configurar el entorno de desarrollo para un proyecto basado en React es usando [create-react-app](https://create-react-app.dev/), con la salvedad de que le pasaremos el parámetro adecuado para configurar nuestra **template** en modo **typescript**:

```sh
# yarn
yarn create react-app miproyecto --template typescript

# npx
npx create-react-app miproyecto --template typescript
```

Una opción siempre interesante es configurar eslint con el estándar de preferencia, por ejemplo el de [AirBnB](https://www.npmjs.com/package/eslint-config-airbnb-typescript).

## Conceptos básicos

### Variables

En TypeScript todas las variables están designadas dentro de un ámbito (scope), por lo que sólo se puede usar **let** o **const**. Esta última además impide su reasignación. Más sobre el concepto de hoisting: [https://developer.mozilla.org/es/docs/Glossary/Hoisting](https://developer.mozilla.org/es/docs/Glossary/Hoisting).

Cuando declaramos una constante (mediante el uso de **const**) usualmente no necesitamos declarar el tipo, puesto que este se *infiere* automáticamente. Es decir, al declarar un valor, que no se puede reasignar, el compilador es capaz de "adivinar" cuál es el tipo adecuado para ese valor.

```typescript
const myStr = 'a'; // el tipo sería 'a', que es un subconjunto de 'string'
const myNumber = 5; // el tipo sería 5, que es un subconjunto de 'number'
```

En el caso de una variable (definida con **let**), también se produciría esta inferencia. Sin embargo, puesto que si que se puede reasignar, el tipo sería menos restrictivo que en el caso anterior.

```typescript
let myStr = 'a'; // el tipo sería 'string'
let myNumber = 5; // el tipo sería 'number'

myStr = 'b'; // el tipo sigue siendo 'string'
myNumber = 6; // el tipo sigue siendo 'number'
```

Llegados a este punto nos preguntamos: *¿Qué pasaría si necesitasemos reasignar cualquiera de las variables y asignarles el valor `null`?*

Además de un valor, `null` también es un tipo, y el compilador se "quejaría", puesto que no hemos previsto que nuestra variable pueda almacenar ese tipo de valor. Es por esto que la inferencia por sí sola no sería suficiente, y tenemos que "echar un cable" a nuestro intérprete declarando un tipo menos restrictivo para nuestra variable:

```typescript
let myStr: string | null = 'a'; // esto se llama "Union Type" y nos permite aplicar un operador "OR" a nuestros tipos

myStr = 'b'; // podríamos seguir asignando un string a nuestra variable

myStr = null; // pero también podríamos declararla como "null"
```

Los tipos básicos más usados son:

- `null`
- `undefined`
- `number`
- `string`
- `boolean`
- `void`

### Arrays

Cuando declaramos un tipo Array en TypeScript, debemos declarar qué tipos diferentes puede almacenar en sus posiciones. La forma más sencilla de hacer esto es mediante la palabra reservada `Array`, pasando los `genéricos` (luego veremos qué son) entre "menor que" y "mayor que":

```typescript
let myArr: Array<string | number>;

myArr.push('a');
myArr.push(2);
```

Otra forma equivalente de hacer lo mismo es declarando el tipo del item (que en este caso coincidiría con el genérico anterior) y añadiendo al final unos `corchetes` `[]`. Como el tipo de cada item es un **Union Type**, debemos recordar englobarlo entre paréntesis para que los corchetes afecten a cada uno de los tipos. 

```typescript
let myArr: (string | number)[];

myArr.push('a');
myArr.push(2);
```

Uno de los problemas más comunes en JS es la *mutabilidad*. Cuando le asignamos un array, un objeto o una función a una variable, en realidad lo que hacemos es hacer que apunte hacia una referencia, que es compartida cuando se copia a otra variable. Si modificamos cualquiera de las dos variables, la referencia original se verá afectada.

```js
const a = ['uno'];
const b = a;
b.push('dos'); // ahora, tanto "a" como "b" valen ['uno', 'dos'];
```

Para evitar este problema han surgido multitud de soluciones. Desde envolver nuestro array con `Object.freeze` hasta el uso de librerías como [Immutable](https://immutable-js.github.io/immutable-js/).

En TypeScript, la immutabilidad en los arrays está asegurada gracias al uso de `ReadonlyArray`, incluso en estructuras de datos encadenadas (objetos dentro de arrays):

```typescript
const myArr: ReadonlyArray<number | string> = ['a', 2];

// si intentásemos hacer un "push" a "myArr" el compilador nos devolvería un error, porque no se puede mutar
```

Obviamente podríamos generar un nuevo array usando datos del primero sin problemas, puesto que no habríamos mutado el array original:

```typescript
const myArr: ReadonlyArray<number | string> = ['a', 2];

const myDerivedArr = [...myArr, 'b', 3];
```

Otra posibilidad para declarar nuestro array es hacerlo por medio de las *const assertions*:

```typescript
const roles = ['can_read', 'can_write'] as const;
```

Con esto, estamos declarando nuestro array como `Readonly` automáticamente, y además, hacemos que el tipo del array coincida con su valor, en vez de con su primitiva. Esta sería la declaración del mismo array declarado sin y con *const assertion*:

```typescript
declare const noConstRoles: string[];
declare const roles: readonly ["can_read", "can_write"];
```

### Objetos

Podemos declarar un objeto en Typescript de varias formas. La más sencilla es declarar un `type` que contenga cada una de las propiedades del objeto:

```typescript
type Person = {
  name: string,
  email: string,
  age: number,
};

let person: Person;

person = {
  name: 'Bruce Wayne',
  email: 'bruce@wayneindustries.com',
  age: 57,
}
```

Otra opción bastante similar es declarar el tipo de nuestro objeto por medio de una `interface`:

```typescript
interface Person {
  name: string;
  email: string;
  age: number;
};

let person: Person;

person = {
  name: 'Bruce Wayne',
  email: 'bruce@wayneindustries.com',
  age: 57
}
```

Merece la pena reseñar que es posible generar un tipo para un objeto a partir de otros dos tipos existentes por medio de un *Intersection type*. Funcionaría tanto con `types` como con `interfaces`:

```type
interface Profile {
  name: string;
  age: number;
}

interface Contact {
  email: string;
}

type Person = Profile & Contact;

let person: Person;

person = {
  name: 'Bruce Wayne',
  email: 'bruce@wayneindustries.com',
  age: 57
}
```

Una de las preguntas que se nos pueden venir a la cabeza es: "¿Qué pasa si alguna de las propiedades es opcionales?". Para ello tan solo tenemos que añadir una interrogación `?` detrás del nombre de la propiedad:

```typescript
type Person = {
  name: string,
  email: string,
  age?: number,
};

let person: Person;

person = {
  name: 'Bruce Wayne',
  email: 'bruce@wayneindustries.com',
  age: 57,
}

person = {
  name: 'Jordi Hurtado',
  email: 'jordi.hurtado@rtve.es',
}

```

Otra posibilidad de definir nuestro objeto es mediante el uso de `Record`. Este recibe dos genéricos, el primero define el tipo para las claves, y el segundo el tipo para los valores.

```typescript
type Messages = Record<string, string>;

let messages: Messages = {
  success: 'La operación se ha completado con éxito',
  notFound: 'No se ha encontrado',
  error: 'Error general',
};
```

Como en el caso de los arrays, también podemos inferir el tipo de un objeto si lo declaramos con una *const assertion*:

```typescript
const config = {
  apiURL: 'http://0.0.0.0:9000',
  apiVersion: 'v2',
  publicKey: 'pl3as3d0nthackm3'
} as const;
```

...y este sería el tipo correspondiente generado:

```typescript
declare const config: {
    readonly apiURL: "http://0.0.0.0:9000";
    readonly apiVersion: "v2";
    readonly publicKey: "pl3as3d0nthackm3";
};
```

### Funciones

En muchos casos, tan solo necesitamos tipar los argumentos recibidos. El tipo de respuesta será inferido automáticamente.

```typescript
function double(x: number) {
  return x * 2;
}
```

Ocurre lo mismo para las *arrow functions*:

```typescript
const double = (x: number) => x * 2;
```

Podemos extraer el tipado de una función tanto a un `type`:

```typescript
type ChangeNumber = (x: number) => number;
```

como a una interface

```typescript
interface ChangeNumber {
    (x: number): number
}

const double: ChangeNumber = function(x) {
    return x * 2;
}
```

### `any` y `unknown`

Cuando usamos el valor `any`, permitimos que se asigne o se reciba cualquier tipo de valor. Sin embargo, esto es peligroso, porque podríamos ejecutar cualquier código problemático sin que el compilador nos advierta:

- Incrementar un *array* como si fuera un numérico
- Acceder a una posición de un array cuando en realidad el valor es un numérico

`unknown` es bastante similar, pero en este caso el compilador nos obliga a realizar las comprobaciones necesarias antes de ejecutar cualquier acción que solo esté disponible para un tipo concreto:

```typescript
const stringify = (value: unknown): string => {
  if (value instanceof Date) {
    return value.toISOString();
  }
  if (Array.isArray(value) || typeof value === 'object') {
    return JSON.stringify(value);
  }
  if (typeof value === 'number') {
    return value.toLocaleString();
  }
  return String(value);
}
```

### Genéricos

Ya hemos visto anteriormente cómo usar genéricos para definir los tipos que se podían almacenar en un array, por ejemplo `ReadonlyArray<string`.

Otro de los usos más comunes es para definir el tipo de un argumento cuando no lo conocemos previamente. Imaginemos la siguiente función en JavaScript:

```js
const castArray = (x) => Array.isArray(x) ? x : [x];

castArray(1); // [1]
castArray([1]); // [1]
castArray('b'); // ['b']
castArray({ name: 'Bruce Wayne' }); // [{ name: 'Bruce Wayne' }]
```

Si quisieramos convertir esta función a TypeScript tendríamos que declarar el argumento como `unknown` o bien crear un *Union Type* a partir de todos los posibles. Sin embargo, aún así, se perdería la inferencia, puesto que la respuesta también sería un array de cualquiera de esos tipos, en vez de especificar el concreto para cada caso. Para solucionar este problema podemos hacer uso de los genéricos.

En el siguiente ejemplo, declaramos un argumento que puede ser un array que a su vez incluya cualquier tipo, o bien un elemento individual de cualquier tipo. En el primer caso devuelve el propio array, mientras que en el segundo lo envuelve en un array. En los dos casos, el tipo devuelto es el mismo.

```typescript
function castArray<T>(x: T | T[]): T[] {
  return Array.isArray(x) ? x : [x];
}
```

### @types

Habrá muchas ocasiones en las que tengamos que trabajar con una librería externa. Aquí pueden pasar 3 cosas:

- Que la librería esté escrita en TS, o que incluya un fichero de definiciones de tipos.
- Que la librería no incluya ese fichero de forma nativa, pero que esté disponible de forma externa.
- Que la librería no soporte TS

En el primer caso, no necesitaremos hacer nada más para interactuar con la librería. En la mayor parte de las ocasiones no cubiertas por el primer caso, alguien se ha tomado la molestia de crear este fichero de definiciones en el repositiorio de [definitelytyped](https://definitelytyped.org/).

Este es el caso de **react-router-dom**. Si queremos trabajar con esta librería en nuestro proyecto, tan solo debemos instalar la definición de tipos al mismo tiempo que la librería:

```sh
yarn add react-router-dom @types/react-router-dom
```

Y ya estarían incorporados los tipos de react-router-dom de forma automática en nuestro proyecto.

## Componentes

En el caso de los componentes más simples (aquellos que no esperan ninguna propiedad), el compilador es capaz de inferir automáticamente el tipo devuelto (`JSX.Element`):

```typescript
import React from 'react';

const MyComponent = () => (
    <div>Simple Component</div>
)

export default MyComponent;
```

En caso contrario, debemos hacer uso del tipo `FC` o `FunctionalComponent`. Este tipo recibe un genérico correspondiente a las props:

```typescript
import React, { FC, ReactNode, SyntheticEvent } from 'react';

interface Props {
  onClick: (e: SyntheticEvent) => void;
  children: ReactNode;
}

const MyButton: FC<Props> = ({ onClick, children }) => (
    <button type="button" onClick={onClick}>{children}</button>
)

export default MyButton;
```

Como habrás observado, aquí estamos utilizado otros dos tipos nuevos:

- **ReactNode**: Cualquier tipo de valor que React pueda renderizar (`ReactElement`, `string`, `number`, `Fragment`, `null`...)
- **SyntheticEvent**: Una instancia del contenedor que usa React para manejar los eventos

La declaración de `children` es opcional al usar el tipo `FC` puesto que ya la incluye. En el caso de los componentes cuya única propiedad es `children` podemos omitir el uso del genérico:

```typescript
import React, { FC } from 'react';

const MyComponent: FC = ({ children }) => (
    <div>{children}</div>
)

export default MyComponent;
```

En cualquier momento podemos marcar una propiedad como opcional, así como pasarle un valor por defecto:

```typescript
import React, { FC } from 'react';

type Props = {
  id: string;
  tabIndex: number;
  role?: string;
  hidden?: boolean;
}

const MyComponent: FC<Props> = ({ children, id, tabIndex, role, hidden = false }) => (
    <div id={id} tabIndex={tabIndex} role={role} hidden={hidden}>{children}</div>
)

export default MyComponent;
```

### types + prop-types

Cuando estamos desarrollando una librería usando TS, no debemos olvidar que puede ser consumida en un proyecto de JS, por lo que siempre es buena idea incluir la validación de tipos dinámica (en tiempo de ejecución) con prop-types.

Para evitar tener que hacer esto a mano podemos usar la utilidad `InferProps` de la propia librería *prop-types*. No obstante, debemos recordar que TS proporciona mucha más información en algunos casos (especialmente para funciones), por lo que siempre es buena idea combinarlo con nuestra propia declaración de tipos por medio de un *Intersection Type*:

```typescript
import React, { FC, SyntheticEvent, ButtonHTMLAttributes } from 'react';
import PropTypes, { InferProps } from 'prop-types';

const propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

export type Props = InferProps<typeof propTypes> & {
  onClick: (e: SyntheticEvent) => void,
  type: ButtonHTMLAttributes<HTMLButtonElement>['type']
};

const Button: FC<Props> = ({ children, onClick, type }) => (
  <button type={type} onClick={onClick}>
    {children}
  </button>
);

Button.defaultProps = {
  type: 'button',
};

export default Button;
```

Aquí, básicamente estamos infiriendo las props a partir del tipo de nuestras prop-types, pero lo extendemos:

- Mejoramos el tipado de *onClick*, para proveer del tipo del argumento (un `SyntheticEvent`) y del retorno
- Mejoramos el tipado para el atributo `type`, recogiéndolo de forma automática a partir de las propiedades que puede recibir un botón

Por otro lado, mi buen amigo [Iván Trujillo me recomendó un plugin de Babel](https://twitter.com/Ivanbtrujillo/status/1314280593807609857) que extrae los `prop-types` a partir de nuestro tipado.

## TypeScript + CSS

Sea cual sea la solución que elijamos para aplicar estilos a nuestra aplicación, podemos estar seguros de que tiene soporte de TS, bien de forma nativa, o bien a partir del repo de `@types`.

### Estilos en línea

Podemos usar el tipo `CSSProperties` que incorpora *React* para asegurarnos que las propiedades declaradas son válidas.

Si escribiésemos cualquier propiedad no reconocida por CSS, el compilador emitiría un error:

```typescript
import React, { FC, CSSProperties } from 'react';

const styles: CSSProperties = {
  backgroundColor: 'red',
  color: 'white',
  padding: '20px',
};

const MyComponent: FC = ({ children }) => <div style={styles}>{children}</div>;

export default MyComponent;
```

### Clases CSS

El caso de pasar el nombre de **una clase CSS** como propiedad es todavía más sencillo, puesto que no deja de ser un simple string:

```typescript
import React, { FC } from 'react';

type Props = {
  className: 'string'
};

const MyComponent: FC<Props> = ({ children, className }) => <div className={className}>{children}</div>;

export default MyComponent;
```

### CSS-in-JS

Pongámonos en el caso de que usamos una librería de *CSS-in-JS* como [emotion](https://emotion.sh/) con una solución para definir nuestros tokens de diseño en forma de tema, como [emotion theming](https://emotion.sh/docs/theming).

Una de las mayores ventajas que nos aporta aquí TS es la comprobación de tipos a la hora de acceder a nuestro tema desde los componentes, de tal forma que nos aseguremos que no accedemos a una propiedad inexistente.

Lo primero que deberíamos hacer es declarar nuestro tema, y exponerlo por contexto al resto de componentes por medio de un `ThemeProvider`:

```typescript
import React, { FC } from 'react';
import { ThemeProvider } from 'emotion-theming';

import theme from '../theme';

const AppStyles: FC = ({ children }) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);

export default AppStyles;
```

A continuación, generamos nuestra propia versión de la utilidad `styled`, para inyectarle el tipado de nuestro tema:


```typescript
import styled, { CreateStyled } from '@emotion/styled';

import theme from './theme';

export default styled as CreateStyled<typeof theme>;
```

A partir de este momento, cualquier componente declarado con nuestra versión de `styled` tendrá acceso a una propiedad "theme" de forma automática, que se corresponderá con el tema declarado anteriormente, y será capaz de avisarnos sobre las propiedades a las que estamos accediendo de forma incorrecta. Si además declaramos el tipo del tema con una `const assertion`, tendremos acceso en tiempo real al valor de la propiedad a la que accedemos.

```typescript
import React, { FC } from 'react';

import styled from '../../styled';

const SWrapper = styled.section`
  padding: 20px 40px;
  background-color: ${(props) => props.theme.colors.muted};
  max-width: 600px;
  margin: 40px auto;
  box-shadow: 0 5px 12px rgba(0,0,0,0.25);
  border-radius: 6px;
`;

const STitle = styled.h1`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes[6]}px;
  margin: 0 0 32px;
`;

const SImage = styled.img`
  display: block;
  width: 100%;
`;

type Props = {
  title: string,
  imageSrc: string
};

const Intro: FC<Props> = ({ title, imageSrc }) => (
  <SWrapper>
    <STitle>{title}</STitle>
    <SImage src={imageSrc} alt="" />
  </SWrapper>
);

export default Intro;
```
## React Hooks
### useState

En los casos más simples (cuando almacenamos en el estado datos del mismo tipo definido con el valor inicial) no necesitamos hacer ninguna declaración especial de nuestro hook:

```typescript
import { useState } from 'react';

const useCounter = () => {
  const [value, setValue] = useState(0);
  const increment = () => setValue(prevState => prevState + 1);
  const decrement = () => setValue(prevState => prevState + 1);
  return {
    value,
    increment,
    decrement,
  };
};

export default useCounter;
```

La cosa cambia cuando queremos almacenar estados algo más complejos, como el de un usuario, donde el valor depende de si está logueado o no:

En el primer caso, la propiedad "isLogged" tiene que ser `false`, y no puede existir ninguna propiedad adicional.

```typescript
type UnloggedUser = {
  isLogged: false
};
```

En el segundo caso, la propiedad "isLogged" tiene que ser `true`, y además tiene que tener una propiedad "email" que definimos como `string`.

```typescript
type LoggedUser = {
  isLogged: true,
  email: string,
}
```

Podríamos expresar el tipo de nuestro `User` usando un `Union Type` sobre los dos tipos definidos anteriormente:

```typescript
type User = UnloggedUser | LoggedUser;
```

...y ya solo nos faltaría usarlo como genérico para definir nuestro `useState`:

```typescript
const INITIAL_STATE = {
  isLogged: false,
} as const;

const useUser = () => {
  const [user, setUser] = useState<User>(INITIAL_STATE);

  const login = (email: string) => {
    setUser({
      isLogged: true,
      email,
    });
  };

  const logout = () => {
    setUser(INITIAL_STATE);
  };

  return {
    user,
    login,
    logout,
  };
};

export default useUser;
```

### useReducer

Otra forma de escribir el ejemplo anterior sería mediante el uso de reducers. En este caso, añadiríamos los tipos para los *action types*, así como para las propias acciones.

Posteriormente, tiparíamos el *reducer* usando el `State` y las `Actions` previamente definidas.

```typescript
import { useReducer } from 'react';

const INITIAL_STATE = {
  isLogged: false,
} as const;

type UnloggedState = typeof INITIAL_STATE;

type LoggedState = {
  isLogged: true,
  email: string,
}

type State = UnloggedState | LoggedState;

const ACTION_TYPES = {
  login: 'login',
  logout: 'logout',
} as const;

type ActionTypes = typeof ACTION_TYPES;

type LoginAction = {
  type: ActionTypes['login'],
  payload: string,
};

type LogoutAction = {
  type: ActionTypes['logout'],
};

type Action = LoginAction | LogoutAction;

const reducer = (state: State, action: Action) => {
  switch(action.type) {
    case ACTION_TYPES.login:
      return { isLogged: true, email: action.payload };
    case ACTION_TYPES.logout:
      return INITIAL_STATE;
    default:
      return state;
  }
}

const useUser = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const login = (email: string) => dispatch({
    type: ACTION_TYPES.login,
    payload: email,
  });

  const logout = () => dispatch({
    type: ACTION_TYPES.logout,
  });

  return {
    state,
    login,
    logout,
  }
};

export default useUser;
```

En el caso de que usásemos [Redux](https://react-redux.js.org/), el procedimiento sería el mismo, con la salvedad de que también podríamos exportar el tipo de los *reducers* combinados. Para ello, podemos hacer uso de la utilidad `ReturnType`, que como su propio nombre indica, recoge el tipo del valor devuelto por una función.

```typescript
import { combineReducers } from 'react-redux';

import chatReducer from './chat';
import userReducer from './user';

const rootReducer = combineReducers({
  chat: chatReducer,
  user: userReducer,
});

export type RootReducer = ReturnType<typeof rootReducer>;

export default rootReducer;
```

### useContext

Imaginemos ahora que queremos compatir el estado anterior con muchos componentes, pero sin tener que hacer el llamado *prop drilling*, es decir, pasar las propiedades de padre a hijo en distintos niveles.

Para ello podemos hacer uso del [API de contexto de React](https://es.reactjs.org/docs/context.html). Lo que haremos será reemplazar nuestro hook `useReducer` para que devuelva el contexto que almacena el valor devuelto por el hook que hacía uso del reducer, que ahora llamaremos `useUserState` para distinguirlo.

Lo primero que deberíamos hacer es crear el tipo para nuestro contexto. Como no conocemos su valor de antemano, simplemente le asignaremos un objeto vacío y forzaremos el tipo asignado por medio del operador `as`.

```typescript
import { createContext } from 'react';

import useUserState from './useUserState';

const UserContext = createContext({} as ReturnType<typeof useUserState>);

export default UserContext;
```

Ahora crearemos un `Provider`, cuya misión será ejercer de "host" para el hook que almacena el estado, y pasar el valor por contexto a todos sus descendientes:

```typescript
import React, { FC } from 'react';

import useUserState from './useUserState';
import UserContext from './UserContext';

const UserProvider: FC = ({ children }) => {
  const value = useUserState();
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
```

Por último, tan solo tendríamos que crear nuestro hook para facilitar la exportación del contexto del usuario:

```typescript
import { useContext } from 'react';

import UserContext from './UserContext';

const useUser = () => useContext(UserContext);

```