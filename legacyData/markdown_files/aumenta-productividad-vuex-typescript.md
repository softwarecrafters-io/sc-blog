Cuando trabajamos con librerías de terceros a veces tenemos que lidiar con un tipado débil. Es el caso de la librería oficial de Vue para la administración del estado de la aplicación: **Vuex**

A pesar de ser una librería muy utilizada en multitud de proyectos, la definición de su API respecto a los tipos deja mucho que desear: poco soporte de tipos genéricos y muchos tipos `any` por todo el código.

Esto conlleva a que cuando quieres utilizarla en tu desarrollo no tengas soporte del intellisense (autocompletado, definición de propiedades y métodos, etc...) ni seguridad de tipos. En resumen, es como si tuviéramos desactivado el soporte de TypeScript en ese código y fuéramos a ciegas.

![Sample getters with errors](https://swcrafters.fra1.cdn.digitaloceanspaces.com/Posts/aumenta-productividad-vuex-typescript/getters-without-types.gif)

Pues bien, la buena noticia es que podemos "vitaminar" el tipado de Vuex mediante una serie de interfaces genéricas y el uso del estilo de objeto que soporta las mutaciones y acciones de Vuex. En este artículo aportaré una solución sencilla que nos permitirá tener un punto de partida sobre cómo ayudarnos con TypeScript para completar las carencias de Vuex.

## Conociendo el entorno

Como ejemplo de este artículo, trabajaremos sobre una aplicación típica de carrito de la compra.

Tendremos que manejar mediante Vuex las siguientes características:

- Estado raíz de la aplicación: `loading` y `snackbar`.
- Dos módulos sin espacio de nombres: `products` y `cart` (aunque sólo veremos el código del primero).

Una de las primeras tareas que hacemos cuando desarrollamos con una librería de terceros que expone tipos de TypeScript es, precisamente, ver los tipos que expone para ser usada. Así que vamos a vamos a ver los tipos principales que expone Vuex:

> Se ha omitido código de la definición para evitar ruido (···)

_vuex/types/index.d.ts_

```ts

export declare class Store<S> {
  constructor(options: StoreOptions<S>);

  readonly state: S;
  readonly getters: any;

  dispatch: Dispatch;
  commit: Commit;

  ···
}
```

Como vemos, tenemos la declaración de una clase `Store` que admite un tipo genérico llamado `S`.

> Los tipos genéricos en TypeScript nos permiten definir estructuras reutilizables aplicando un determinado tipo de dato en varios puntos de nuestro código.

En este caso, el genérico `S` que le pasamos a `Store` será el que definirá la propiedad de sólo lectura `state` y que será el estado de nuestra aplicación. Por ahora, no tenemos que hacer nada especial, tan sólo definir una interface que contendrá nuestro estado raíz.

_./src/store/root.models.ts_

```ts

export interface RootState {
  loading: boolean;
  snackbar: Snackbar;
}

interface Snackbar {
  message: string;
  isActive: boolean;
  type?: "success" | "info" | "error";
}

export type SetSnackbar = Pick<Snackbar, "message" | "type">;
```

Para definir el tipo `Snackbar` hemos utilizado un tipo literal de string. De esta forma le decimos que la propiedad `type` sólo podrá contener como valores posibles "success", "info" o "error".

Y para el tipo a exportar `SetSnackbar` utilizamos el tipo de utilidad de TypeScript `Pick<T,K>`. Este tipo genérico crea un nuevo tipo con las propiedades de `T` referidas en `K`. En nuestro caso, crearemos un tipo nuevo con las propiedades `message` y `type` de la interface `Snackbar`. Podíamos haber usado `Omit` pero lo veremos en otro caso más adelante.

Ahora sólo nos falta crear un objeto que utilizaremos para setear el estado inicial de nuestro estado raíz.

_./src/store/root.models.ts_

```ts
···

export const initialRootState: RootState = {
  loading: false,
  snackbar: {
    message: "",
    isActive: false,
    type: undefined,
  },
};
```

Vamos a alimentar nuestro store con este estado raíz y utilizaremos la interface creada `RootState` para tipar el objeto _store_:

_./src/store/index.ts_

```ts
import { RootState, initialRootState } from "./root.models";
···

export const store = new Vuex.Store<RootState>({
  state: initialRootState,
});
```

## Mutations

Lo primero que haremos será analizar los **tipos que expone Vuex** para las mutaciones.

_vuex/types/index.d.ts_

```ts
···

export interface MutationTree<S> {
  [key: string]: Mutation<S>;
}

export type Mutation<S> = (state: S, payload?: any) => any;
```

Para empezar, `MutationTree` es un tipo genérico que permite pasarle la interface del estado (`RootState` en nuestro caso).

Cada propiedad en un objeto creado conmgom el tipo `MutationTree` tendrá como valor una función de tipo `Mutation<S>`. Esta última interface viene a definirse como una función que admite dos parámetros de entrada: `state` con el tipado del estado raíz (`RootState`) y un `payload` con un tipo `any`.

**¿Qué consecuencias nos trae manejar valores definidos con el tipo `any`?**

Pues básicamente le estamos diciendo a TypeScript que queremos deshabilitar la verificación de tipos y esto no es nada óptimo para nosotros.

Normalmente el tipo `any` se utiliza cuando no conocemos el tipo de variables con el que vamos a trabajar, pero en nuestro caso, sí que sabemos qué objetos vamos a definir como mutaciones, acciones, etc... así que no tiene mucho sentido mantener este tipado. En breve veremos cómo podemos mejorarlo.

Primero, vamos a hacer una introducción al **estilo de objeto** que permite Vuex para acometer las mutaciones y despachar las acciones.

### Estilo de objeto

```ts

store.commit("increment", { amount: 10 });

/** Son equivalentes */

store.commit({
  type: "increment",
  payload: { amount: 10 },
});
```

Esta característica permite pasar un objeto que contenga una propiedad `type` con el nombre de la mutación o acción y una propiedad `payload` con los parámetros que queremos hacer llegar al método `commit` o `dispatch` del **store**, respectivamente.

Aprovechando esta característica podemos crear una función que admita un `payload` y devolver un objeto con esa definición (`type` y `payload`) para que el _store_ lo entienda.

```ts

const increment = (payload: { amount: 10 }) => ({ type: "increment", payload: { amount: 10 } });

store.commit(increment({ amount: 10 }));
```

Sabiendo esto, mi propuesta se basa en utilizar esta característica para crear un objeto que contenga estas funciones y utilizarlas donde sea necesario. De este modo tendremos la inferencia de tipos que no nos provee Vuex en nuestro _store_ y componentes.



![Object Style Mutation](https://swcrafters.fra1.cdn.digitaloceanspaces.com/Posts/aumenta-productividad-vuex-typescript/object-style-mutation.gif)

Vamos a comenzar creando nuestros primeros tipos llamados _helpers_, y para ello, definiremos un fichero _root.helpers.ts_ en el raíz de nuestro _store_:

### DefineMutationTree

Este tipo genérico vendrá a sustituir a `MutationTree` de Vuex. Lo que admite este tipo genérico es la definición de la interface de las mutaciones `Mutation` y del estado `State`.

Por cada propiedad definida en la interface que le pasaremos como mutaciones (genérico `Mutation`) existirá una propiedad en este objeto cuyo valor será una función que admitirá el estado tipado y un `handler` (que hará referencia al objeto `type` y `payload` anterior). Este `handler` recibirá un objeto con una propiedad `payload` cuyo tipo será el que hemos definido previamente en nuestra interface `Mutation`.

_./src/store/root.helpers.ts_

```ts

export type DefineMutationTree<Mutation, State> = {
  [Prop in keyof Mutation]: (state: State, handler: { payload: Mutation[Prop] }) => void;
};
```

Quedará más claro cuando lo usemos. Primero, definimos la interface de nuestras mutaciones:

_./src/store/root.mutations.ts_

```ts

import { RootState } from "./root.models";

export interface RootMutations {
  setLoading: RootState["loading"];
  setSnackbar: RootState["snackbar"];
}
```

Fíjate que el tipo de dato que asignamos a cada propiedad será el tipo del `payload` que queremos pasar a las mutaciones.

Ahora, cuando vayamos a definir el objeto **mutations** con nuestra interface `DefineMutationTree`, al pasarle `RootMutations` y `RootState` nuestro IDE nos irá indicando los valores que debemos rellenar sin posibilidad de equivocarnos, lo cual se traduce en menos errores, más rapidez y más control de tu código.

![Mutations with types works](https://swcrafters.fra1.cdn.digitaloceanspaces.com/Posts/aumenta-productividad-vuex-typescript/add-mutations.gif)

_./src/store/root.mutations.ts_

```ts
···
const mutations: DefineMutationTree<RootMutations, RootState> = {
  setLoading(state, { payload }) {
    state.loading = payload;
  },
  setSnackbar(state, { payload }) {
    state.snackbar = {
      message: payload.message,
      type: payload.type || "success",
      isActive: payload.isActive,
    };
  },
};

export default mutations;
```

### DefineTypes

Al principio comenté que usaríamos el **estilo de objeto de Vuex** para usarlo de forma segura, ¿verdad? Pues primero tenemos que definir la interface que deberán cumplir estos objetos.

En el fichero de _root.helpers.ts_ crearemos el siguiente tipo genérico llamado `DefineTypes`.

_./src/store/root.helpers.ts_

```ts
···
export type DefineTypes<Methods> = {
  [Prop in keyof Methods]: Methods[Prop] extends undefined
    ? () => { type: keyof Methods }
    : (payload: Methods[Prop]) => { type: keyof Methods; payload: Methods[Prop] };
};
```

Estamos definiendo un tipo genérico que admite una interface llamada `Methods` (ya que nos servirá tanto para las mutaciones como para las acciones) la cual tendrá una propiedad existente en `Methods` y a través del tipo condicional `T extends U ? X : Y`, le estamos diciendo que si el tipo de dato es `undefined` asigne la definición a la derecha del interrogante `?` y en caso contrario, la definición a la derecha de los dos puntos `:`. Sí, es un operador ternario de tipos y lo tenemos disponible en TypeScript desde la versión 2.8.

La primera función no indica parámetros de entrada y devolverá un objeto con una propiedad `type` con el nombre del método. La segunda función, admitirá un parámetro de entrada `payload` con el tipo de dato indicado en la interface y devolverá un objeto con una propiedad `type` igual que la anterior y el `payload` recibido anteriormente.

Vamos a usarlo.

_./src/store/root.mutations.ts_

```ts
···
export const rootMutationsTypes: DefineTypes<RootMutations> = {
  setLoading: payload => ({ type: "setLoading", payload }),
  setSnackbar: payload => ({ type: "setSnackbar", payload }),
};
```

![Root mutations types](https://swcrafters.fra1.cdn.digitaloceanspaces.com/Posts/aumenta-productividad-vuex-typescript/root-mutations-types.gif)

A la hora de utilizarlo en conjunto con el resto de propiedades en el _store_ haremos lo siguiente:

_./src/store/index.ts_

```ts
import mutations, { rootMutationsTypes, RootMutations } from "./root.mutations";
···
export const store = new Vuex.Store<RootState>({
  strict: true,
  state: initialRootState,
  mutations, // <- Agregamos el objeto con las mutaciones
});

// Exportamos nuestro objeto ayudante para usarlo en los componentes (contiene nuestras funciones con el estilo de objeto)
export const rootTypes = {
  mutations: rootMutationsTypes,
};
```

Y para usarlo importaremos este objeto `rootTypes` y lo pasaremos como parámetro de entrada al método `commit` del **store** (o `this.$store` si estamos en los componentes, por ejemplo):

```ts

const actions = {
  getAllProducts: ({ commit }) => {
    commit(rootMutationsTypes.setLoading(true));
  },
};
```

Veamos cómo se comporta:

![Mutations types works](https://swcrafters.fra1.cdn.digitaloceanspaces.com/Posts/aumenta-productividad-vuex-typescript/use-mutations-store-types.gif)

## Actions

Para las acciones haremos exactamente lo mismo que con las mutaciones.

Primero, vamos a ver qué tipos nos ofrece Vuex al respecto.

_vuex/types/index.d.ts_

```ts
···
export interface ActionTree<S, R> {
  [key: string]: Acocltion<S, R>;
}

export type Action<S, R> = ActionHandler<S, R> | ActionObject<S, R>;

export type ActionHandler<S, R> = (this: Store<R>, injectee: ActionContext<S, R>, payload?: any) => any;
export interface ActionObject<S, R> {
  root?: boolean;
  handler: ActionHandler<S, R>;
}
```

Al igual que con `MutationTree` tenemos una tipado muy débil con `any`, tanto en el `payload` como en el retorno de las acciones. Así que vamos a ver cómo solucionarlo.

Esta vez comenzaremos definiendo la interface que deberá cumplir nuestras acciones. Recuerda, al igual que con las mutaciones, vamos a definir el nombre de nuestra acción como clave de la propiedad y como tipo de dato el parámetro de entrada de la acción.

_./src/store/root.actions.ts_

```ts

import { RootState, SetSnackbar } from "./root.models";

export interface RootActions {
  showSnackbar: SetSnackbar;
}
```

### DefineActionTree

Ahora crearemos un nuevo tipo llamado `DefineActionTree` en nuestro fichero de _helpers_.

_./src/store/root.helpers.ts_

```ts

import { Store, ActionContext } from "vuex";
···
export type DefineActionTree<Action, State, RootState> = {
  [Prop in keyof Action]: Action[Prop] extends undefined
    ? (
        this: Store<RootState>,
        ctx: ActionContext<State, RootState>,
      ) => void | Promise<any>
    : (
        this: Store<RootState>,
        ctx: ActionContext<State, RootState>,
        handler: { payload: Action[Prop] },
      ) => void | Promise<any>;
};
```

Muy parecido a la definición de `DefineMutationTree`, la diferencia es que las acciones reciben el contexto del **store** y para ello hacemos uso de `ActionContext` de Vuex.

Vamos a usarlo todo en conjunto en nuestro fichero de acciones:

_./src/store/root.actions.ts_

```ts

import { RootState, SetSnackbar } from "./root.models";
import { DefineActionTree, DefineTypes } from "./store.helpers";
import { rootMutationsTypes } from "./root.mutations";

export interface RootActions {
  showSnackbar: SetSnackbar;
}

const actions: DefineActionTree<RootActions, RootState> = {
  showSnackbar({ commit }, { payload }) {
    commit(rootMutationsTypes.setSnackbar({ ...payload, isActive: true }));

    setTimeout(() => {
      commit(rootMutationsTypes.setSnackbar({ ...payload, isActive: false }));
    }, 3000);
  },
};

export const rootActionsTypes: DefineTypes<RootActions> = {
  showSnackbar: payload => ({ type: "showSnackbar", payload }),
};

export default actions;
```

![Define Actions Tree](https://swcrafters.fra1.cdn.digitaloceanspaces.com/Posts/aumenta-productividad-vuex-typescript/define-actions-tree.gif)

Fíjate que estamos importando el objeto `rootMutationsTypes` para hacer uso de las mutaciones previamente definidas. Todo este código te aporta seguridad de tipos para trabajar más cómodamente, y lo mejor es que cuando lo usamos en nuestros componentes también tenemos seguridad de tipos, cosa que antes no teníamos.

Vamos a alimentar nuestro **store** con los objetos creados:

_./src/store/index.ts_

```ts
···
import actions, { rootActionsTypes, RootActions } from "./root.actions";

export const store = new Vuex.Store<RootState>({
  strict: true,
  state: initialRootState,
  mutations,
  actions,
});

export const rootTypes = {
  actions: rootActionsTypes,
  mutations: rootMutationsTypes,
};
```

![Define Actions works](https://swcrafters.fra1.cdn.digitaloceanspaces.com/Posts/aumenta-productividad-vuex-typescript/define-types-actions-in-action.gif)

## Getters

Si recordamos cómo estaba definida la propiedad de sólo lectura `getters` en la clase `Store` de Vuex...

_./vuex/types/index.d.ts_

```ts

export declare class Store<S> {
  constructor(options: StoreOptions<S>);

  readonly state: S;
  readonly getters: any;

  dispatch: Dispatch;
  commit: Commit;

  ···
}
```

Vemos que se nos presenta un gran problema respecto a lo que el tipado se refiere.

La propiedad `getters` está definida con el tipo `any` de TypeScript, lo que significa que `getters` podrá ser cualquier cosa y por tanto, nuestro IDE no podrá trabajar adecuadamente.

Cuando vayamos a utilizar esta propiedad en nuestros componentes estaremos totalmente a ciegas con los problemas que conlleva. Pero es que además en el propio uso en el store tendremos los mismos problemas... observa la definición:

_./vuex/types/index.d.ts_

```ts

export interface GetterTree<S, R> {
  [key: string]: Getter<S, R>;
}

export type Getter<S, R> = (state: S, getters: any, rootState: R, rootGetters: any) => any;
```

Seguimos teniendo tipos `any` por todos lados...

Vamos a ver cómo podríamos implementar una solución rápida para subsanarlo. Trabajaremos en nuestro fichero _store.helpers.ts_

_./src/store/store.helpers.ts_

```ts
···

export type DefineGetterTree<Getter, State, RootState = {}, RootGetter = {}> = {
  [K in keyof Getter]: (
    state: State,
    getters: Getter,
    rootState: RootState,
    rootGetters: RootGetter,
  ) => Getter[K];
};

export type GetterHelper<Getter> = { [Prop in keyof Getter]: Getter[Prop] };

export type StoreTS<State, Getters> = Omit<Store<State>, "getters"> & {
  readonly getters: GetterHelper<Getters>;
};

```

Vamos por partes. Primero, `DefineGetterTree`.

### DefineGetterTree

```ts

export type DefineGetterTree<Getter, State, RootState = {}, RootGetter = {}> = {
  [Prop in keyof Getter]: (
    state: State,
    getters: Getter,
    rootState: RootState,
    rootGetters: RootGetter
  ) => Getter[Prop];
};
```

Hemos creado un tipo genérico que admitirá la definición de los getters `Getter`, el estado local `State`, el estado raíz `RootState` (si estuviéramos en un módulo) y los getters del raíz `RootGetter` (si estuviéramos también en un módulo).

Antes de ver cómo podemos usarlo, vamos a crear la definición de nuestros **Getters**:

_./src/store/root.getters.ts_

```ts

import { RootState } from "./root.models";

export interface RootGetters {
  snackbar: RootState["snackbar"];
}

export default getters;
```

En esta definición lo que hacemos es decir qué propiedades tendrá nuestros **getters** (en este caso, una propiedad `snackbar`) y que la misma tendrá un tipo `RootState["snackbar"]`. Estamos aprovechando la funcionalidad de TypeScript de acceder a los tipos de una interface mediante su índice.

Si recordamos el funcionamiento de Vuex, un `getter` no es más que una función que retorna el estado manipulado, es decir, como una `computed property`. Gracias a esta interface que hemos definido, _lo que estamos indicando es el retorno que tendrá esa función getter llamada snackbar_.

Ahora podemos ver el uso de nuestra interface genérica `DefineGetterTree`.

Vamos a crear el objeto que expondremos como **getters** para nuestro _store_:

_./src/store/root.getters.ts_

```ts

import { DefineGetterTree } from "./store.helpers";
import { RootState } from "./root.models";

export interface RootGetters {
  snackbar: RootState["snackbar"];
}

const getters: DefineGetterTree<RootGetters, RootState> = {
  snackbar: state => state.snackbar,
};

export default getters;
```

Fíjate que cuando creamos `DefineGetterTree`, dijimos que por cada propiedad en `RootGetters` (`[Prop in keyof Getter]`) crearíamos una propiedad en este nuevo objeto que tendría como valor una función que recibiría como parámetros de entrada, entre otras cosas, el estado `State`; y que tendría como retorno de dicha función el tipo que le dijimos en nuestra interface (`Getter[Prop]`):

```ts

export type DefineGetterTree<Getter, State, RootState = {}, RootGetter = {}> = {
  [Prop in keyof Getter]: (
    state: State,
    getters: Getter,
    rootState: RootState,
    rootGetters: RootGetter
  ) => Getter[Prop];
};
```

Bien, por ahora hemos definido cómo será nuestros **getters** pero no hemos dicho cómo le decimos a Vuex que lo use.

Vamos a alimentar nuestro `store` con este objeto y veremos cómo podemos salvar el `any` que vimos al principio.

## StoreTS

_./src/store/store.helpers.ts_

```ts
···

export type GetterHelper<Getter> = { [Prop in keyof Getter]: Getter[Prop] };

export type StoreTS<State, Getters> = Omit<Store<State>, "getters"> & {
  readonly getters: GetterHelper<Getters>;
};

```

Aquí estamos usando algunos tipos avanzados de TypeScript para ayudarnos a conseguir nuestro objetivo. Vamos por partes:

Primero, `StoreTS` es una interface genérica que admite la interface del estado `State` y la interface de los getters `Getters`. Esta interface genérica hace una unión de tipos un poco especial:

- Por una parte, tenemos un tipo de utilidad `Omit<T,K>` que construye un tipo tomando todas las propiedades de `T` excepto `K`. En nuestro caso, todas las propiedades de la interface `Store<State>` excepto la propiedad `getters` (recuerda, `Store` viene de los tipos de Vuex y esta propiedad _getters_ estaba con tipo `any`, por eso no nos interesa).
- Por otra parte, y mediante la unión `&` le decimos que agregue una propiedad de sólo lectura llamada `getters` y para la cual su tipo será `GetterHelper<Getters>`.

Así que el resultado será una sobreescritura de tipos donde la instancia de nuestro _store_ será el tipado que viene por defecto en Vuex excepto para los getters, que ahora tendrán inferencia de tipos gracias a esta definición de tipos.

¿Y cómo lo usamos? Veamos:

_./src/store/index.ts_

```ts
···
import getters, { RootGetters } from "./root.getters";

Vue.use(Vuex);

export const store = new Vuex.Store<RootState>({
  strict: true,
  state: initialRootState,
  mutations,
  actions,
  getters, // <- alimentamos con nuestro objeto getters, por tanto this.$store.getters no tendrá inferencia de tipos (funcionamiento normal)
});

···
// Pero exportaremos este objeto que sí tendrá la inferencia de tipos para getters, p.ej: store.getters.snackbar
export default store as StoreTS<RootState, RootGetters & CartGetters>;
```

De esta forma, cuando queramos usar los getters tipados en nuestros componentes tan sólo deberemos importar este objeto cuyo tipos estarán ampliados.

_./src/store/index.ts_

```ts
<script lang="ts">
import Vue from "vue";
import store from "../store";

export default Vue.extend({
  name: "Snackbar",
  computed: {
    snackbar() {
      return store.getters.snackbar;
    },
  },
});
</script>
```

Y ahora con los nuevos tipos, vamos a verlo en funcionamiento:

![Typings getters](https://swcrafters.fra1.cdn.digitaloceanspaces.com/Posts/aumenta-productividad-vuex-typescript/typings-getters.gif)

> Fíjate que ya no es necesario indicar el tipo de retorno de las computed property porque es capaz de inferir el tipo

## Módulos

Por ahora hemos cubierto cómo trabajar con la librería Vuex y sus tipos en el raíz, pero normalmente usaremos la característica de módulos para escalar nuestro estado.

### Products State

Vamos a comenzar por definir el estado del módulo "Products" y el objeto que usaremos para inicializarlo:

_./src/store/modules/products/products.models.ts_

```ts

export interface ProductsState {
  all: Product[];
}

export interface Product {
  id: number;
  title: string;
  price: number;
  inventory: number;
}

export const initialProductsState: ProductsState = {
  all: [],
};
```

Además vamos a necesitar extender la interface del estado raíz para darle cabida al estado de este módulo mediante la propiedad `products` que tendrá el estado raíz.

_./src/store/modules/products/products.models.ts_

```ts
···
export type ExtendedProductsState = { products?: ProductsState };
```

Y ahora debemos utilizarlo en el estado raíz para ampliarlo.

_./src/store/root.models.ts_

```ts
···
import { ExtendedProductsState } from "./modules/products";

/** Root State */
export interface RootState extends ExtendedProductsState {
  loading: boolean;
  snackbar: Snackbar;
}
···
```

### Products Mutations

Por simplicidad, vamos a mostrar el fichero completo de `products.mutations.ts`

_./src/store/modules/products/products.mutations.ts_

```ts

import { DefineMutationTree, DefineTypes } from "../../store.helpers";
import { RootState } from "../../root.models";
import { ProductsState, Product } from "./products.models";

export interface ProductsMutations {
  setProducts: Product[];
  decrementProductInventory: Product["id"];
}

const mutations: DefineMutationTree<ProductsMutations, ProductsState> = {
  setProducts: (state, { payload }) => {
    state.all = payload;
  },

  decrementProductInventory: (state, { payload }) => {
    state.all.find(p => p.id === payload)!.inventory--;
  },
};

export const productsMutationsTypes: DefineTypes<ProductsMutations> = {
  setProducts: payload => ({ type: "setProducts", payload }),
  decrementProductInventory: payload => ({
    type: "decrementProductInventory",
    payload,
  }),
};

export default mutations;
```

### Products Actions

Por simplicidad, vamos a mostrar el fichero completo de `products.actions.ts`

_./src/store/modules/products/products.actions.ts_

```ts
···
import { rootMutationsTypes } from "../../root.mutations";

export interface ProductsActions {
  getAllProducts: undefined;
}

const actions: DefineActionTree<ProductsActions, ProductsState> = {
  getAllProducts: ({ commit }) => {
    commit(rootMutationsTypes.setLoading(true));
    ···
  },
};

export const productsActionsTypes: DefineTypes<ProductsActions> = {
  getAllProducts: () => ({ type: "getAllProducts" }),
};

export default actions;
```

> Fíjate cómo importando los helpers del raíz podemos hacer uso de las funciones tipadas

## Products Getters

Por simplicidad, vamos a mostrar el fichero completo de `products.getters.ts`

_./src/store/modules/products/products.getters.ts_

```ts

import { DefineGetterTree } from "../../store.helpers";
import { RootState } from "../../root.models";
import { ProductsState, Product } from "./products.models";

export interface ProductsGetters {
  allProducts: Product[];
}

const getters: DefineGetterTree<ProductsGetters, ProductsState, RootState> = {
  allProducts: state => state.all,
};

export default getters;
```

Una vez creado el fichero de mutaciones vamos a añadirlo a nuestro **store**.

```ts
···
import { products, productsTypes } from "./modules/products";

export const store = new Vuex.Store<RootState>({
  strict: true,
  state: initialRootState,
  mutations,
  actions,
  getters,
  modules: {  // Agregamos los módulos al store
    products,
  },
});

export const rootTypes: HelperTypes<RootMutations, RootActions> = {
  actions: rootActionsTypes,
  mutations: rootMutationsTypes,
};

/** Helper types Object */
export const storeTypes = {
  root: rootTypes,
  products: productsTypes,
};
```

Yo por comodidad he creado un objeto que he llamado `storeTypes` donde voy agregando, bajo el nombre de los módulos o del raíz, los objetos correspondientes con las acciones y mutaciones de todo el store.

Así cuando vaya a utilizarlo sólo debes indicar la ruta al método:

```ts
<script lang="ts">
import Vue from "vue";
import store, { storeTypes } from "../store";
import { Product } from "../store/modules/products";

export default Vue.extend({
  name: "ProductList",
  computed: {
    products() {
      return store.state.products!.all;
    },
  },
  methods: {
    addToCart(product: Product) {
      store.dispatch(storeTypes.cart.actions!.addToCart(product));
    },
  },
});
</script>
```

![Store with types](https://swcrafters.fra1.cdn.digitaloceanspaces.com/Posts/aumenta-productividad-vuex-typescript/store-with-types.gif)

Y hasta aquí el post sobre cómo aumentar tu productividad usando Vuex con TypeScript. 

Este post nace de la [charla](https://youtu.be/FmHcLbVYqec) que impartí en el JSDay Canarias 2019. El código completo lo puedes encontrar en este [enlace](https://github.com/LissetteIbnz/jsdaycan2019-vuex-typescript).

Además, de esta charla surgió la idea de crear **un paquete de npm con los tipos más completos ya disponibles para trabajar**, así que si te ha parecido interesante el tema y quieres usarlos, los tienes a tu disposición en [@lissette.ibnz/vuex-extended-types](https://www.npmjs.com/package/@lissette.ibnz/vuex-extended-types)

Ya sabes `npm i -D @lissette.ibnz/vuex-extended-types`

Espero que te haya resultado útil el artículo, y cualquier duda/pregunta/sugerencia podéis encontrarme en twitter como @LissetteIbnz

Nos vemos 🖖😄