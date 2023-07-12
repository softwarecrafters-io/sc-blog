En los últimos años ha habido un auge en la comunidad referente al interés por el [codigo limpio](/javascript/clean-code-javascript), el tener unos buenos 
tests para nuestras aplicaciones y una preocupación por buscar la forma correcta o más viable de llevar a cabo estas tareas.

Lo cierto es que no existe una forma que podamos replicar de forma automática en cada proyecto y que nos de un resultado
de calidad por igual, por ejemplo: En un proyecto podemos tener una mayor cantidad de tests *e2e* y que esto nos aporte un 
mayor valor que en otros, ya que se carece de apenas lógica y la aplicación se basa en meras interacciones del usuario;
mientras que en otro caso, nos puede aportar mayor relevancia el tener unos tests unitarios
más granulares debido a la reutilización de componentes.

No te preocupes, lo importante no es decantarse por unos u otros, sino dejar que la propia aplicación defina cual es la 
mejor solución para si misma de forma iterativa. Para ello, [el desarrollo dirigido por test (Test Driven Development, TDD)](/javascript/tdd-test-driven-development) 
es la mejor herramienta que he adoptado en mi día a día y que me permite tener un buen balance en mis desarrollos.

Cabe destacar que en base a mi experiencia, [TypeScript](/typescript/typescript-tutorial-javascript-introduccion) es clave en el mantenimiento de los proyectos. Nunca sabemos que grado de 
conocimiento o nivel de rigurosidad en el desarrollo tendrá la persona que pueda acabar en el proyecto que empezamos, por lo que, el poder apoyarnos en los tipos para definir un esqueleto sólido para nuestros componentes y ser capaz de prevenir los errores más básicos sin tener que añadir pruebas para estos, es sin duda una gran herramienta que debemos tener en cuenta. A demás, al ser un lenguaje tipado la mayoría de editores/IDEs tienen soporte para aplicar refactors de forma automática.

## Pero... ¿En frontend?

Muchos desarrolladores (entre los cuales me incluía) piensan que hay dos posibles enfoques: Si quieres comprobar la 
interfaz de tu aplicación, utiliza tests e2e. Sin embargo, si lo que deseas es verificar que tu código cumple con lo
esperado, utiliza tests unitarios.

Este enfoque no es para nada negativo, pero nos limita mucho a la hora de definir una buena arquitectura. Como comentan 
desarrolladores como *Martin Fowler* o *Robert C. Martin*, un código que no puede ser probado, no es la mejor implementación
del mismo. Por otro lado, añadir una funcionalidad específica a nuestro código para que pueda ser comprobado, sin 
aportar nada de valor, tampoco es una buena opción. ¿Entonces?

Recordemos que el desarrollo dirigido por test tiene como finalidad definir una funcionalidad, mientras que los 
tests generados para ello serán un "daño colateral" (si preferimos llamarlo así) de decantarnos por esta metodología.

Sin ir más lejos, [React](/react/tutorial-react-js-introduccion) es una librería mediante la cual podremos realizar interfaces (tanto web, móviles como de escritorio)
y hacer que haga llamadas a nuestro código javascript para que este a su vez se desarrolle como se requiera: llamar a una API,
persistir en local storage, emitir una acción de callback... etc. Así pues, podemos aplicar esta metodología con total normalidad.

## ¿Cómo empezamos?

Para ponernos manos a la obra, lo primero es que tengamos claro qué funcionalidad vamos a desarrollar, o por lo menos,
cual es el flujo a seguir por el usuario, es decir: necesitamos tener claro cual va a ser el caso de uso que vamos a implementar.

Es muy importante que pensemos en ello desde el punto de vista de la persona que va a utilizar la aplicación, y no desde
el punto de vista del programador. Pensemos que es la capa más cercana al usuario, cuanto más cercana sea la definición de este a como interactuará el usuario final, tendrá un mayor nivel de abstracción y por tanto requerirá menos mantenimiento. Dicho de otra forma:
El código es susceptible de cambiar, la forma en la que el usuario interactúa con la aplicación no (ya que sería otra funcionalidad distinta). 
Si no queremos invertir tiempo en editar tests de algo que ya estaba funcionando, porque hemos cambiado nuestro código, lo mejor será, acercarnos lo más posible a lo que menos debería de cambiar.

Para este ejemplo buscaremos dos casos de uso lo suficientemente simples y que podamos representar de forma sencilla:
- El usuario visitará nuestra web y recibirá un catálogo de productos.
- El usuario seleccionará uno de los productos que tiene en pantalla y podrá añadirlo al carrito.

Daremos por sentado que hemos creado una aplicación `React` y que hemos configurado `jest` en el proyecto. Es independiente
si hemos utilizado `create-react-app`, `create-next-app`, si lo hemos creado a mano, o si hemos utilizado otra herramienta.

## e2e tests

En primer lugar definiremos los tests e2e. Estos nos permitirán simular de forma exacta como va a operar el usuario con 
la web. 

Existen muchas herramientas para simular esta interacción, sin embargo, las más utilizadas hoy en día son:
- Cypress
- Puppeteer
- Nightwatch 

En este caso utilizaremos `cypress` junto con `jest` para ello.

Nos dirigiremos a nuestra aplicación `React` (da igual si la hemos creado con CRA, Next o con otra solución a medida) e instalaremos la dependencia:

```
npm i -D cypress
```

Una vez instalado, debemos arrancar nuestra aplicación y ejecutar cypress para comprobar que todo funciona de forma correcta:

```
npx start
npx cypress open
```

> Puedes profundizar un poco más en esta área visitando la [documentación oficial](https://docs.cypress.io/guides/getting-started/installing-cypress.html).

Una vez hayamos ejecutado cypress por primera vez, podremos proceder a crear los tests, para ello crearemos un fichero 
`products-catalog.spec.js` en el directorio `cypress/integration`

Y definiremos el siguiente bloque:

```javascript
describe('Product Catalog', () => {

  it('shows the catalog', () => {
    cy.visit('/');
    cy.contains('.products > li');
  });
});
```

En este caso lo que haremos es navegar a la raíz de nuestra aplicación y verificar que somos capaces de encontrar un 
listado de productos.

Como handicap, pensemos... ¿Es el usuario capaz de visualizar el árbol DOM? La respuesta es **no**, por lo tanto el 
haber utilizado este tipo de enfoque, va a hacer nuestro test muy frágil. Si por cuestiones de diseño, cambiase el
nombre de la clase `css`, o peor aún, si no se utilizase un `li`, nuestro test se rompería y tendríamos que dedicar 
tiempo a arreglarlo.

Así pues, pensemos ¿Qué es lo que representa a un producto que indiscutiblemente va a ver el usuario?
A priori se me ocurre que el título. Así pues lo que podemos hacer es buscar por dicho campo.  

```javascript
describe('Product Catalogue', () => {

  it('shows the catalog', () => {
    const productTitles = ['Clean Code', 'Clean Architecture', 'Spider-man: Life Story', 'Mastering React']
    cy.visit('/');
    productTitles.map( title => {
      cy.contains(title);
    });
  });
});
```

Vale, es muy buena idea... salvo por otro pequeño detalle. ¿De donde vienen los datos? ¿Podemos garantizar que la fuente
de datos no va a cambiar? Por desgracia no. Así que tenemos dos opciones:

- Lanzar los tests e2e, levantando nuestra API con una base de datos específica para pruebas. Esto nos daría un mayor nivel de seguridad, pero tendríamos que invertir mucho tiempo en lo que a configuración se refiere.

- Interceptar la llamada `http` y sobrescribir la llamada con unos valores predefinidos, a los que comúnmente se les denomina
[`fixtures`](https://en.wikipedia.org/wiki/Test_fixture#Software).

Por suerte, este último método es más sencillo y ya `cypress` nos da herramientas para ello, pero vayamos por partes:

En primer lugar debemos crear un fichero `json` en el directorio `cypress/fixtures/catalog/products.json`:
```json
{
  "products": [
    { "title": "Clean Code", "price": 20 },
    { "title": "Clean Architecture", "price": 20 },
    { "title": "Spider-man: Life Story", "price": 20 },
    { "title": "Mastering React", "price": 20 }
  ]
}
```

A continuación en nuestro test, tendremos que definir el endpoint que vamos a consumir:
```javascript
const productsEndpoint = {
  method: 'GET',
  url: 'http://localhost:4000/products',
};
```

Luego definiremos que para cada test, debe de iniciar un servidor de escucha:
```javascript
beforeEach(() => {
  cy.server();
});
```


Y por último tendremos que interceptar la petición:

```javascript
cy.route({...productsEndpoint, response: 'fixture:catalog/products', status: 200 });
```

Por lo tanto, el resultado de nuestro test sería el siguiente:

```javascript
import { products } from '../fixtures/catalog/products.json'

describe('Product Catalogue', () => {

  const productsEndpoint = {
    method: 'GET',
    url: 'http://localhost:4000/products',
  };

  beforeEach(() => {
    cy.server();
  });

  it('shows the catalog', () => {
    cy.route({...productsEndpoint, response: 'fixture:catalog/products', status: 200 });

    cy.visit('/');
    products.map( ({title}) => {
      cy.contains(title);
    })
  });
})
```

> Estos tests, se pasarán en rojo (red) la mayor parte del tiempo, hasta que completemos el desarrollo en su totalidad,
así que si te es más cómodo, puedes marcarlos como `skipped` y lanzarlos cada cierto tiempo.

[Github code](https://github.com/adrian-afergon/software-crafters-tdd-react/blob/feature/e2e-tests/e2e/cypress/integration/index.spec.js)

Ahora que ya tenemos nuestro primer test **e2e**, podremos comenzar a implementar nuestra aplicación.

## Unit tests

Ahora bien, una vez hemos definido cual es el caso de uso y cual es la funcionalidad que queremos realizar, pasemos a 
los tests unitarios. En este caso puede haber cierta colisión de intereses, ya que a priori nuestro caso de uso puede 
parecer el mismo, pero su finalidad es completamente distinta:

Mientras que el test e2e nos permite identificar cuando se cumplen las expectativas del cliente; el test unitario nos va
a ayudar a definir una arquitectura que se va a caracterizar por ser modular.

### Instalación
En el siguiente ejemplo vamos a hacer uso de `testing-library/react` para montar nuestros componentes y de 
`testing-library/jest-dom` para conseguir unas aserciones más humanas.

Para ello ejecutaremos el siguiente comando:

```
npm i --save-dev test-library/jest-dom testing-library/react
```

Una vez se haya completado la instalación podemos proceder a crear nuestro primer test `Home.spec.js`

> Personalmente, al tratarse de test unitarios suelo preferir crearlos en el mismo directorio en el que voy a crear el 
componente

### Primer test - Visualizar datos

El test deberá tener la siguente estructura:
```ts
import * as React from 'react';

describe('Home Container', () => {
  it('shows a list of products', () => {
    // ... no code yet
    expect(foundProducts.length).toBe(products.length)
  });
});
```

Pero... un segundo, ¿hemos definido un `expect`? ¿Y la definición de variables? Es aquí donde empieza a surgir la magia.

Empezando por este punto entendemos que, el número de productos encontrados debe ser igual a uno previamente definido 
en el test y que de alguna forma tendremos que pasárselo al componente, pero ¿cómo? Es a partir de este punto donde 
empezamos a definir arquitectura.

Debemos ser prácticos, no vale buscar soluciones complicadas, debemos dar solvencia al test en el menor tiempo posible. 
Una vez demos con la solución e implementemos la funcionalidad podremos valorar si realmente puede interesar el complicar 
la solución, entendiendo por complicar el hacer nuestra solución genérica a varios casos, en lugar de específica a este caso en concreto.

Para poder recuperar el listado de productos a nuestro componente, que serán devueltos por la API, lo que podemos hacer 
es pasarle a través de propiedades el método encargado de recuperar dicha información. A esto se le conoce como *inyección
de dependencias*. 

Por lo tanto, crearemos un objeto *mock*, el cual devuelva una promesa con nuestros datos:

```ts
  it('shows a list of products', () => {
    // Define a data source
    const products: Product[] = [buildProduct({}), buildProduct({})];
    const productsRepository = {
      getProducts: jest.fn(() => Promise.resolve(products))
    };
    const view = render(<Home productsRepository={productsRepository}/>);
    // ... no code yet
    expect(foundProducts.length).toBe(products.length);
  });
```

Como podrás observar, hacemos uso de un `buildProduct` para definir nuestros valores y no añadir información irrelevante al test (Puedes leer más a cerca del patrón builder [aquí](https://medium.com/lean-mind/make-more-human-readeable-test-14d4230898c)). 
Así pues ya solo nos quedaría buscar a nivel visual la representación de dichos datos. Una de las ventajas de `testing-library`
es que nos da unos selectores muy cercanos a la capa de usuario, por lo que como ya comentamos anteriormente, dará una 
mayor longevidad a nuestros tests:

```ts
  it('shows a list of products', async () => {
    // Define a data source
    const products: Product[] = [
      buildProduct({handle: 'handle-1', title:'title 1'}),
      buildProduct({handle: 'handle-2', title:'title 2'})
    ];
    const productsRepository = {
      getProducts: jest.fn(() => Promise.resolve(products))
    };
    const view = render(<Home productsRepository={productsRepository}/>);
    // Search in async way all the product titles at the screen
    const foundProducts = await Promise.all(products.map((product) => view.findByText(product.title)));
    expect(foundProducts.length).toBe(products.length);
  });
```

Quizás en este proceso te hayan surgido dudas, o incluso durante la definición de entidades, como por ejemplo 
¿qué ocurriría si en lugar de una promesa resuelta, nos devolviese una promesa rechazada? ¿Y si me devuelve un listado vacío?
El pararnos a pensar en definir un caso de uso, nos ayuda a prestar mayor atención a nuestro código y dar con casos límite
más comunes de lo que esperarías. 

Recordemos que hacer varias implementaciones al mismo tiempo, no es la mejor de las ideas; Así pues, a medida que vamos
definiendo un test, podemos anotar el resto de casos para contemplarlos a posteriori.

```ts
  // what happen when request fails?
  // what happen when list is empty?  

  it('shows a list of products', async () => {
    // irrelevant for now
  });
```
Ahora bien, dado el test, ya hemos asumido ciertas cosas, como que nuestro componente va a recibir un objeto con un método
que recuperará los productos y que por tanto, tendremos que iterar por ellos para visualizarlos. Por el momento, es obligatorio
ejecutar el test y verificar que falla (red). Hecho esto, podemos generar el código del componente en el propio fichero de test: 

```ts
interface HomeProps {
  productsRepository: ProductsRepository;
}

export const Home: React.FC<HomeProps> = ({ productsRepository }) => {
  const [products, setProducts] = React.useState<Product[]>([]);
  React.useEffect(() => {
    productsRepository.getProducts().then(setProducts);
  }, []);
  return (
    <section>
      {products.map(product => <article key={product.handle}>{product.title}</article>)}
    </section>
  );
};
```

Al ejecutar nuevamente el test, vemos como ahora funciona correctamente (green), por lo que es el momento de **hacer commit**
y plantearnos si aplica algún refactor. En este caso, es el momento de mover nuestro componente al fichero `Home.jsx`.

A este proceso se le conoce como **RGR, Red - Green - Refactor**. Solo vamos a modificar código cuando 
nos encontremos en **Green**. Plantear nuevos casos, o refactorizar código en **Red** solo nos llevará a aumentar la 
complegidad de la aplicación e incurrir en errores.

[Github code](https://github.com/adrian-afergon/software-crafters-tdd-react/blob/feature/shown-products/src/components/Home/Home.spec.tsx)

### Casos límite - Lista vacía

Prosigamos con los otros dos casos. ¿Qué ocurre cuando nuestro listado de productos está vacío? A priori lo más sensato es
darle feedback al usuario de que la lista está vacía:

```ts
  // what happen when request fails?
  // what happen when list is empty?  

  it('shows a list of products', async () => {
    // completed
  });

  it('shows a message when list is empty', () => {
    // Not implemented yet
    expect(view.queryByText(emptyMessage)).toBeInTheDocument();
  });
```

Siguiendo el proceso anterior, podemos darnos cuenta que el mensaje va a ser algo compartido entre el componente y el test,
pero recordemos, ahora no es momento de hacer estos cambios, estamos en **red**.

En esta ocasión cambiaremos el valor que nos devuelve nuestro `productsRepository` por un listado vacío, y definiremos una variable`emptyMessage`:

```ts
  it('shows a message when list is empty', async () => {
    // Define a data source
    const products: Product[] = [];
    const productsRepository = {
      getProducts: jest.fn(() => Promise.resolve(products))
    };
    const emptyMessage = 'No products were found';
    const view = render(<Home productsRepository={productsRepository}/>);

    expect(await view.findByText(emptyMessage)).toBeInTheDocument();
  });
```

Lanzamos nuestro test y vemos que efectivamente falla. Actualicemos el componente:

```ts
interface HomeProps {
  productsRepository: ProductsRepository;
}

export const Home: React.FC<HomeProps> = ({ productsRepository }) => {
  const [products, setProducts] = React.useState<Product[]>([]);
  React.useEffect(() => {
    productsRepository.getProducts().then(setProducts);
  }, []);
  return (
    <section>
      { products && products.length > 0
        ? products.map(product => <article key={product.handle}>{product.title}</article>)
        : <p>No products were found</p>
      }
    </section>
  );
};
```

Estamos en **Green** ahora, podríamos aplicar varios refactors como podría ser:
- Exponer una constante desde el componente con el mensaje de *"No products were found"*.
- Refactorizar nuestro test para mover la definición del servicio a un `builder` y que el test sea más legible.
- Mejorar la legibilidad de la condición para mostrar el mensaje

Estos cambios quedarían de la siguiente forma:

```ts
  // what happen when request fails?

  const buildProductRepository = (products: Product[]): ProductsRepository => ({
    getProducts: jest.fn(() => Promise.resolve(products))
  });

  it('shows a list of products', async () => {
    // Define a data source
    const products: Product[] = [
      buildProduct({handle: 'handle-1', title:'title 1'}),
      buildProduct({handle: 'handle-2', title:'title 2'})
    ];
    const productsRepository: ProductsRepository = buildProductRepository(products);
    const view = render(<Home productsRepository={productsRepository}/>);
    // Search in async way all the product titles at the screen
    const foundProducts = await Promise.all(products.map((product) => view.findByText(product.title)));
    expect(foundProducts.length).toBe(products.length);
  });

  it('shows a message when list is empty', async () => {
    // Define a data source
    const products: Product[] = [];
    const productsRepository: ProductsRepository = buildProductRepository(products);
    const view = render(<Home productsRepository={productsRepository}/>);

    expect(await view.findByText(HomeText.emptyMessage)).toBeInTheDocument();
  });

```

Y nuestro componente:

```ts
export enum HomeText {
  emptyMessage = 'No products were found'
}

interface HomeProps {
  productsRepository: ProductsRepository;
}

export const Home: React.FC<HomeProps> = ({ productsRepository }) => {
  const [products, setProducts] = React.useState<Product[]>([]);
  React.useEffect(() => {
    productsRepository.getProducts().then(setProducts);
  }, []);

  const hasProducts = () => products && products.length > 0;

  return (
    <section>
      { hasProducts()
        ? products.map(product => <article key={product.handle}>{product.title}</article>)
        : <p>{HomeText.emptyMessage}</p>
      }
    </section>
  );
};
```

[Github code](https://github.com/adrian-afergon/software-crafters-tdd-react/blob/feature/empty-list/src/components/Home/Home.spec.tsx)

### Casos límite - Excepciones

Para finalizar, vamos a manejar el caso de error. Lo más cómodo sería que cambiásemos nuestro `Promise.resolve`, por un 
`Promise.rejected`, sin embargo, si hacemos este cambio en el builder, romperemos los tests anteriores. Esto nos da a
entender que hemos tomado la decisión de aplicar un refactor a nuestro código, sin tener la información suficiente para hacerlo.

Sin embargo, aprovecharemos la situación para dar con la mejor forma de solucionar este caso, eso si, primero el test en cuestión:
```ts
  it('shows a error when products can not be retrieved', async () => {
    // Define a data source
    const error = new Error('irrelevant error');
    const productsRepository: ProductsRepository = {
      getProducts: jest.fn(() => Promise.reject(error))
    };
    const view = render(<Home productsRepository={productsRepository}/>);

    expect(await view.findByText(error.message)).toBeInTheDocument();
  });
```

Ahora, vemos fallar el test y pasamos a actualizar nuestro componente con la nueva funcionalidad:

```ts
const Home = ({ productsRepository }) => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [error, setError] = React.useState<Error|null>(null);
  React.useEffect(() => {
    productsRepository.getProducts()
      .then(setProducts)
      .catch(setError);
  }, []);
  return (
    <section>
      { error && <p>{error.message}</p> }
      { hasProducts()
        ? products.map(product => <article key={product.handle}>{product.title}</article>)
        : <p>{HomeText.emptyMessage}</p>
      }
    </section>
  );
};
```

Estupendo, ahora todo funciona correctamente, es el momento de refactorizar nuestro `builder` sin romper nuestros tests.
La forma más fácil para ello es cambiar el parámetro de entrada por el siguiente:

```ts
  const buildProductRepository = (promise: Promise<Product[]>) => ({
    getProducts: jest.fn(() => promise)
  });
```

Y por tanto en la definición de los `productsRepository` de cada test:

```ts
  it('shows a list of products', async () => {
    const products: Product[] = [
      buildProduct({handle: 'handle-1', title:'title 1'}),
      buildProduct({handle: 'handle-2', title:'title 2'})
    ];
    const productsRepository: ProductsRepository = buildProductRepository(Promise.resolve(products));
    // ...
  });

  it('shows a message when list is empty', () => {
    const products: Product[] = [];
    const productsRepository: ProductsRepository = buildProductRepository(Promise.resolve(products));
    // ...
  });

  it('shows a error when products can not be retrieved', () => {
    const error = new Error('irrelevant error');
    const productsRepository: ProductsRepository = buildProductRepository(Promise.reject(error));
    // ...
  });
```

Ahora bien, este último paso nos ha permitido cerrar el ciclo del componente y poder pasar a otros componentes.
Estos componentes, no tienen por qué contener ningún test si se tratan de componentes meramente representacionales y
carentes de lógica, tengamos presente que las propias funcionalidades de `React` ya están verificadas por su equipo, y
que nosotros solo nos debemos preocupar de nuestra lógica.

A demás, el haber empezado por el componente más alto en el árbol DOM, nos permite que estos componentes que envuelve se
verifique su visualización desde nuestro test principal.

[Github Code](https://github.com/adrian-afergon/software-crafters-tdd-react/blob/feature/handle-exceptions/src/components/Home/Home.spec.tsx)

## Cambios de arquitectura

Para no extendernos demasiado, vamos a dar por sentado que hemos definido el componente `ProductCard`:
```ts
interface ProductCardProps {
  product: Product;
  onClick?: (handle: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick}) => (
  <div>
    <h3>{product.title}</h3>
    <p>
      Price:
      <span>{product.price}</span>
    </p>
    {
      onClick &&
      <button type="button" onClick={() => { onClick(product.handle); }}>Add to cart</button>
    }
  </div>
);
```

Con el siguiente test:

```ts
  it('calls with product identifier when is clicked', () => {
    const product = buildProduct({ handle: 'irrelevant-handle' });
    const clickMock = jest.fn();
    const view = render(<ProductCard product={product} onClick={clickMock} />);

    const button = view.getByRole('button');
    fireEvent.click(button);
    expect(clickMock).toHaveBeenCalledWith(product.handle);
  });
```
Y que por tanto este componente se utiliza en nuestro `Home`:

```ts
export const Home: React.FC<HomeProps> = ({ productsRepository }) => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [error, setError] = React.useState<Error|null>(null);
  React.useEffect(() => {
    productsRepository.getProducts()
      .then(setProducts)
      .catch(setError);
  }, []);

  const hasProducts = () => products && products.length > 0;

  return (
    <section>
      { error && <p>{error.message}</p> }
      { hasProducts()
        ? products.map(product =>
          <article key={product.handle}>
            <ProductCard product={product} />
          </article>)
        : <p>{HomeText.emptyMessage}</p>
      }
    </section>
  );
};
```

Ahora bien, somos conscientes de que nuestro `ProductCard` tiene un evento de click asociado, y que al ser usado desde `Home`,
este debe añadirlo al carrito. Este carrito no tiene nada que ver con la forma en la que recuperamos nuestros productos, sino que es otra nueva entidad que entra en juego.

Para ser consistentes, hemos hecho el test correspondiente para verificar que el comportamiento se cumple:

```ts
  it('add item to cart', async () => {
    const firstProduct: Product = buildProduct({handle: 'first-product'});
    const secondProduct: Product = buildProduct({handle: 'second-product'});
    const productsRepository = buildProductRepository(Promise.resolve([firstProduct, secondProduct]));
    const cartRepository = {
      addItem: jest.fn(),
    };

    const view = render(<Home productsRepository={productsRepository} cartRepository={cartRepository} />);

    const [, item] = await view.findAllByRole('button');
    fireEvent.click(item);

    expect(cartRepository.addItem).toHaveBeenCalledWith(secondProduct.handle);
  });
```

Y tras ver que falla, hemos actualizado el componente:

```ts
export const Home: React.FC<HomeProps> = ({ productsRepository, cartRepository }) => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [error, setError] = React.useState<Error|null>(null);
  React.useEffect(() => {
    productsRepository.getProducts()
      .then(setProducts)
      .catch(setError);
  }, []);

  const hasProducts = () => products && products.length > 0;

  return (
    <section>
      { error && <p>{error.message}</p> }
      { hasProducts()
        ? products.map(product =>
          <article key={product.handle}>
            <ProductCard
              product={product}
              onClick={cartRepository.addItem}
            />
          </article>)
        : <p>{HomeText.emptyMessage}</p>
      }
    </section>
  );
};
```

Ahora bien, tenemos nuestras dependencias y aparentemente nuestros componentes funcionan, pero tendremos que utilizar unos `repository` reales.
Para ello simplemente crearemos dichas entidades que serán las encargadas de hacer el fetch a la API real, y definiremos esas constantes como valor por defecto a el componente:

```typescript
export const cartRepository: CartRepository = {
  addItem: (handle) => fetch('http://localhost:4000/cart', {
      method: 'PUT',
      body: JSON.stringify({ handle })
  }).then(response => response.json())
};

export const productsRepository: ProductRepository = {
  getProducts: () => 
    fetch('http://localhost:4000/products')
      .then(response => response.json())
      .then(data => data.products)
}
```

Y el componente:

```ts
import { productsRepository as productsRepositoryInstance, ProductsRepository } from '../../repositories/ProductsRepository';
import { cartRepository as cartRepositoryInstance, CartRepository } from '../../repositories/CartRepository';

interface HomeProps {
  productsRepository?: ProductsRepository;
  cartRepository?: CartRepository;
}

export const Home: React.FC<HomeProps> = ({
  productsRepository = productsRepositoryInstance,
  cartRepository = cartRepositoryInstance,
}) => {
  // ...
}
```

Ahora bien, ¿por qué no hemos hecho test de nuestros objetos? Realmente no es necesario, ya que únicamente actúan de proxy a la librería de fetch.
Sin embargo, en caso de que tuviéramos lógica propia, como pudiese ser la transformación de la respuesta a una estructura propia, si podría ser de interés llevar a cabo dicha validación.

[Github Code](https://github.com/adrian-afergon/software-crafters-tdd-react/tree/feature/change-architecture/src)

### Nota final

Te habrás dado cuenta que los test e2e no pasan, ya que no es capaz de interceptar la petición http. Esto se debe a que `cypress` solo es capaz de interceptar peticiones `xhr`, y el `fetch` que estamos utilizando en nuestros `repository` no utiliza este tipo de solicitud. Cypress comenzará a dar soporte a partir de la versión `4.9.0`.

Para que funcione correctamente tendremos que aplicar el siguiente `workaround`: 

```ts
/e2e/cypress/support/index.js

import './commands';

let polyfill;

before(() => {
  const polyfillUrl = 'https://unpkg.com/whatwg-fetch@3.0.0/dist/fetch.umd.js';
  cy.request(polyfillUrl).then(response => {
    polyfill = response.body;
  });
});

Cypress.on('window:before:load', win => {
  delete win.fetch;
  win.eval(polyfill);
});
```

O como otra opción, podemos cambiar nuestros `repository` para que utilicen `xhr` y **demostrar que nuestra arquitectura 
se encuentra totalmente desacoplada** entre la vista y el acceso a datos.

[Github Code](https://github.com/adrian-afergon/software-crafters-tdd-react/blob/feature/e2e-workaround/e2e/cypress/support/index.js)

## Conclusión

Como hemos visto, los tests nos ayudan a tomar decisiones sobre nuestro código, a descubrir casos de uso que no nos hayamos planteado inicialmente y por supuesto a verificar de forma automática que nuestro código funciona.

Sin embargo, esto no quiere decir que tengamos que ir a un extremo de que cada línea de código debe ser comprobada, principalmente porque en muchos casos carecerá de sentido o porque esto llevará un tiempo adicional para aprender como comprobar cada cosa en la forma correcta, frente a lo que nos aporta esa comprobación.

Usar TDD como herramienta de desarrollo te abre un mundo de posibilidades como desarrollador, aprenderás como funcionan las tecnologías, entenderás el por qué muchas tecnologías funcionan de una determinada forma, a demás que te permitirá aprender a tomar decisiones técnicas y crecer profesionalmente.

Espero que este artículo te sirva de ayuda y te incentive a comenzar a dar tus primeros pasos en esta metodología de desarrollo.
Puedes visitar el repositorio público en [github](https://github.com/adrian-afergon/software-crafters-tdd-react) para ver el resultado final. 

Ante cualquier duda, o simplemente por el placer de debatir sobre este tema, puedes contactar conmigo a través de my 
twitter [@AdrianFerrera91](https://twitter.com/AdrianFerrera91), o a través de mi [página web](https://adrianferrera.com/) donde también podrás encontrar otros muchos artículos referentes al tema.