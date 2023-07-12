**Docker** nos permite ejecutar de forma aislada, aunque esto realmente es un truco, ya que **Docker** lo que hace es usar tecnologías como `Cgroups` (permite poner límites de recursos a procesos por ejemplo de memoria, CPU, etc) y `namespaces` (permite definir qué es lo que puede ver cada proceso) para que parezca que se ejecuta todo en una maquina independiente.

Una de las ventajas de **Docker** es la rapidez en comparación con una VM, podemos disponer de un sistema Ubuntu en cuestión de segundos.

En **Docker** disponemos de diferentes herramientas que podemos utilizar:

- **Docker Engine:** Herramienta para gestionar las imágenes, contenedores, red, etc.
- **docker-compose:** Se trata de una forma de conectar diferentes contenedores, hablaremos de él más adelante.
- **Docker Hub:** Es como GitHub, una plataforma en la que podemos crear, administrar y subir nuestras imágenes.

*Dockerizar* un proyecto **Node.js** es bastante sencillo, en este artículo veremos el paso a paso y comentaremos buenas prácticas a tener en cuenta.

Para este artículo he creado un repositorio en el que podrás comprobar y descargarte los diferentes ejemplos, en enlace para cada uno lo encontrarás junto a 👩‍💻.

Tras esta breve intro vamos al lio!

## Step 1: *Dockerizando* un API Node.js simple

Lo primero es crear un fichero `Dockerfile` en la raíz del proyecto, en este fichero vamos a indicar los mismos pasos que realizamos nosotros para construir nuestra API de forma manual, de modo que **Docker** sea capaz de hacerlo automáticamente.

⚠️ esto lo que podemos encontrar en varios artículos de *dockerización* de un proyecto **Node.js**.

```docker
FROM node  
WORKDIR /usr/src/app

COPY . .
RUN npm install

EXPOSE 3000
CMD ["node", "server.js"]
```

### 👌 **Good practice:** version

Lo mejor a la hora de crear nuestro `Dockerfile`, desde otra imagen, es indicar **siempre** la versión que queremos utilizar, de modo que nos aseguramos que ésta es compatible con nuestra API.

```docker
# ❌
FROM node   

# 👌
FROM node:14.4.0
```

### 👌 **Good practice: .**dockerignore

Solo debemos copiar lo necesario para desplegar nuestro proyecto. Con el `Dockerfile` anterior podemos observar lo siguiente:

Si añadimos un fichero a nuestra carpeta `node_modules` podemos comprobar que éste se copiará también en nuestro contenedor, por ejemplo `testFile.txt`.
![Art%20culo%20Docker%20Node%20Good%20Practice%20d7dd96e770794a808ff07e6c97dd664b/Screenshot_2020-06-13_at_13.55.44.png](https://swcrafters.fra1.digitaloceanspaces.com/Posts/docker-nodejs-buenas-practicas/Screenshot_2020-06-13_at_13.55.44.png)

```bash
# Construimos la imagen
➜  docker build -t node-test .

# Arrancamos la imagen
➜  docker run node-test

# Contenedores
➜  docker ps
CONTAINER ID        IMAGE          COMMAND                  CREATED             STATUS              PORTS              NAMES
6418ce58579f        node-test      "docker-entrypoint.s…"   5 seconds ago       Up 5 seconds        3000/tcp           brave_mahavira

# Accedemos al contenedor
➜  docker exec -it 641 bash

# Comprobamos 
root@6418ce58579f:/usr/src/app# cd node_modules/
root@6418ce58579f:/usr/src/app/node_modules# ls
```

![Art%20culo%20Docker%20Node%20Good%20Practice%20d7dd96e770794a808ff07e6c97dd664b/Screenshot_2020-06-13_at_14.03.10.png](https://swcrafters.fra1.digitaloceanspaces.com/Posts/docker-nodejs-buenas-practicas/Screenshot_2020-06-13_at_14.03.10.png)

De igual modo revisando el contenedor podemos ver que en el `WORKDIR` del mismo se han copiado algunos ficheros y directorios como: `.git` `.gitignore` `.idea`, que no son necesarios.

```bash
root@6418ce58579f:/usr/src/app# ls -la
```

![Art%20culo%20Docker%20Node%20Good%20Practice%20d7dd96e770794a808ff07e6c97dd664b/Screenshot_2020-06-13_at_14.18.13.png](https://swcrafters.fra1.digitaloceanspaces.com/Posts/docker-nodejs-buenas-practicas/Screenshot_2020-06-13_at_14.18.13.png)

`.dockerignore` se comporta igual que el `.gitignore`. Esto ayuda a que las imágenes que creamos sean más ligeras y seguras.

![Art%20culo%20Docker%20Node%20Good%20Practice%20d7dd96e770794a808ff07e6c97dd664b/Screenshot_2020-06-13_at_14.35.54.png](https://swcrafters.fra1.digitaloceanspaces.com/Posts/docker-nodejs-buenas-practicas/Screenshot_2020-06-13_at_14.35.54.png)

### 👌 **Good practice:** order and layers

Es de vital importancia tener en cuenta como **Docker** genera las capas, y el orden en que estas se ejecutan.

Usando el ejemplo anterior vamos hacer una comparativa de dos `Dockerfiles`. 

```docker
FROM node:14.4.0
WORKDIR /usr/src/app

# ❌ 
COPY . .

EXPOSE 3000
CMD ["node", "server.js"]
```

En éste tenemos **5 capas** (5 sentencias), y cada vez que modifiquemos algo en nuestro proyecto tanto el `COPY` como las siguientes sentencias se volverán a ejecutar (**Docker** no puede cachear estas capas, ya que han cambiado).

![Art%20culo%20Docker%20Node%20Good%20Practice%20d7dd96e770794a808ff07e6c97dd664b/Screenshot_2020-06-13_at_14.57.00.png](https://swcrafters.fra1.digitaloceanspaces.com/Posts/docker-nodejs-buenas-practicas/Screenshot_2020-06-13_at_14.57.00.png)

En el siguiente `Dockerfile` tenemos **7 capas** (7 sentencias) que al disponerlas en el orden que se indica, nos aseguramos de no ejecutar sentencias ya cacheadas innecesariamente.

```docker
FROM node14.4.0
WORKDIR /usr/src/app

# 👌
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["node", "server.js"]
```

Aunque modifiquemos nuestro código, siempre que no modifiquemos algunos de los `package*.json`, no se ejecutará, ni la copia de los mismos, ni el correspondiente `npm install`.

Ahorrándonos mucho tiempo de construcción.

![Art%20culo%20Docker%20Node%20Good%20Practice%20d7dd96e770794a808ff07e6c97dd664b/Screenshot_2020-06-13_at_14.59.47.png](https://swcrafters.fra1.digitaloceanspaces.com/Posts/docker-nodejs-buenas-practicas/Screenshot_2020-06-13_at_14.59.47.png)

![Art%20culo%20Docker%20Node%20Good%20Practice%20d7dd96e770794a808ff07e6c97dd664b/Screenshot_2020-06-13_at_15.00.09.png](https://swcrafters.fra1.digitaloceanspaces.com/Posts/docker-nodejs-buenas-practicas/Screenshot_2020-06-13_at_15.00.09.png)

Una vez tengamos el `Dockerfile` lo ejecutamos de la siguiente manera:

```bash
➜  docker run -p 3001:3000 node-test
```

👩‍💻[https://github.com/yodra/movies-api](https://github.com/yodra/movies-api)

## Step 2: Usando Multistage

En el proceso de desarrollo existen diferentes fases para obtener el código que finalmente se desplegará en producción. **Docker** proporciona multistage, que permite poder ejecutar cada fase en diferentes contenedores. 

A modo de ejemplo hemos implementado la misma API de Movies en TypeScript que necesita ser transpilada antes de correr en producción.

Por lo que ahora tendríamos el siguiente `Dockerfile`:

```docker
FROM node:14.4.0 as trasnpiledApi
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Deploy
FROM node:14.4.0
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --production

COPY --from=trasnpiledApi /usr/src/app/dist .

EXPOSE 3000
CMD ["node", "server.js"]
```

### 👌 **Good practice: Multistage**

Separando fases como compilación, transpilación, empaquetado... nuestras imágenes de producción serán más ligeras y seguras.

👩‍💻 [https://github.com/yodra/movies-api/tree/multistage](https://github.com/yodra/movies-api/tree/multistage)

## Step 3: Añadimos docker-compose

Ya tenemos *dockerizada* la API y solo nos queda conectarla con una base de datos, para conectar diferentes contenedores entre si utilizamos `docker-compose`. Éste es un fichero de configuración `.yml` que se encargará de orquestar como se arrancaran cada uno de los contenedores que necesitamos además de conectarlos entre si.

En este fichero especificamos cada uno de los servicios con los que contaremos y las dependencias entre ellos.

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - 3000:3000
    depends_on:
      - database
  database:
    image: mongo:3.6.18-xenial
    expose:
      - 27017
    volumes:
      - mongodata:/data/db
volumes:
  mongodata:
```

### 👌 **Good practice: identical as production**

Esto nos permite disponer de la misma configuración en los diferentes entornos. Trabajar en un entorno igual que el de producción nos permite adelantarnos a posibles errores.

👩‍💻[https://github.com/yodra/movies-api/tree/docker-compose](https://github.com/yodra/movies-api/tree/docker-compose)

### Resumen de comandos

Aquí algunos de los comandos que podemos necesitar a la hora de trabajar con `docker-compose`.

![Art%20culo%20Docker%20Node%20Good%20Practice%20d7dd96e770794a808ff07e6c97dd664b/Screenshot_2020-06-21_at_11.56.26.png](https://swcrafters.fra1.digitaloceanspaces.com/Posts/docker-nodejs-buenas-practicas/Screenshot_2020-06-21_at_11.56.26.png)

**Docker** es una herramienta que facilita el desarrollo y todos deberíamos aplicar en nuestros proyectos, a modo de guía he creado una chuleta, la cual incluye un resumen de lo comentado en este artículo, que puedes encontrar en mi web [https://yodralopez.dev/](https://yodralopez.dev/)