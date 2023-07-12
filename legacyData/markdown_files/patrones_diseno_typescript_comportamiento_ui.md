Este artículo es la continuación del post [Patrones de con TypeScript en el mundo real: creacionales y estructurales](/typescript/patrones-diseno-creacionales-estructurales), en ese post definía el concepto de patrón de diseño y profundizaba en algunos patrones creacionales y estructurales.

En este segundo artículo nos centraremos en los patrones de comportamiento y de UI.

## Patrones de comportamiento

### Strategy

La motivación principal del patrón *Strategy* es tener la posibilidad de ejecutar distintas implementaciones para una misma funcionalidad de forma dinámica. De esta forma, imaginemos que tenemos que ejecutar una funcionalidad específica representada por un método *strategicMethod*:

```ts
interface Strategy {
    strategicMethod(): void;
}
```

Y dicha funcionalidad puede ser ejecutada de dos maneras (estrategias) diferentes:

```ts
class ConcreteStrategyA implements Strategy {
    public strategicMethod(): void {
        console.log('Strategy A');
    }
}

class ConcreteStrategyB implements Strategy {
    public strategicMethod(): void {
        console.log('Strategy B');
    }
}
```

Definimos una clase *Context* que conoce la implementación o estrategia que debe ejecutarse en cada momento para acometer la funcionalidad:

```ts
class Context {
    private strategy: Strategy;

    constructor(strategy: Strategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy: Strategy) {
        this.strategy = strategy;
    }

    performStrategicMethod(): void {
        this.strategy.strategicMethod();
    }
}
```

Con ella, podemos desde el cliente **variar dinámicamente la estrategia a ejecutar**. Además, delegamos la implementación interna de cada comportamiento o estrategia a las subclases *ConcreteStrategy*. El punto negativo de este patrón, es que el cliente necesita conocer y referenciar las clases de cada una de las estrategias.

```ts
export class Client {
    run(): void {
        const context = new Context(new ConcreteStrategyA());
        context.performStrategicMethod();

        context.setStrategy(new ConcreteStrategyB());
        context.performStrategicMethod();
    }
}
```

En nuestro caso particular, registrábamos cada cambio en cada campo de cada formulario y lo almacenábamos en el estado centralizado de la aplicación. Utilizamos el patrón *Strategy* en el componente que tenía que representar este historial de cambios, ya que necesitábamos una representación diferente dependiendo del tipo de dato modificado.

Definimos por ello un formateador por cada posible tipo de dato que hubiera que representar:

```ts
export interface FieldFormatter<T> {
    format(field: Field<T>): string;
}
export class BooleanFormatter implements FieldFormatter<boolean> {

    format(field: Field<boolean>): string {
        return field.value ? 'True' : 'False';
    }
}
export class StringFormatter implements FieldFormatter<string> {

    format(field: Field<string>): string {
        return field.value;
    }
}
```

Y en el componente visual, utilizamos un servicio de *Angular*, que a través de una factoría, obtenía el formateador adecuado en base al tipo de dato de cada registro:

```ts
@Injectable()
export class FieldFormatterService {
    private formattersDictionary: { [key: number]: FieldFormatter<any> };

    constructor() {
        this.formattersDictionary =
            FieldTypeFormatsFactory.buildFormattersDictionary();
    }

    format(field: Field<any>): string {
        const typeFormatter = this.formattersDictionary[field.type];
        return typeFormatter !== undefined && typeFormatter.format(field);
    }
}
    
export class FieldTypeFormatsFactory {

    static buildFormattersDictionary(
    ): { [key: number]: FieldFormatter<any> } {
        return {
            [FieldTypes.String]: new StringFormatter(),
            [FieldTypes.Boolean]: new BooleanFormatter()
        };
    }
}

@Component({
    selector: 'strategy',
    templateUrl: './real-world.component.html'
})
export class StrategyRealWorldComponent implements OnInit {
    fieldsFormatted: Array<string>;

    constructor(private fieldFormatter: FieldFormatterService) { }

    ngOnInit() {
        const fields: Array<Field<any>> = [
            { type: FieldTypes.Boolean, value: true },
            { type: FieldTypes.String, value: 'a field value' }
        ]
        this.fieldsFormatted = fields.map(f => this.fieldFormatter.format(f));
    }
}
```

Como podéis ver en el ejemplo, casi siempre que aplicamos el patrón *Strategy*, se elige la estrategia o implementación a ejecutar en base a algún tipo de condición o parámetro. En nuestro caso, como hemos dicho, fue el tipo de dato.

### Observer

Este patrón seguramente es de los más utilizados después del *Singleton*. La motivación principal es **desacoplar la comunicación entre distintos objetos**. Desde el punto de vista teórico, empezamos definiendo los *Observers*:

```ts
interface Observer {
    update(): void;
}

class ConcreteObserver implements Observer {
    update(): void { }
}
```

Por otro lado, tendremos los objetos *Subjects*, que serán los encargados de tener una referencia directa a los *observers* para poder comunicarse con ellos:

```ts
interface Subject {
    registerObserver(observer: Observer);
    unregisterObserver(observer: Observer);
    notifyObservers();
}

class ConcreteSubject implements Subject {
    observers: Array<Observer>;

    registerObserver(observer: Observer) {
        this.observers.push(observer);
    }

    unregisterObserver(observer: Observer) {
        // Find and remove observer from the collection.
    }

    notifyObservers() {
        this.observers.forEach(o => o.update());
    }
}
```

Desde el cliente o cualquier punto del sistema, podremos crear los *observers* y suscribirlos a cada *subject* específico, de forma que podrán comunicarse con ellos y notificarles en cualquier momento mediante el método *notifyObservers*:

```ts
export class Client {
    run() {
        const subject = new ConcreteSubject();
        const observer1 = new ConcreteObserver();
        const observer2 = new ConcreteObserver();

        subject.registerObserver(observer1);
        subject.registerObserver(observer2);

        subject.notifyObservers();
    }
}
```

Como podéis observar, con este patrón logramos **desacoplar totalmente** a los *observers*, ya que no conocen ni tienen ninguna referencia a ningún *subject*. Además, no estamos atados a un orden concreto de notificación entre observers.

En nuestro caso particular, teníamos un estado centralizado implementado con *Redux* y debíamos notificar a cada uno de los componentes visuales cuando una propiedad del estado se veía modificada. Esta notificación la implementamos mediante el patrón *observer*, donde cada *observer* era cada uno de los componentes a los que se debía notificar:

```ts
@Component({
    selector: 'observer1',
    templateUrl: './observer1.component.html'
})
export class Observer1Component {
    public productNames: Array<string> = [];
    private model: Order;

    @Input() set order(orderFromState: Order) {
        this.model = orderFromState;
        this.buildFormattedOrderList();
    }
    get order() { return this.model; }

    constructor(private connector: ConnectorService) {
        this.connector.registerObserver(this);
    }

    private buildFormattedOrderList(): void {
        this.productNames = this.model.productList.map(p => p.name);
    }

    addNewProduct() {
        this.connector.updateState(
            addNewProductStateAction(this.model)
        );
    }
}
```

El *subject* o encargado de llevar a cabo dicha notificación, era un servicio de *Angular* al que bautizamos como *connector*:

```ts
@Injectable()
export class ConnectorService {
    private currentState: Order;
    private observers = [];

    constructor(private store: Store) {
        this.currentState = this.store.state;
    }

    registerObserver(component) {
        this.observers.push(component);
        this.notifyObserver(component);
    }

    updateState(newState: Order) {
        if (this.isStateChanged(newState)) {
            this.currentState = newState;
            this.notifyObservers();
        }
    }

    private notifyObservers() {
        this.observers.forEach(o => this.notifyObserver(o));
    }

    private notifyObserver(observer) {
        observer.order = this.currentState;
    }

    private isStateChanged(newState: Order): boolean {
        return this.currentState.id !== newState.id;
    }
}
```

Este servicio llevaba el registro de cada componente a notificar (que se autoregistraban en sus correspondientes constructores llamando al método *registerObserver*) y se suscribía él mismo a la *store* de *Redux* para saber cuando se modificaba cualquier propiedad y poder notificar a cada uno de los componentes.

## Patrones de UI

### Page-Object

Este último patrón que revisaremos en el artículo de hoy, no encajaba en ninguna de las categorías comunes, ya que su motivación es muy específica y está muy ligada a la parte de UI. La motivación es crear una abstracción de una vista en forma de objeto, de forma que **se desacoplan los consumidores de la propia vista**.

En nuestro caso, estos consumidores eran nuestros tests de componentes UI de *Angular*. Lo que hicimos es, en vez de acceder directamente al código HTML de cada componente desde el código de los tests, creamos un *PageObject* del componente:

```ts
export class ProductListPageObject {
    getProductId(): number {
        const productId = this.getHTMLElementByClass('id')[0].textContent;
        return parseInt(productId);
    }

    getProductName(): string {
        const productName = this.getHTMLElementByClass('name')[0].textContent;
        return productName;
    }

    openDetail(): void {
        const viewDetailButton = this.getHTMLElementByClass('view-detail')[0];
        viewDetailButton.click();
    }

    private getHTMLElementByClass(className: string): Array<HTMLElement> {
        return [new HTMLElement()];
    }
}
```

Que expone métodos *get* para obtener valores de la vista y algún método como *openDetail* para hacer *click* e interactuar sobre elementos de ésta:

```html
<ul>
    <li class="id">1</li>
    <li class="name">A product</li>
    <li><a href="#" class="view-detail">View Detail</a></li>
</ul>
<ul>
    <li class="id">2</li>
    <li class="name">Another product</li>
    <li><a href="#" class="view-detail">View Detail</a></li>
</ul>
```

Así, tendremos el código de nuestros tests totalmente desacoplado de la vista (además de ser mucho **más legible y mantenible**). En el caso en que cambie el HTML del componente (que suele ser muy habitual), sólo habrá que adaptar la clase *PageObject*, pero el código de nuestros tests quedará intacto, lo que conllevará que el mantenimiento de éstos sea mucho más fácil y no se acabarán abandonando.

```ts
export class TestClient {
    private pageObject = new ProductListPageObject();**

    is_a_valid_product_id(): boolean {
        const productId** = this.pageObject.getProductId();
        return productId > 0;
    }

    is_a_valid_product_name(): boolean {
        const productName = this.pageObject.getProductName();
        return productName.length < 255;
    }

    is_a_product_detail_visible(): boolean {
        this.pageObject.openDetail();
        // ...
        return false;
    }
}
```

# Y aún hay mas...

Estos han sido sólo algunos de los patrones que usamos en nuestra aplicación, si queréis conocer todos los que llegamos a aplicar, podéis consultar la [charla](https://www.youtube.com/watch?v=ZlhKj32KlfI) que impartimos en la JSDay Canarias 2019 y su [repositorio de código](https://github.com/cbastos/jsdaycan2019-typescript-patterns) correspondiente con ejemplos.

Además, no puedo dejar de recomendar el libro que más me ha servido de ayuda y que mejor explica la mayoría de patrones (para mi gusto): **Head First Design Patterns** de *Eric Freeman*, *Elisabeth Freeman*, *Kathy Sierra* y *Bert Bates*.

Espero que os haya resultado útil el artículo, y cualquier duda/pregunta/sugerencia podéis encontrarme en twitter como [@ivanirega](https://twitter.com/ivanirega). Y recordad: *"Donde hay patrón, no manda marinero"* 😉