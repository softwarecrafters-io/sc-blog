Existen multiples definiciones para el término **arquitectura** dependiendo del contexto en el que se trate y de la vertiente del desarrollo de la que se provenga, por lo que es muy complicado llegar a un consenso y a una definición única que sea válida para todos los casos. Así pues, ciñéndonos al desarrollo de software en *frontend*, bajo un punto de vista personal la definición es la siguiente:

> Los desarrolladores llamamos **arquitectura** al conjunto de patrones de desarrollo que permiten definir unas pautas a seguir en nuestro software en cuanto a límites y restricciones.
Es la guía que debemos seguir con la finalidad de ordenar nuestro código y hacer que las distintas partes de la aplicación se comuniquen entre sí. 

Existe una gran cantidad de opciones a la hora de decantarnos por una arquitectura u otra. 
Cada una de ellas tendrá sus propias ventajas e inconvenientes. Incluso una vez escojamos cuál es la mejor que se adapta a nuestro caso, no tiene por qué implementarse de igual forma en los distintos proyectos.

Sin embargo, aunque el abanico de patrones es casi infinito, la gran mayoría mantienen atributos de calidad comunes, tales como: escalabilidad, responsabilidad única, desacoplamiento, mantenibilidad, etc.; por lo que, de manera general, es de vital importancia entender los conceptos y por qué se ha adoptado dicha solución, más que la teoría en sí.

Uno de los patrones de diseño de arquitectura de *software* más utilizados es el de la **Arquitectura Hexagonal** (*Hexagonal Architecture*), también conocida como arquitectura de **Puertos y Adaptadores** (*Ports and Adapters*), dada a conocer por *[Alistair Cockburn](https://en.wikipedia.org/wiki/Alistair_Cockburn)*.

La finalidad principal de este patrón es dividir nuestra aplicación en distintas capas, permitiendo su evolución de manera aislada y responsabilizando a cada entidad de una funcionalidad única.

## ¿Por qué se le llama hexagonal?

La idea de representar esta arquitectura con un hexágono es debido a la facilidad que presenta el asociar el concepto teórico con el concepto visual, puesto que dentro de dicho hexágono es donde se encuentra nuestro código base, llamado **dominio**, y cada uno de sus laterales es una interacción hacia un servicio externo, por ejemplo: servicios *http* de terceros, bases de datos, servicio de mensajería o renderización.

![hexagon](https://gist.githubusercontent.com/adrian-afergon/52d0f1cc95d7dcf3bcf33b98a4c688dd/raw/b20666a3be59156ab2fc26ee7b3c7816cf125b6c/hexagon.png)

La comunicación del **dominio** con el resto de actores se realiza en una capa denominada **infraestructura**, donde se encuentra la implementación específica para cada una de estas tecnologías.

![hexagon - infrastructure](https://gist.githubusercontent.com/adrian-afergon/52d0f1cc95d7dcf3bcf33b98a4c688dd/raw/b20666a3be59156ab2fc26ee7b3c7816cf125b6c/infrastructure.png)

Una de las preguntas más frecuentes entre los profesionales que ven por primera vez esta arquitectura, es: *"¿a qué se debe la figura hexagonal?"* El uso del hexágono no es más que una mera representación teórica. El número de servicios con los que podemos integrarnos es infinito y pueden ser tantos como necesitemos. En el lado opuesto tenemos el caso más simple donde sólo hay dos interacciones con el dominio de la aplicación y, obviamente, esta situación no puede representarse con una figura poligonal.

## Mismo concepto distintos nombres

Como hemos comentado previamente, este patrón recibe también el nombre de **puertos y adaptadores** (*Ports and Adapters*). Este nombre viene de una separación dentro de la capa de infraestructura, donde tendremos dos subcapas:

- **Puerto**: Es la interfaz que deberán implementar las distintas variantes de nuestro código para abstraerse de la tecnología. En ella se ha de definir la firma de los métodos que existirán.
- **Adaptador**: Es la implementación de la interfaz, en ella se generará el código específico para consumir una tecnología en concreto. Esta nunca se usará de forma directa en la aplicación, más allá de la declaración, ya que su uso se realizará a través del tipo del **puerto**. 

Así pues, nuestro dominio realizará llamadas a la subcapa que se corresponde con el **puerto**, quedando desacoplado de la tecnología, mientras que éste, a su vez, consumirá el **adaptador**.

De esta manera, en caso de realizar un cambio tecnológico, sólo se verá afectada la capa externa (adaptador).

Dado que el concepto de **puertos y adaptadores** está muy ligado a la programación orientada a objetos y por lo tanto al uso de interfaces, es probable que la implementación de este patrón en lenguajes de programación funcional difiera ligeramente del concepto inicial.

De hecho han surgido múltiples patrones que *"iteran"* sobre éste, como la *Arquitectura Cebolla* (*Onion Architecture*) o la *Arquitectura Limpia* (*Clean Architecture*). Sin embargo, la premisa es la misma para todas ellas: dividir nuestra aplicación en capas, separando el **dominio** de la **infraestructura**.

## ¿Cómo afecta en la mantenibilidad?

El hecho de tener nuestro código dividido en capas, donde cada una de ellas tienen una responsabilidad única, ayuda a que evolucione de forma distinta, sin repercusión en las demás.

Por otra parte, con esta segmentación también conseguimos una mayor cohesión, donde cada capa tendrá una responsabilidad bien definida y única dentro del contexto de nuestro software. 

Finalmente, debemos tener en cuenta que no todas las personas que se incorporan por primera vez a un equipo conocen estos términos o están familiarizadas con dichos conceptos, por lo que es responsabilidad de los equipos ser lo suficientemente genéricos y definir una estructura lo suficientemente robusta para que la carencia de dichos conocimientos no suponga una carga adicional al desarrollo.

## ¿Cómo afecta en el frontend?

En la actualidad hay una serie de carencias respecto al uso de metodologías a la hora de crear aplicaciones. La facilidad y la velocidad proporcionadas por las actuales herramientas han hecho que dejemos a un lado el trabajo de análisis e implementación de arquitecturas conocidas y sobradamente contrastadas.

No obstante, aunque estas arquitecturas puedan parecer más propias de otros tiempos donde los lenguajes de programación no evolucionaban a un ritmo tan vertiginoso como hoy en día, dichas arquitecturas han sido planteadas, y en algunos casos adaptadas, para que sigan proporcionando la escalabilidad necesaria para las aplicaciones actuales.

### Marco histórico

Hace aproximadamente dos décadas las aplicaciones de escritorio eran la herramienta principal en cuanto a software. En ellas, el grueso del código de la aplicación se encontraba instalado en librerías, dentro de la propia máquina, y el nivel de acoplamiento era elevado entre la vista y comportamiento de la misma.

Con la finalidad de continuar escalando las aplicaciones y llegar a un software con mayor mantenibilidad y unas base de datos centralizadas (no en un entorno local), muchas de estas operaciones se llevaron al servidor. Esto ocasionó que las aplicaciones de escritorio quedasen relegadas a meras interacciones de usuario que no requerían de acceso, persistencia o datos remotos. De necesitarlo, las aplicaciones tendrían la responsabilidad de hacer estas llamadas a través de la red a los servicios desplegados en servidores externos. Es aquí donde empezamos a ver la primera distinción entre *frontend* y *backend*.

En los siguientes años surgió el *boom* de la web. Muchas de las aplicaciones de escritorio saltaron al marco del navegador, donde las limitaciones tecnológicas eran notorias y la publicación del `html` bien era estática o tenía que generarse de forma dinámica en el servidor. Sin embargo, con el paso del tiempo `JavaScript` comenzó a dotar de mayores posibilidades a los navegadores.  

### Actualidad

La parte visual siempre se había limitado a la representación de datos y nunca había necesitado mayor funcionalidad hasta hoy. Con las necesidades actuales, las aplicaciones **frontend** tienen mayores requisitos que los existentes hace años, por ejemplo: gestionan el estado de la aplicación, seguridad, asincronía, animaciones basadas en interacciones, integraciones con servicios de terceros, etc.

Es por este crecimiento que nos vemos en la necesidad de comenzar a aplicar patrones en estas aplicaciones, que se han desvinculado en su totalidad del contexto inicial.

### Consecuencia

Como bien hemos dicho, la finalidad del *frontend* es en su mayoría visualizar datos. A pesar de esta percepción, **no es** el **dominio** de nuestra aplicación, sino que pertenece a las capas exteriores de la arquitectura implementada.

Los casos de uso de la aplicación si pertenecen al **dominio** y no son relativos a cómo se deben visualizar. Por ejemplo: *"Dentro de una cesta de la compra que no podemos añadir más de 5 productos de un mismo tipo."*

La petición de datos al *backend* pertenece a la capa de **infraestructura**, ya que es algo que escapa de la responsabilidad de nuestra aplicación, aunque seamos nosotros quienes gestionemos el backend (esta es otra aplicación y por lo tanto las necesidades de arquitectura serán independientes). Por ejemplo el esquema de datos en el **backend** puede cambiar en cualquier momento y no queremos propagar esos cambios por toda nuestra aplicación **frontend**.

Por otro lado, la gestión de los datos de la sesión (*local*, *session*, *cookies*) es otro ejemplo de código que pertenece a la capa de **infraestructura**, porque si bien tenemos que lidiar con ella, no pertenece al **dominio** de nuestra aplicación.

## Y con las librerías de frontend ¿qué sucede?

En la actualidad existe una cantidad ingente de librerías para renderización: *Angular*, *React*, *Vue*, *Stencil*, *Polymer*, *Svelte*, *Ember*, etc.; pero debemos comprender cuál es su finalidad, y que por tanto, **NO DEBEN** entrar en el **dominio** de nuestra aplicación sino que deben ser relegadas a la **infraestructura**.

Todas estas herramientas tienden a evolucionar rápidamente en el tiempo y por lo tanto debemos hacer que nuestra aplicación sea lo más resiliente posible. ¿Cómo podemos hacer esto? Una de las estrategias más usuales pero a la vez menos conocidas es la de envolver dichas librerías en funcionalidades creadas expresamente para tal fin. A esta estrategia se la conoce comúnmente como *wrapping* y su objetivo principal es aislar a nuestro código de los efectos secundarios que las librerías de terceros podrían tener.

El *wrapping*  es una buena práctica pero cuando la utilicemos deberá ser consumida a través de un **adaptador**, como ya hemos dicho previamente, con la finalidad de reducir el acoplamiento. No obstante &mdash; y esto es una opinión personal &mdash; el hecho de envolver estas herramientas mencionadas en una implementación nos hará incurrir en una sobre-ingeniería que nos acarreará un mayor mantenimiento y una penalización de tiempo que, en la mayoría de los casos, el equipo no podrá afrontar, por lo que debemos valorar cuándo aplicar esta técnica de forma eficiente.

Como argumento al por qué no envolver este tipo de librerías, podemos afirmar que la comunicación entre la vista (**infraestructura**) y el **dominio** es unidireccional, es decir, son un punto de entrada a nuestra aplicación para el usuario, pero nunca serán consumidos por el **dominio**.

Una vez comprendido esto, tenemos que asumir que las herramientas que se acoplan de forma extrema a estas librerías de *frontend*, por ejemplo *Redux*, deben ser gestionadas de forma conjunta a nivel de **infraestructura**.

## Ejemplo

A continuación veremos un caso de uso donde intentaremos plasmar todos estos conceptos sobre una cesta de la compra.
Primero desglosaremos las entidades que entran en juego, las cuales tendremos que recuperar de un servicio de terceros vía *http*:
- Producto 
- Cesta

Por otro lado estas entidades deberán mostrarse al usuario, de manera que pueda interactuar con ellas, por ejemplo: ver los productos y añadirlos a la cesta.

Finalmente añadiremos reglas de negocio, como por ejemplo, evitar añadir dos veces el mismo elemento a la cesta.

### Directorios

En el siguiente [repositorio](https://github.com/adrian-afergon/hexagonal-arch-example/tree/step-0/start) podemos encontrar un ejemplo de cómo organizar los directorios, tanto para una aplicación `React`, como para una hecha en `Vue`:

![folders](https://gist.githubusercontent.com/adrian-afergon/52d0f1cc95d7dcf3bcf33b98a4c688dd/raw/b20666a3be59156ab2fc26ee7b3c7816cf125b6c/folders.png)

En ambos casos hemos creado dos directorios: `infrastructure` y `domain` y hemos movido los componentes visuales dentro del primero.

### Dominio

A continuación definiremos los *modelos de dominio* `Product` y `Basket` que utilizará nuestra aplicación. Este paso es exactamente el mismo para las dos aplicaciones:

```typescript
// /src/domain/models/Product.ts
export type ProductId = string

export type Product = {
  id: ProductId
  title: string
  price: number
}
```

```typescript
// /src/domain/models/Basket.ts
import { Product } from './Product'

export type BasketId = string

export type Basket = {
  id: BasketId
  items: Product[]
}
```

Ahora definiremos una funcionalidad que permita añadir un `Product` a un `Basket`, teniendo en cuenta que el mismo producto no puede estar repetido en la cesta.

Dependiendo del patrón de diseño por el que nos decantemos, la implementación de esta funcionalidad será distinta. Para este caso optaremos por el más sencillo, un modulo, `service` que maneja los datos:

```typescript
// /src/domain/services/Basket.service.ts
import * as uuid from 'uuid'
import { Product } from '../models/Product'
import { Basket } from '../models/Basket'

const hasProduct = (basket: Basket, product: Product) => 
  basket.items.find((item) => item.id === product.id)

const createBasket = (product: Product) => ({
  id: uuid.v4(),
  items: [product]
})

const increaseBasket = (basket: Basket, product: Product) : Basket => ({
  ...basket,
  items: [...basket.items, product]
})

const addProductToBasket = (product: Product, basket?: Basket|null): Basket =>
  basket
    ? hasProduct(basket, product)
        ? basket
        : increaseBasket(basket, product)
    : createBasket(product)

export const basketService = {
  addProductToBasket
}
```
- *[GitHub - Creación de los modelos](https://github.com/adrian-afergon/hexagonal-arch-example/tree/step-1/models)*
- *[GitHub - Creación del servicio](https://github.com/adrian-afergon/hexagonal-arch-example/tree/step-2/services)*

### Acceso a datos

Por otro lado, necesitaremos recuperar el listado de productos. Como bien hemos indicado, realizaremos una petición `http`. Sin embargo ¿qué ocurriría si en lugar de esta petición, necesitásemos hacerla vía `GraphQL`? Tendríamos que cambiar gran parte de nuestro código. Incluso vayamos a una decisión más trivial, ¿realizaremos dichas peticiones usando `xhr`, `fetch` o `axios`?

El llevar esta decisión a nuestra capa de **infraestructura** será la opción más acertada. A su vez este objeto será consumido por una entidad `repository`.

> Hemos añadido un servicio `api-example` al proyecto de forma que tengamos un *backend* de pruebas.

En primer lugar definiremos la estructura del dato devuelto por la *API*. Este tipo de datos se les denomina `Data Transfer Object (DTO)`:

```typescript
// /src/infrastructure/http/dto/ProductDTO.ts
export interface ProductDTO {
  product_id: string,
  title: string,
  description: string,
  price: string
}
```

Ahora crearemos una envoltura a la librería `fetch` del navegador para los métodos `http`:
```typescript
// /src/infrastructure/http/http.ts
const headers = {
  'Content-Type': 'application/json'
}

const get = async <T>(url: string) => {
  const response = await fetch(url, {
    method: 'GET',
    headers
  })
  return await response.json() as T
}

const post = async <T>(url: string, body: any) => {
  const response = await fetch(url, {
    method: 'POST',
    headers,
    body
  })
  return await response.json() as T
}

const put = async <T>(url: string, body: any) => {
  const response = await fetch(url, {
    method: 'PUT',
    headers,
    body
  })
  return await response.json() as T
}

const _delete = async <T>(url: string) => {
  const response = await fetch(url, {
    method: 'DELETE',
    headers
  })
  return await response.json() as T
}

export const http = {
  get,
  post,
  put,
  delete: _delete
}
```

Por último crearemos nuestro `repository` en el directorio `infrastructure`. La finalidad de esta capa es hacer la petición y transformar el dato devuelto por el servidor a un *modelo de dominio* definido en nuestra aplicación:

```typescript
// /src/infrastructure/repositories/product.repository.ts

import { http } from '../../infrastructure/http/http'
import { ProductDTO } from '../../infrastructure/dto/ProductDTO'
import { Product } from '../models/Product'

export const productRepository = {
  getProducts: async () => {
    const products = await http.get<ProductDTO[]>('http://localhost:3001/products')
    // we can extract this transform to a function inside this file to be reused by different methods
    return products.map((productDto): Product => ({
      id: productDto.product_id,
      title: productDto.title,
      price: Number(productDto.price)
    }))
  }
}
```

[GitHub - Acceso a datos](https://github.com/adrian-afergon/hexagonal-arch-example/tree/step-3/repositories)

### Vista

Ahora bien, la **vista** y la capa de **acceso a datos** se encuentran en infraestructura. Sin embargo, no deben comunicarse directamente; deberán comunicarse haciendo uso de la capa de **dominio**. Por ello, crearemos un nuevo servicio que se encargue de consumir nuestro `repository` y dar disponibilidad de estos datos al resto de la aplicación:

```typescript
// src/domain/services/Product.service.ts

import { productRepository } from '../../infrastructure/repositories/product.repository'

export const productService = {
  getProducts: () => {
    return productRepository.getProducts()
  }
}
```

> Una buena práctica en este punto podría ser: en lugar de exportar un objeto, definir una función a través de la cual podamos pasar variables como parámetros y devolver como resultado de la llamada al método el objeto anteriormente definido. Sin embargo, no queremos elevar la complejidad de la aplicación en este punto. 

Ahora que hemos definido como recuperar los datos y la funcionalidad necesaria para añadir elementos a nuestra cesta, vamos a visualizar el listado de productos en la aplicación. Bien trabajes en `React` o en `Vue`, debes percatarte que el código hasta ahora ha sido el mismo para ambas plataformas, por lo que la llamada al método desde nuestro componente será la misma (salvando las distancias por la especificidad del ciclo de vida de cada una):

```typescript
// React
// src/infrastructure/components/ProductList.tsx
import * as React from 'react'
import { Product } from '../../domain/models/Product'
import { productService } from '../../domain/services/Product.service'

export const ProductList: React.FC = () => {
  const [products, setProducts] = React.useState<Product[]>([])

  React.useEffect(() => {
    productService.getProducts().then(setProducts)
  }, [])

  return (
    <ul>
      {products.map((product) => <li key={product.id}>{product.title}</li>)}
    </ul>
  )
}
```
```vue
<!-- 
 Vue 
 src/infrastructure/components/ProductList.vue
-->
<template>
  <ul>
    <li v-for="product in products " :key="product.id"> {{ product.title }}</li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { productService } from '@/domain/services/Product.service'
import { Product } from '@/domain/models/Product'

type DataProps = {
  products: Product[];
}

export default defineComponent({
  name: 'ProductList',
  data (): DataProps {
    return {
      products: []
    }
  },
  mounted () {
    productService.getProducts().then(response => (this.products = response))
  }
})
</script>
```
La gestión del estado de los elementos en la cesta es un punto interesante. Aun así, es algo relativo al cómo se visualizan los datos en la interfaz, por lo que nos centraremos en el caso más simple que es gestionarlo a nivel del componente raíz y que este se actualice mediante eventos.

Definimos el estado inicial en el padre y una función que actualice el estado de la cesta:

```typescript
// React
// /src/App.tsx
import React from 'react'
import { ProductList } from './ProductList'
import { Basket } from '../../domain/models/Basket'
import { Product } from '../../domain/models/Product'
import { basketService } from '../../domain/services/Basket.service'

type AppProps = {
  msg: string
}

const App: React.FC<AppProps> = ({ msg }) => {
  const [basket, setBasket] = React.useState<Basket|null>(null)

  const handleAddToCart = (product: Product) => {
    setBasket(basketService.addProductToBasket(product, basket))
  }

  return (
    <div className="App">
      <h1>{msg}</h1>
      <ProductList onSelectProduct={handleAddToCart}/>
      { basket && <p>Items on basket: {basket.items.length}</p>}
    </div>
  )
}

export default App
```
```vue
<!--
Vue
/src/App.vue
-->
<template>
  <Main msg="Welcome to Your Vue.js + TypeScript App"/>
  <ProductList :on-select-product="handleAddToCart"/>
  <p v-if="basket">Items on basket: {{basket.items.length}}</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Main from './infrastructure/components/Main.vue'
import ProductList from '@/infrastructure/components/ProductList.vue'
import { Product } from '@/domain/models/Product'
import { basketService } from '@/domain/services/Basket.service'
import { Basket } from '@/domain/models/Basket'

type DataProps = {
  basket: Basket|null;
}

export default defineComponent({
  name: 'App',
  components: {
    Main,
    ProductList
  },
  methods: {
    handleAddToCart (product: Product) {
      this.basket = basketService.addProductToBasket(product, this.basket)
    }
  },
  data (): DataProps {
    return {
      basket: null
    }
  },
  mounted () {
    this.basket = null
  }
})
</script>
```

Emitimos el evento a los hijos de forma que llamen a la función manejadora con el producto seleccionado:

```typescript
// React
// /src/infrastructure/components/ProductList.tsx
import * as React from 'react'
import { Product } from '../../domain/models/Product'
import { productService } from '../../domain/services/Product.service'

type ProductListProps = {
  onSelectProduct: (product: Product) => void
}

export const ProductList: React.FC<ProductListProps> = ({ onSelectProduct }) => {
  const [products, setProducts] = React.useState<Product[]>([])

  React.useEffect(() => {
    productService.getProducts().then(setProducts)
  }, [])

  return (
    <ul>
      {products.map((product) => <li key={product.id}>
        <button onClick={() => { onSelectProduct(product) }}>{product.title}</button>
      </li>)}
    </ul>
  )
}
```
```vue
<!--
Vue
/src/infrastructure/components/ProductList.vue
-->
<template>
  <ul>
    <li v-for="product in products " :key="product.id">
      <button @click="() => { onSelectProduct(product) }">{{ product.title }}</button>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { productService } from '@/domain/services/Product.service'
import { Product } from '@/domain/models/Product'

type DataProps = {
  products: Product[];
}

export default defineComponent({
  name: 'ProductList',
  props: {
    onSelectProduct: { type: Function }
  },
  data (): DataProps {
    return {
      products: []
    }
  },
  mounted () {
    productService.getProducts().then(response => (this.products = response))
  }
})
</script>
```

[GitHub - Vista](https://github.com/adrian-afergon/hexagonal-arch-example/tree/step-4/view)
[GitHub - Events](https://github.com/adrian-afergon/hexagonal-arch-example/tree/step-5/events)

### Librerías de terceros

Si prestamos atención al código anterior, vemos que todo nuestro código está desacoplado de la tecnología que usamos. Nuestra capa de **dominio** es capaz ser usada tanto por `Vue` como por `React`, teniendo una implementación `http` que nos podría llegar a abstraer de si estamos aplicando `SSR` o funcionamos sobre una `SPA`.

Sin embargo ¿qué ocurriría si tuviésemos que utilizar una librería de terceros? Lo cierto es que si prestamos atención al `basket.service.ts`, tenemos una dependencia con la librería `uuid` (la cual hemos dejado aposta). Esta librería se encarga de generar `ids` de forma aleatoria para el carrito en *frontend*, pero a su vez nos limita a la hora de ejecutarse en *backend*, o en su defecto, nos puede obligar a modificar nuestra capa de **dominio** por una actualización de la misma.

Por ello, la solución a aplicar debería ser la seguida con la integración que hemos hecho para `http`.

```typescript
// /src/infrastructure/uid/uid
import * as uuid from 'uuid'

export const generateUid = (): string => uuid.v4()
```

```typescript
// /src/domain/service/Basket.service.ts
const createBasket = (product: Product) => ({
  id: generateUid(),
  items: [product]
})
```

Este simple cambio nos permitirá que a futuro podamos cambiar a una `v5` sin necesidad de actualizar el código del **dominio** en múltiples puntos, pues es dentro de la función `generateUid` el único punto donde tendremos que aplicar el cambio.

## Conclusión

Como hemos tratado varias veces a lo largo de esta publicación, el aplicar la arquitectura adecuada en *frontend* nos permitirá mejorar la mantenibilidad del código. Si se poseen los conocimientos adecuados, el uso tecnológico será menos crítico y por tanto, podemos añadir un mayor valor al **dominio**.

Pensemos en la velocidad a la que evoluciona el software. En los últimos 20 años la forma de programar ha cambiado enormemente, los desarrolladores hemos tenido que aprender nuevas tecnologías y adaptarnos, pero el negocio se ha mantenido constante.

Por último, aclaremos que este patrón se puede combinar con otros conceptos, como pueden ser *DDD*, *Functional Programing*, *OOP*, etc. No obstante, la intención de este ejemplo es transmitir unas nociones básicas y ser capaz de llegar a cualquier persona interesada, de la manera más sencilla posible.

Espero que estos conceptos te sean de ayuda en tu día a día, que desde un punto crítico te ayuden a evaluar tus proyectos de software y optar por éste u otros patrones de desarrollo que mejoren la calidad de tu trabajo; y que mitiguen los problemas diarios en lo que a software y decisiones de negocio se refiere.

Ante cualquier pregunta, no dudes ponerte en contacto conmigo a través de [mi web](https://adrianferrera.com/) o la de [software crafters](https://softwarecrafters.io/) para más documentación de esta índole.
Puedes encontrarme en redes sociales:

- [Twitter](https://twitter.com/AdrianFerrera91)
- [Linkedin](https://www.linkedin.com/in/afergon/)
- [Youtube](https://www.youtube.com/channel/UCiLWrFqdr20VGV9ZISqaJeg)