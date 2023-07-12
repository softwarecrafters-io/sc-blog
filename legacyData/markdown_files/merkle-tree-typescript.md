Hace un tiempo que estoy estudiando sistemas **Blockchain** en general y en particular el código de **Bitcoin**. Durante este proceso me he topado con los conocidos como árboles de Merkle, o **Merkle Trees** en inglés. Estos árboles son un elemento fundamental en el algoritmo de **validación de transacciones** de Bitcoin, formando parte a su vez del famoso **mecanismo de consenso**. Esta estructura es una pieza criptográfica muy interesante de implementar desde un punto de vista didáctico, ya que se interconectan conceptos de **criptografía** con **estructuras jerárquicas de datos**. La idea de este artículo es realizar una implementación aplicando un enfoque híbrido, interconectando conceptos de **POO** con elementos **programación funcional** como **inmutabilidad**, **recursividad** y **high order functions**, todo ello aplicando **TDD** y **buenas prácticas**. Así que independientemente de que te interese el mundo Blockchain o no, te invito que sigas el artículo hasta el final.

Los árboles de Merkle no son un concepto nuevo, fueron desarrollados y patentados en 1979 por **Ralph Merkle**, el padre de la **criptografía asimétrica** y de las **funciones hash**. En esencia un árbol de Merkle, también conocido como un árbol hash binario, es una estructura de datos jerárquica, en concreto un **árbol binario balanceado y completo** en el que cada uno de los elementos viene representado por un hash criptográfico. Se usa para resumir y verificar de manera eficiente la integridad de grandes conjuntos de datos. Recuerda, un árbol es binario cuando tiene cero, uno o dos nodos hijos, y además es balanceado cuando las alturas de los dos subárboles de todos sus nodos no difiere en más de uno. Por otro lado, un árbol binario completo es aquel en el que todos los niveles (excepto el más profundo) están completamente llenos de nodos. El nivel más profundo puede llenarse parcialmente, pero todos los nodos deben generarse transversalmente desde la izquierda hasta la derecha y sin que se formen espacios entre ellos. 

![Tipos de árboles binarios](https://swcrafters.fra1.digitaloceanspaces.com/Posts/merkle-tree-typescript/Arboles%20Binarios%20Balanceados.png)

## Aplicaciones

Los árboles de Merkle tienen múltiples utilidades. En Bitcoin, por ejemplo, se usan  para resumir todas las transacciones de un bloque concreto mediante una huella digital conocida como raíz de Merkle o Merkle root. Mediante esta raíz y un subconjunto del árbol conocido como Merkle path se puede verificar si un dato concreto (en el caso de Bitcoin, una transacción) se encuentra dentro de un bloque sin tener que disponer del árbol entero o de toda la colección de datos, en los siguientes párrafos veremos como implementar esto con TypeScript. Los árboles de Merkle, además de usarse en tecnologías blockchain, tienen otras aplicaciones, como pueden ser:

* **Bases de datos**: Apache Cassandra y otros sistemas NoSQL los usan para mantener la integridad de sus datos sin sacrificar rendimiento.
* **Sistemas de control de versiones** como Git, Mercurial y Subversion. 
* También los podemos encontrar en **sistemas de ficheros** distribuidos. Desarrollos como Ceph, BTRFS, ZFS e IPFS; usan estos árboles de hash con el fin de verificar y mantener la integridad de la información.
* Sin lugar a dudas, el mayor uso de los árboles de Merkle es hacer seguros los bloques de datos recibidos de otros nodos en **redes P2P**, como por ejemplo BitTorrent. Ya que verifican que los fragmentos de diferentes archivos son recibidos sin haber sido alterados. 

## El algoritmo

El árbol de merkle se construye de abajo hacia arriba, es decir, desde las hojas hasta la raíz, y de forma transversal, de izquierda a derecha. Para ello se ejecuta una función de hash en pares de nodos recursivamente hasta que solo queda un único hash, este último se le conoce como raíz de Merkle. En nuestra implementación usaremos como función de hash el algoritmo SHA-256, para ello nos apoyaremos en la librería crypto-js. En Bitcoin también se usa este algoritmo, con la diferencia de que se aplica doblemente, es decir, se genera un hash a partir del hash anterior. Nosotros para simplificar, sólo lo aplicaremos una vez.

Veamos un ejemplo, imagina que tenemos una con una colección que contiene los siguientes cuatro elementos:  ‘A’, ‘B’, ‘C’ y ‘D’. A cada uno de estos elementos se le aplica la función hash, cuyos hashes resultantes (HA, HB, HC, y HD) forman las hojas del árbol. Es importante tener en cuenta que la colección de elementos en sí misma no se almacena en el árbol de merkle. A continuación, los pares de hojas consecutivas se concatenan y se les vuelve a aplicar la función hash, de esta manera se obtiene el siguiente nivel de nodos, en este caso HAB y HCD. En el siguiente paso, se aplica la función hash en estos dos últimos nodos obteniendo así la raíz de Merkle (HABCD):

![Merkle Tree](https://swcrafters.fra1.digitaloceanspaces.com/Posts/merkle-tree-typescript/Merkle%20Tree%20nodos%20pares.png)

¿Qué pasaría en el caso de tener un número impar de hojas o de nodos intermedios? En ese caso lo que se haría es calcular el hash del elemento concatenado consigo mismo, de esta manera mantendremos constantemente los nodos con un número par de elementos. Por ejemplo, si en lugar de la colección anterior tuviéramos A, B y C, tendremos como primer nivel de nodos padre HAB y HCC y como raíz de Merkle HABCC: 

![Merkle Tree](https://swcrafters.fra1.digitaloceanspaces.com/Posts/merkle-tree-typescript/Merkle%20Tree%20Nodos%20Impares.png)

## ¿Cómo lo vamos a implementar?

Para la implementación del algoritmo vamos aplicar un estilo híbrido donde combinaremos algunos elementos de orientación a objetos, como clases y value objects, con algunos elementos de programación funcional como inmutabilidad, recursividad y las funciones de alto nivel map, filter y reduce; además nos pondremos algunas restricciones que me gusta aplicar en mi dia a dia, como evitar el uso de bucles y de bloques else.  

Los árboles en general se pueden representar de múltiples formas, en nuestro caso  lo vamos a hacer mediante una matrix de  bidimensional en la que cada uno de las filas se corresponde con un nivel del árbol, como veremos implementarlo a través de una matriz simplifica la representación y la generación. La matriz la vamos a construir como si de una pila se tratase, apilando las filas. Donde la primera fila insertada contendrá el nodo de hojas y el último la raíz de Merkle. Esta estructura la vamos a definir como una matriz de hashes de solo lectura para evitar mutar su contenido, además la vamos a encapsular dentro de un tipo rico en comportamiento e inmutable, un value object. Para representarlo vamos a utilizar una clase, cuyos métodos estáticos contendrán toda la lógica necesaria para construir la estructura e instanciar el objeto. Y, por otro lado, los métodos de instancia expondrán la API mínima necesaria para poder realizar la prueba de inclusión. 

## Generando el Merkle Tree con TDD

Vamos a implementar la solución al algoritmo aplicando TDD. Empezamos por el primer test, en el que comprobaremos que se genera un árbol de hash binario para una colección dada de elementos. Tratar de resolver directamente este test puede ser un paso demasiado grande. Lo que vamos a hacer es ir añadiendo aserciones intermedias que nos permitan dar pequeños pasos hasta la solución. Luego decidiremos si las dejamos en el test o simplemente las eliminamos. Comenzamos por una aserción que evalúa si las hojas se están generando correctamente para la colección dada. Para generar los hashes nos podemos apoyar en cualquier generador online de SHA256. Recuerda las funciones hash son deterministas, es decir, para una misma entrada siempre se obtiene la misma salida. 

```javascript
describe('The Merkle Tree', () => {
	it('generates a binary hash tree from a given collection with an even number of elements', () => {
		const merkelTree = MerkleTree.createTree(['a', 'b', 'c', 'd']);

		expect(merkelTree.getLeaves()).toEqual([
			'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb',
			'3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d',
			'2e7d2c03a9507ae265ecf5b5356885a53393a2029d241394997265a1a25aefc6',
			'18ac3e7343f016890c510e93f935261169d9e3f565436429830faf0934f4f8e4',
		]);
	});
});
```

La función sha256 de crypto-js la vamos a esconder detrás de nuestra propia función hash, en una especie de wrapper, para en el caso de querer reemplazar el tipo de hash o la librería en sí misma sólo haya que cambiarla en un punto. 

```javascript
import { SHA256 } from 'crypto-js';

export function hash(value: string) {
	return SHA256(value).toString();
}
```

A continuación creamos la clase MerkleTree, en la cual vamos a encapsular la matriz de nodos, esta estructura la vamos a definir como privada y además de tipo ReadonlyArray, esto nos protegerá de mutar la matriz ya que no nos permitirá usar los típicos métodos como push, unshift o shift que mutan el contenido del array. Para la creación definimos un método de factoría donde transformaremos la colección de datos en el tipo que espera el constructor. Para hacer que el test pase implementamos el método getLeaves, que nos devolverá un array con todas las hojas del árbol de manera transversal.

```javascript
export class MerkleTree {
	private constructor(private readonly nodeMatrix: ReadonlyArray<ReadonlyArray<string>>) {}

	static create(elements: string[]) {
		const leafNode = elements.map((e) => hash(e));
		return new MerkleTree([leafNode]);
	}

	getLeaves() {
		return this.nodeMatrix[this.nodeMatrix.length - 1];
	}
}
```

El siguiente paso más sencillo es construir el primer nivel de nodos padres, esto lo representamos en otra colección apilada sobre la anterior. Como hemos mencionado, los nodos padres se generan a partir de concatenar en pares los nodos hijos y aplicar la función hash. Para evitar el ruido que introducen los hashes en los tests vamos a utilizar directamente la funcion hash que encapsulamos en el apartado anterior.


```javascript
describe('The Merkle Tree', () => {
	it('generates a binary hash tree from a given collection with an even number of elements', () => {
		const merkelTree = MerkleTree.create(['a', 'b', 'c', 'd']);

		expect(merkelTree.getLeaves()).toEqual([hash('a'), hash('b'), hash('c'), hash('d')]);
		expect(merkelTree.getNodesByLevel(0).length).toBe(2);
    const expectedABHash = hash(hash('a') + hash('b'));
		const expectedCDHash = hash(hash('c') + hash('d'));
		expect(merkelTree.getNodesByLevel(0)).toEqual([expectedABHash, expectedCDHash]);
	});
});
```

Escribimos el código mínimo para que pase el test, para ello calculamos directamente los nodos padres e implementamos el método getNodesByLevel. 

```javascript
export class MerkleTree {
	private constructor(private readonly nodeMatrix: ReadonlyArray<ReadonlyArray<string>>) {}

	static create(elements: string[]) {
		const leafNode = elements.map((e) => hash(e));
		const parentNodes = [hash(leafNode[0] + leafNode[1]), hash(leafNode[2] + leafNode[3])];
		const nodes = [parentNodes].concat([leafNode]);
		return new MerkleTree(nodes);
	}

	getNodesByLevel(level: number) {
		return this.nodeMatrix[level];
	}

	getLeaves() {
		return this.nodeMatrix[this.nodeMatrix.length - 1];
	}
}
```

Este método nos devuelve los nodos para un nivel particular del árbol, por ahora este solo tiene dos niveles, cero y uno. El nivel cero representa en este momento los padres y el nivel 1 los nodos hoja:

```javascript
[
	['62af5c3cb8da3e4f25061e829ebeea5c7513c54949115b1acc225930a90154da',
	'd3a0f1c792ccf7f1708d5422696263e35755a86917ea76ef9242bd4a8cf4891a',],
	['ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb',
	'3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d',
	'2e7d2c03a9507ae265ecf5b5356885a53393a2029d241394997265a1a25aefc6',
	'18ac3e7343f016890c510e93f935261169d9e3f565436429830faf0934f4f8e4',]
]
```

Antes de continuar vamos a refactorizar un poco el código, podemos extraer dos métodos estáticos privados, uno para generar el hash de un nodo padre en particular a partir de un índice y otro para generar el conjunto de todos los nodos. Para refactorizar adecuadamente te aconsejo que trates de usar el refactor automático de tu IDE y que siempre mantengas los tests en verde.

```javascript
export class MerkleTree {
	private constructor(private readonly nodeMatrix: ReadonlyArray<ReadonlyArray<string>>) {}

	static create(elements: string[]) {
		const leafNode = elements.map((e) => hash(e));
		const nodes = generateParentNodes(leafNode);
		return new MerkleTree(nodes);
	}

	private static generateParentNodes(leafNode: string[]) {
		const parentNode =  [this.generateParentHashNode(0, leafNode), this.generateParentHashNode(2, leafNode)]
		const nodes = [parentNodes].concat([leafNode]);
		return nodes;
	}

	private static generateParentHashNode(index: number, node: string[]) {
		return hash(node[index] + node[index + 1]);
	}

	getNodesByLevel(level: number) {
		return this.nodeMatrix[level];
	}

	getLeaves() {
		return this.nodeMatrix[this.nodeMatrix.length - 1];
	}
}
```

Antes de continuar podemos refactorizar un poco más, se me ocurre que podríamos generar el nivel de nodos padres sin tener que hardcodear el índice, de esta manera continuamos generalizando y además eliminamos esa duplicidad. Para ello debemos pasarle a la función generateParentHashNode solamente índices pares, siempre y cuando estos sean estrictamente menor que la longitud total del nodo. Vamos a implementar esta parte primero de forma imperativa y luego con un estilo más funcional:

```javascript
private static generateParentNodes(leafNode: string[]) {
		const nodes = [];
		nodes.push(leafNode)
		for (let i = 0; i < leafNode.length; i++) {
			if (i % 2 == 0) {
				nodes.push(this.generateParentHashNode(i, leafNode));
			}
		}
		return nodes;
	}
```

Una alternativa funcional podría ser proyectar un array de índices pares, haciendo uso de una función que genere un array a partir de un rango. La función range suele formar parte de la librería estándar en la mayoría de lenguajes modernos, aunque en javascript no hay una implementación per se. Típicamente se suele hacer uso de lodash o alguna otra librería de utilidades, pero personalmente prefiero construirme este tipo de elementos para minimizar el uso y actualización de librerías de terceros. Una implementación válida para este propósito podría ser la siguiente:

```javascript
function range(from:number, length:number, steps = 1): number[] {
	return Array.from({ length: length }, (_, i) => (i + from) * steps);
}
```

Con esta pieza ya podemos reemplazar el bucle por una alternativa declarativa. Donde el rango empezaria en cero, el número de elementos sería la mitad del número de hojas y los pasos serían dos:

```javascript
private static generateParentNodes(leafNode: string[]) {
		const length = Math.round(leafNode.length / 2);
		const parentNode = range(0, length, 2).map((i) => this.generateParentHashNode(i, leafNode));
		return  [parentNode].concat([leafNode]);
	}
```

## Merkle Root
Nuestro árbol de Merkle aun no esta completo, por ahora solo estamos generando las hojas y el primer nivel de padres. Para completar el árbol tenemos que ser capaces de generar n número de nodos padres hasta llegar a obtener un nivel con un solo hash, la raíz de Merkle. Esta pieza es clave, ya que, junto con el Merkle Path, nos permitirá verificar si un determinado dato se encuentra ha formado parte del árbol sin tener que reconstruirlo entero. 

Continuamos desarrollando nuestro primer test, vamos añadir una aserción que evalúa que estamos generando la raiz de merkle. También tenemos que modificar la aserción anterior ya que ahora los nodos padres intermedios tienen que estar en el nivel 1 en lugar del cero: 

```javascript
describe('The Merkle Tree', () => {
	it('generates a binary hash tree from a given collection with an even number of elements', () => {
		const merkelTree = MerkleTree.create(['a', 'b', 'c', 'd']);

    const expectedHashedLeaves = [hash('a'), hash('b'), hash('c'), hash('d')];
		const expectedABHash = hash(hash('a') + hash('b'));
		const expectedCDHash = hash(hash('c') + hash('d'));
		const expectedLevelOneHashedNodes = [expectedABHash, expectedCDHash];
		const expectedMerkleRoot = hash(expectedABHash + expectedCDHash);
		expect(merkelTree.getLeaves()).toEqual(expectedHashedLeaves);
		expect(merkelTree.getNodesByLevel(1).length).toBe(2);
		expect(merkelTree.getNodesByLevel(1)).toEqual(expectedLevelOneHashedNodes);
		expect(merkelTree.getNodesByLevel(0).length).toBe(1);
		expect(merkelTree.getMerkleRoot()).toBe(expectedMerkleRoot);
	});
});
```

Para resolver esto vamos a utilizar un enfoque parecido al anterior. Lo implementaremos de primero de forma imperativa y luego veremos cómo resolverlo de forma recursiva. El paso más pequeño para hacer que el test pase es utilizar un bucle while que genere y concatene los nodos padres hasta que el nodo root solo contenga un elemento:

```javascript
	private static generateParentNodes(leafNode: string[]) {
		let nodes = [leafNode].concat([]);
		while (nodes[0].length > 1) {
			const length = Math.round(nodes[0].length / 2);
			const parentNode = range(0, length, 2).map((i) => this.generateParentHashNode(i, nodes[0]));
			nodes = [parentNode].concat(nodes);
		}
		return nodes;
	}
```

Una vez tenemos el test en verde vamos a refactorizar aplicando un enfoque recursivo. El primer paso para transformar el bucle a una función recursiva es representar el acumulador como un parámetro de la función. A continuación debemos especificar la condición de salida de la función recursiva, la cual la ya definimos en el bucle while anterior:

```javascript
private static generateParentNodes(leafNode: string[], nodes = [leafNode].concat([])) {
		if (nodes[0].length > 1) {
			const length = Math.round(nodes[0].length / 2);
			const parentNode = range(0, length, 2).map((i) => this.generateParentHashNode(i, nodes[0]));
			return this.generateParentNodes(leafNode, [parentNode].concat(nodes));
		}
		return nodes;
	}
```

Como norma general a la hora de escribir funciones recursivas debemos tratar de diseñarlas con recursividad final, para aprovechar la optimización por recursión en cola (tail call optimization) que nos ofrecen los diferentes intérpretes y compiladores de los lenguajes modernos. Por cierto, en JavaScript se propuso en ES6, pero actualmente solamente Safari le da soporte. En su momento el V8 engine de Chrome también lo soportó pero por el momento no está de vuelta, así que ojo con los desbordamientos de pila en NodeJS. Aunque esta optimización no aplique en nuestro caso, vamos a refactorizar para dejar la función con recursividad final, ya que nos va a quedar un código más elegante, de paso aprovechamos para añadir algunas variables explicativas:

```javascript
	private static generateParentNodes(leafNode: string[], nodes = [leafNode].concat([])) {
		const rootNode = nodes[0];
		const isValidMerkleRoot = rootNode.length <= 1;
		if (isValidMerkleRoot) {
			return nodes;
		}
		const length = Math.round(rootNode.length / 2);
		const parentNode = range(0, length, 2)
			.map((i) => this.generateParentHashNode(i, rootNode));
		return this.generateParentNodes(leafNode, [parentNode].concat(nodes));
	}
```

Ahora que hemos completado el test que genera el árbol de merkle para nodos pares podemos afrontar el caso de los nodos impares. En ese caso lo que ocurre es que nos queda un hash que no tiene pareja con la que concatenarlo. Como vimos en la definición del algoritmo, cuando se da esta situación el nodo padre se obtiene mediante la concatenación del hash hijo consigo mismo y aplicando al resultado la función de hash. Vamos a crear un test partiendo del anterior, en este caso vamos a tener un elemento más, por lo tanto en el nodo que contiene las hojas tendremos cinco hashes, en el siguiente tendremos tres, luego dos y finalmente la raíz:

```javascript
it('generates a binary hash tree from a given collection with an odd number of elements', () => {
		const merkelTree = MerkleTree.create(['a', 'b', 'c', 'd', 'e']);

  	const expectedHashedLeaves = [hash('a'), hash('b'), hash('c'), hash('d'), hash('e')];
		const expectedABHash = hash(hash('a') + hash('b'));
		const expectedCDHash = hash(hash('c') + hash('d'));
		const expectedEEHash = hash(hash('e') + hash('e'));
		const expectedLevelTwoHashedNodes = [expectedABHash, expectedCDHash, expectedEEHash];
		const expectedABCDHash = hash(expectedABHash + expectedCDHash);
		const expectedEEEEHash = hash(expectedEEHash + expectedEEHash);
		const expectedLevelOneHashedNodes = [expectedABCDHash, expectedEEEEHash];
		const expectedMerkleRoot = hash(expectedABCDHash + expectedEEEEHash);
		expect(merkelTree.getLeaves()).toEqual(expectedHashedLeaves);
		expect(merkelTree.getNodesByLevel(2).length).toBe(3);
		expect(merkelTree.getNodesByLevel(2)).toEqual(expectedLevelTwoHashedNodes);
		expect(merkelTree.getNodesByLevel(1).length).toBe(2);
		expect(merkelTree.getNodesByLevel(1)).toEqual(expectedLevelOneHashedNodes);
		expect(merkelTree.getNodesByLevel(0).length).toBe(1);
		expect(merkelTree.getMerkleRoot()).toBe(expectedMerkleRoot);
	});
```

La implementación de esta parte es trivial, tan solo debemos añadir una condición a la función generateParentHasNode que evalúe si hay un par de hashes para un nodo y un índice determinados, en caso afirmativo crea un hash con la concatenación de los dos nodos y si no genera un hash del nodo concatenado consigo mismo:

```javascript
	private static generateParentHashNode(index: number, node: string[]) {
		const hasCoupleOfHashes = index < node.length - 1;
		return hasCoupleOfHashes 
			? hash(node[index] + node[index + 1]) 
			: hash(node[index] + node[index]);
	}
```

## Merkle Path

Para demostrar que un dato específico está incluido en un árbol de merkle necesitamos obtener lo que se conoce como Merkle Path o camino de Merkle. En esencia, se trata de una colección que contiene todos aquellos nodos necesarios para reconstruir la raíz de Merkle. Por ejemplo, si queremos obtener el camino de Merkle para el hash del elemento ‘A’, utilizado en el ejemplo del primer test, solo nos harían falta los hashes HB y HCD. Es decir, solo necesitamos un nodo por cada nivel del árbol, por lo tanto la altura del árbol va a coincidir con el número de hashes que necesitamos que incluya el Merkle Path:

![Merkle Path](https://swcrafters.fra1.digitaloceanspaces.com/Posts/merkle-tree-typescript/Merkle%20Path.png)

Ahora que sabemos lo que es un Merkle Path, vamos a implementar una serie de pruebas que cubran algunos casos de uso. Empezar con un test sencillo, en el que se genera un array vacío en el caso de que el hash de un elemento dado no se encuentre entre las hojas del árbol:

```javascript
it('does not create the merkle path for a given element that does not exist in the leaves of the tree', () => {
		const merkelTree = MerkleTree.create(['a', 'b', 'c', 'd']);
		
    const merklePath = merkelTree.generateMerklePath('e');

		expect(merklePath).toEqual([]);
});
```

Este caso es muy sencillo de implementar, solo tenemos que evaluar el hash del elemento y comprobar que existe entre las hojas:

```javascript
	generateMerklePath(element): string[] {
		const leafHash = hash(element);
		const leafLevel = this.nodeMatrix.length - 1;
		const leafIndex = this.getNodesByLevel(leafLevel).findIndex((e) => e == leafHash);
		if (leafIndex <= -1) {
			return [];
		}
	}
```

El siguiente caso que vamos a implementar es ‘genera un camino de merkle para un elemento dado que existe en un conjunto par de hojas’. Este caso de uso es un poco más complejo, así que iremos construyendo el test en dos pasos. En esta primera iteración solo obtendremos el primer hash del Merkle path:

```javascript
it('generates the merkle path for a given element that exists in a set of even leaves', () => {
		const merkelTree = MerkleTree.create(['a', 'b', 'c', 'd']);
		
    const merklePath = merkelTree.generateMerklePath('a');

		const expectedLeafHash = hash('b');
		expect(merklePath).toEqual([expectedLeafHash]);
});
```

Para pasar de rojo a verde, podemos implementar una función que devuelva el nodo vecino. Obteniendo el nodo de la derecha o de la izquierda dependiendo si el índice es par o impar, respectivamente:

```javascript
	generateMerklePath(element): string[] {
		const leafHash = hash(element);
		const leafLevel = this.nodeMatrix.length - 1;
		const leafIndex = this.getNodesByLevel(leafLevel).findIndex((e) => e == leafHash);
		if (leafIndex <= -1) {
			return [];
		}
		const merklePath = [];
		merklePath.push(this.getNeighbourBy(leafIndex, leafLevel));
		return merklePath;

	}

	private getNeighbourBy(index: number, level) {
		if (index % 2 == 0) {
			return this.nodeMatrix[level][index + 1];
		}
		return this.nodeMatrix[level][index - 1];
	}
```

Con el test pasando le añadimos a la aserción el hash que esperamos del siguiente nivel,  es decir, el que corresponde al hash de los elementos C y D:

```javascript
	it('generates the merkle path for a given element that exists in a set of even leaves', () => {
		const merkelTree = MerkleTree.create(['a', 'b', 'c', 'd']);
		
    const merklePath = merkelTree.generateMerklePath('a');

		const expectedLeafHash = hash('b');
		const expectedLevelOneHash = hash(hash('c') + hash('d'));
		expect(merklePath).toEqual([expectedLeafHash, expectedLevelOneHash]);
	});
```

Esta parte la vamos a implementar primero con un enfoque imperativo y luego la pasaremos a un enfoque recursivo como hicimos anteriormente. Podemos utilizar un bucle while para ir acumulando los nodos necesarios mientras el nivel sea estrictamente mayor que cero. Necesitaremos ir decrementando el nivel y recalculando el índice: 

```javascript
	generateMerklePath(element): string[] {
		const leafHash = hash(element);
		let leafLevel = this.nodeMatrix.length - 1;
		let leafIndex = this.getNodesByLevel(leafLevel).findIndex((e) => e == leafHash);
		if (leafIndex <= -1) {
			return [];
		}
		const merklePath = [];
		while (leafLevel > 0) {
			merklePath.push(this.getNeighbourBy(leafIndex, leafLevel));
			leafLevel--;
			leafIndex = Math.round(leafIndex / 2);
		}
		return merklePath;
	}
```

Con el test pasando hacemos un pequeño refactor en el que extraemos un método para facilitarnos la tarea de convertir el bucle a una función recursiva:

```javascript
	generateMerklePath(element): string[] {
		const leafHash = hash(element);
		const leafLevel = this.nodeMatrix.length - 1;
		const leafIndex = this.getNodesByLevel(leafLevel).findIndex((e) => e == leafHash);
		if (leafIndex <= -1) {
			return [];
		}
		return this.buildMerklePath( leafLevel,leafIndex);
	}

	private buildMerklePath( level: number, index: number) {
		const merklePath = [];
		while (level > 0) {
			merklePath.push(this.getNeighbourBy(index, level));
			level--;
			index = Math.round(index / 2);
		}
		return merklePath;
	}
```

Una vez extraído el método buildMerklePatch generar una función recursiva a partir del código que tenemos es prácticamente trivial. Igual que hicimos con anterioridad, movemos el acumulador a la lista de parámetros de la función y sustituimos el while por una cláusula de guarda en la que directamente devolvemos la llamada recursiva:

```javascript
	generateMerklePath(element): string[] {
		const leafHash = hash(element);
		const leafLevel = this.nodeMatrix.length - 1;
		const leafIndex = this.getNodesByLevel(leafLevel).findIndex((e) => e == leafHash);
		if (leafIndex <= -1) {
			return [];
		}
		return this.buildMerklePath(leafLevel, leafIndex);
	}

	private buildMerklePath(level: number, index: number, merklePath = []) {
		if (level > 0) {
			return this.buildMerklePath(
				level - 1,
				Math.round(index / 2),
				merklePath.concat(this.getNeighbourBy(index, level))
			);
		}
		return merklePath;
	}
```

Podríamos darle una vuelta más al refactor invirtiendo la condición para hacer recursión en cola y reemplazar la estructura condicional por un ternario:

```javascript
	private buildMerklePath(level: number, index: number, merklePath = []) {
		return level <= 0
			? merklePath
			: this.buildMerklePath(
                level - 1, 
                Math.round(index / 2), 
                merklePath.concat(this.getNeighbourBy(index, level))
            );
	}
```

A continuación podemos añadir algunos tests más para comprobar que estamos cubriendo correctamente las diferentes casuísticas. También se han eliminado algunas aserciones que eran redundantes. Nuestra suite completa quedaría tal que así:

```javascript
import { MerkleTree } from '../core/MerkleTree';
import { hash } from '../core/utils/Crypto';

describe('The Merkle Tree', () => {
	it('creates a binary hash tree from a given collection with an even number of elements', () => {
		const merkelTree = MerkleTree.create(['a', 'b', 'c', 'd']);

		const expectedHashedLeaves = [hash('a'), hash('b'), hash('c'), hash('d')];
		const expectedABHash = hash(hash('a') + hash('b'));
		const expectedCDHash = hash(hash('c') + hash('d'));
		const expectedLevelOneHashedNodes = [expectedABHash, expectedCDHash];
		const expectedMerkleRoot = hash(expectedABHash + expectedCDHash);
		expect(merkelTree.getLeaves()).toEqual(expectedHashedLeaves);
		expect(merkelTree.getNodesByLevel(1)).toEqual(expectedLevelOneHashedNodes);
		expect(merkelTree.getMerkleRoot()).toBe(expectedMerkleRoot);
	});

	it('creates a binary hash tree from a given collection with an odd number of elements', () => {
		const merkelTree = MerkleTree.create(['a', 'b', 'c', 'd', 'e']);

		const expectedHashedLeaves = [hash('a'), hash('b'), hash('c'), hash('d'), hash('e')];
		const expectedABHash = hash(hash('a') + hash('b'));
		const expectedCDHash = hash(hash('c') + hash('d'));
		const expectedEEHash = hash(hash('e') + hash('e'));
		const expectedLevelTwoHashedNodes = [expectedABHash, expectedCDHash, expectedEEHash];
		const expectedABCDHash = hash(expectedABHash + expectedCDHash);
		const expectedEEEEHash = hash(expectedEEHash + expectedEEHash);
		const expectedLevelOneHashedNodes = [expectedABCDHash, expectedEEEEHash];
		const expectedMerkleRoot = hash(expectedABCDHash + expectedEEEEHash);
		expect(merkelTree.getLeaves()).toEqual(expectedHashedLeaves);
		expect(merkelTree.getNodesByLevel(2)).toEqual(expectedLevelTwoHashedNodes);
		expect(merkelTree.getNodesByLevel(1)).toEqual(expectedLevelOneHashedNodes);
		expect(merkelTree.getMerkleRoot()).toBe(expectedMerkleRoot);
	});

	it('does not create the merkle path for a given element that does not exist in the leaves of the tree', () =>{
		const merkelTree = MerkleTree.create(['a', 'b', 'c', 'd']);

		const merklePath = merkelTree.generateMerklePath('e');

		expect(merklePath).toEqual([]);
	});

	it('generates the merkle path for a given element that exists in a set of even leaves', () => {
		const merkelTree = MerkleTree.create(['a', 'b', 'c', 'd']);

		const merklePath = merkelTree.generateMerklePath('a');

		const expectedLeafHash = hash('b');
		const expectedLevelOneHash = hash(hash('c') + hash('d'));
		expect(merklePath).toEqual([expectedLeafHash, expectedLevelOneHash]);
	});

	it('generates the merkle path for a given element in an intermediate position of a set of even leaves', () =>{
		const merkelTree = MerkleTree.create(['a', 'b', 'c', 'd']);

		const merklePath = merkelTree.generateMerklePath('c');

		const expectedLeafHash = hash('d');
		const expectedLevelOneHash = hash(hash('a') + hash('b'));
		expect(merklePath).toEqual([expectedLeafHash, expectedLevelOneHash]);
	});

	it('generates the merkle path for a given element that exists in a set of odd leaves', () => {
		const merkelTree = MerkleTree.create(['a', 'b', 'c', 'd', 'e']);

		const merklePath = merkelTree.generateMerklePath('a');

		const expectedLeafHash = hash('b');
		const expectedLevelTwoHash = hash(hash('c') + hash('d'));
		const expectedEEHash = hash(hash('e') + hash('e'));
		const expectedLevelOneHash = hash(expectedEEHash + expectedEEHash);
		expect(merklePath).toEqual([expectedLeafHash, expectedLevelTwoHash, expectedLevelOneHash]);
	});
});
```

Todas las pruebas pasan correctamente. Con esto podemos dar por completada la implementación de la clase Merkle Tree. 

```javascript
import { hash } from './utils/Crypto';
import { range } from './utils/Array';

export class MerkleTree {
	private constructor(private readonly nodeMatrix: ReadonlyArray<ReadonlyArray<string>>) {}

	static create(elements: string[]) {
		const leafNode = elements.map((e) => hash(e));
		const nodes = this.generateParentNodes(leafNode);
		return new MerkleTree(nodes);
	}

	private static generateParentNodes(leafNode: string[], nodes = [leafNode].concat([])) {
		const rootNode = nodes[0];
		const isValidMerkleRoot = rootNode.length <= 1;
		if (isValidMerkleRoot) {
			return nodes;
		}
		const length = Math.round(rootNode.length / 2);
		const parentNode = range(0, length, 2).map((i) => this.generateParentHashNode(i, rootNode));
		return this.generateParentNodes(leafNode, [parentNode].concat(nodes));
	}

	private static generateParentHashNode(index: number, node: string[]) {
		const hasCoupleOfHashes = index < node.length - 1;
		return hasCoupleOfHashes ? hash(node[index] + node[index + 1]) : hash(node[index] + node[index]);
	}

	generateMerklePath(element): string[] {
		const leafHash = hash(element);
		const leafLevel = this.nodeMatrix.length - 1;
		const leafIndex = this.getNodesByLevel(leafLevel).findIndex((e) => e == leafHash);
		if (leafIndex <= -1) {
			return [];
		}
		return this.buildMerklePath(leafLevel, leafIndex);
	}

	private buildMerklePath(level: number, index: number, merklePath = []) {
		return level <= 0
			? merklePath
			: this.buildMerklePath(
                level - 1, 
                Math.round(index / 2), 
                merklePath.concat(this.getNeighbourBy(index, level))
            );
	}

	private getNeighbourBy(index: number, level: number) {
		if (index % 2 == 0) {
			return this.getNodesByLevel(level)[index + 1];
		}
		return this.getNodesByLevel(level)[index - 1];
	}

	getMerkleRoot() {
		return this.getNodesByLevel(0)[0];
	}

	getNodesByLevel(level: number) {
		return this.nodeMatrix[level];
	}

	getLeaves() {
		return this.nodeMatrix[this.nodeMatrix.length - 1];
	}
}
```



## Prueba de inclusión

La prueba de inclusión, o Merkle proof of inclusion, es un algoritmo que verifica que un elemento concreto se encuentra en un conjunto de datos a partir de un Merkle Path y un Merkle Root. En Bitcoin, todos los nodos ligeros (aquellos que no contienen la Blockchain entera) como por ejemplo podría ser una wallet, son capaces de validar si una transacción está incluida o no en un bloque con tan solo una milésima parte de los datos, gracias al Merkle Root, al Merkle Path y al algoritmo de prueba de inclusión.

Para implementar este algoritmo vamos a construir un pequeño servicio de dominio que recibe en el constructor un Merkle root y un Merkle Path y expone un método que verifica la inclusión de un elemento concreto. Como venimos haciendo hasta ahora vamos a construir primero el test y luego la implementación:

```javascript
describe('The Merkle proof of inclusion', () => {
	it('verifies that a element and a given merkle path generates the expected Merkle root for a tree with even nodes', () => {
		const element = 'a';
		const merkelTree = MerkleTree.create(['a', 'b', 'c', 'd']);
		const proofOfInclusion = ProofOfInclusion.create(
			merkelTree.getMerkleRoot(),
			merkelTree.generateMerklePath(element)
		);

		expect(proofOfInclusion.verify(element)).toBeTruthy();
	});
});
```

La implementación del método de verificación es bastante simple, en esencia lo que tenemos que hacer es generar el hash del dato recibido por parámetro. Dicho hash lo concatenamos con el merkle path y a continuación reducimos el array generado aplicando la función de hash el resultado de concatenar el hash previo con el actual. Finalmente se compara el resultado con la raíz de Merkle dada:

```javascript
export class ProofOfInclusion {
	private constructor(private readonly merkleRoot: string, private readonly merklePath: ReadonlyArray<string>) {}

	static create(merkleRoot: string, merklePath: ReadonlyArray<string>) {
		return new ProofOfInclusion(merkleRoot, merklePath);
	}

	verify(element: string) {
		const hashedElement = hash(element);
		const newMerkleRoot = [hashedElement]
			.concat(this.merklePath)
			.reduce((previousHash, currentHash) => hash(previousHash + currentHash));
		return newMerkleRoot === this.merkleRoot;
	}
}
```

Para terminar vamos a añadir algunas pruebas más a la suite, por ejemplo podemos comprobar si un elemento existente en un árbol de merkle con nodos impares lo verifica correctamente y también podemos añadir otro test que evalúe el caso contrario, es decir que no verifique la prueba de inclusión si el elemento no existe:

```javascript
import { ProofOfInclusion } from '../core/ProofOfInclusion';
import { MerkleTree } from '../core/MerkleTree';

describe('The Merkle proof of inclusion', () => {
	it('verifies that a given element and a merkle path generate the expected Merkle root for a tree with even nodes', () => {
		const element = 'a';
		const merkelTree = MerkleTree.create([element, 'b', 'c', 'd']);
		const proofOfInclusion = ProofOfInclusion.create(
			merkelTree.getMerkleRoot(),
			merkelTree.generateMerklePath(element)
		);

		expect(proofOfInclusion.verify(element)).toBeTruthy();
	});

	it('verifies that a given element and a merkle path generate the expected Merkle root for a tree with odd nodes', () => {
		const element = 'a';
		const merkelTree = MerkleTree.create([element, 'b', 'c', 'd', 'e']);
		const proofOfInclusion = ProofOfInclusion.create(
			merkelTree.getMerkleRoot(),
			merkelTree.generateMerklePath(element)
		);

		expect(proofOfInclusion.verify(element)).toBeTruthy();
	});

	it('does not verify the inclusion of a data that does not exist', () => {
		const element = 'x';
		const merkelTree = MerkleTree.create(['a', 'b', 'c', 'd']);
		const proofOfInclusion = ProofOfInclusion.create(
      merkelTree.getMerkleRoot(), 
      merkelTree.generateMerklePath('a')
    );

		expect(proofOfInclusion.verify(element)).toBeFalsy();
	});
});
```

Con esto damos por finalizada nuestra implementación del árbol de Merkle y la prueba de inclusión. Puedes acceder al repositorio completo [desde aquí](https://github.com/softwarecrafters-io/merkle-tree-typescript). Si el artículo te ha gustado o te ha aportado algún detalle de valor, te agradeceria mucho que lo compartieras en tus redes sociales. 

