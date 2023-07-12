import * as fs from "fs";
import {Post} from "@/core/models";
import {NodeHtmlMarkdown} from "node-html-markdown";

export type LegacyPost = {
    title: string;
    seoTitle: string;
    slug: string;
    category: string;
    author: string;
    twitterAuthor?: string;
    background: string;
    hideEbookPromo?: boolean;
    hideInHome?: boolean;
    summaryChars: number;
    content: string;
    summary?: string;
    ogImage?: string;
};

const nhm = new NodeHtmlMarkdown(
    /* options (optional) */ {},
    /* customTransformers (optional) */ undefined,
    /* customCodeBlockTranslators (optional) */ undefined
);

export const legacyPostsWithMarkdownContent: LegacyPost[] = [
    {
        "title":"Arquitectura Hexagonal en el FrontEnd",
        "seoTitle":"▷ Arquitectura Hexagonal en el FrontEnd【2020】",
        "slug": "arquitectura-hexagonal-frontend",
        "category": "react",
        "author": "Adrián Ferrera",
        "twitterAuthor": "@AdrianFerrera91",
        "background":"https://swcrafters.fra1.cdn.digitaloceanspaces.com/Categories/ReactJS_category.png",
        "hideEbookPromo":false,
        "hideInHome":false,
        "summaryChars" : 396,
        "content": fs.readFileSync("./legacyData/markdown_files/arquitectura-hexagonal-frontend.md", {encoding: 'utf-8'}),
        "summary":"Los desarrolladores llamamos arquitectura al conjunto de patrones de desarrollo que permiten definir unas pautas a seguir en nuestro software en cuanto a límites y restricciones.",
        "ogImage": "https://swcrafters.fra1.cdn.digitaloceanspaces.com/Posts/arquitectura-hexagonal-frontend/og.png"
    },
    {
        "title":"Programación funcional en JavaScript. Introducción",
        "slug":"introduccion-programacion-funcional-javascript",
        "seoTitle":"▷ Programación Funcional: los fundamentos en 10 min【2020】",
        "category":"javascript",
        "author": "Jose Manuel Lucas",
        "twitterAuthor": "@jmlweb",
        "background":"https://swcrafters.fra1.cdn.digitaloceanspaces.com/Categories/JS_category.png",
        "hideEbookPromo":false,
        "hideInHome":false,
        "summaryChars":396,
        "content": fs.readFileSync("./legacyData/markdown_files/introduccion-programacion-funcional-javascript.md", {encoding: 'utf-8'}),
        "summary": "La programación funcional es un paradigma de programación basado en la composición de funciones matemáticas.",
        "ogImage": "https://swcrafters.fra1.cdn.digitaloceanspaces.com/Posts/introduccion_programacion_funcional_javascript/OG_introduccion_programacion_funcional_javascript.png"
    },
    {
        "title":"Merkle Trees y prueba de inclusión con TypeScript y TDD",
        "slug":"merkle-trees-typescript-tdd",
        "seoTitle":"▷ Merkle Trees y prueba de inclusión con TypeScript y TDD【2021】",
        "category":"blockchain",
        "author": "Miguel A. Gómez",
        "twitterAuthor": "@sw_crafters",
        "background":"https://swcrafters.fra1.digitaloceanspaces.com/Categories/bitcoin_category.png",
        "hideEbookPromo":false,
        "hideInHome":false,
        "summaryChars":396,
        "content": fs.readFileSync("./legacyData/markdown_files/merkle-tree-typescript.md", {encoding: 'utf-8'}),
        "summary": "Los árboles de Merkle fueron desarrollados en 1979 por Ralph Merkle, el padre de la criptografía asimétrica y de las funciones hash.",
        "ogImage": "https://swcrafters.fra1.digitaloceanspaces.com/Posts/merkle-tree-typescript/og.png"
    },
    {
        "title":"Introducción a la programación reactiva con RxJS",
        "seoTitle":"▷ RxJS: Programación Reactiva【2020】",
        "slug": "introduccion-programacion-reactiva-rxjs",
        "category": "javascript",
        "author": "Miguel A. Gómez",
        "background":"https://swcrafters.fra1.cdn.digitaloceanspaces.com/Categories/RxJS_category.png",
        "summaryChars" : 396,
        "content": fs.readFileSync("./legacyData/introduccion-programacion-reactiva-rxjs.html", {encoding: 'utf-8'}),
        "summary":"RxJS es una librería que nos permite programar con un estilo funcional reactivo. La programación reactiva es un concepto relativamente nuevo ",
        "ogImage":"https://res.cloudinary.com/software-crafters/image/upload/v1547037167/posts/introduccion-programacion-reactiva-rxjs/og-introduccion_a_la_programacion_reactiva_con_rxjs.png"
    },
    {
        "title":"Patrones de diseño con TypeScript en el mundo real: creacionales y estructurales",
        "seoTitle":"▷ PATRONES DE DISEÑO: creacionales y estructurales【2020】",
        "slug":"patrones-diseno-creacionales-estructurales",
        "category":"typescript",
        "author": "Iván Reinoso",
        "twitterAuthor": "@ivanirega",
        "background":"https://swcrafters.fra1.cdn.digitaloceanspaces.com/Categories/TS_category.png",
        "hideEbookPromo":false,
        "hideInHome":false,
        "summaryChars":396,
        "content": fs.readFileSync("./legacyData/markdown_files/patrones_diseno_typescript_creacionales_estructurales.md", {encoding: 'utf-8'}),
        "summary": "Un patrón de diseño es un conjunto de recomendaciones que podemos aplicar para resolver problemas de diseño comunes. Creacionales y estructurales ",
        "ogImage": "https://swcrafters.fra1.cdn.digitaloceanspaces.com/Posts/patrones-diseno-typescript-creacionales-estructurales/og.png"
    },
    {
        "title":"Docker + NodeJS + Buenas Prácticas",
        "seoTitle":"▷ Docker + NodeJS + Buenas Prácticas【2020】",
        "slug": "docker-nodejs-buenas-practicas",
        "category": "devops",
        "author": "Yodra López",
        "twitterAuthor": "@yodralopez",
        "background":"https://swcrafters.fra1.cdn.digitaloceanspaces.com/Categories/docker_category.png",
        "hideEbookPromo":false,
        "hideInHome":false,
        "summaryChars" : 396,
        "content": fs.readFileSync("./legacyData/markdown_files/docker-nodejs-buenas-practicas.md", {encoding: 'utf-8'}),
        "summary":"*Dockerizar* un proyecto Nodejs es bastante sencillo, en este artículo veremos el paso a paso y comentaremos buenas prácticas a tener en cuenta.",
        "ogImage": "https://swcrafters.fra1.cdn.digitaloceanspaces.com/Posts/docker-nodejs-buenas-practicas/og.png"
    },
    {
        "title":"TDD en React con TypeScript",
        "seoTitle":"▷ TDD en ReactJS con TypeScript【2020】",
        "slug": "tdd-react-typescript",
        "category": "react",
        "author": "Adrián Ferrera",
        "twitterAuthor": "@AdrianFerrera91",
        "background":"https://swcrafters.fra1.cdn.digitaloceanspaces.com/Categories/ReactJS_category.png",
        "hideEbookPromo":false,
        "hideInHome":false,
        "summaryChars" : 396,
        "content": fs.readFileSync("./legacyData/markdown_files/react-tdd-typescript.md", {encoding: 'utf-8'}),
        "summary":"¿TDD en el FrontEnd? En este post veremos como aplicarlo con React y TypeScript.",
        "ogImage": "https://swcrafters.fra1.cdn.digitaloceanspaces.com/Posts/tdd-react-typescript/og.png"
    },
    {
        "title":"Clean Code aplicado a Javascript",
        "seoTitle":"▷ Clean Code: ¿código limpio en JS?【2020】",
        "slug": "clean-code-javascript",
        "category": "javascript",
        "author": "Miguel A. Gómez",
        "background":"https://swcrafters.fra1.cdn.digitaloceanspaces.com/Categories/JS_category.png",
        "summaryChars" : 396,
        "content": fs.readFileSync("./legacyData/clean-code-javascript.html", {encoding: 'utf-8'}),
        "summary":"Clean code o código limpio en español, es un término al que ya hacían referencia desarrolladores de la talla de Ward Cunningham o Kent Beck",
        "ogImage":"https://res.cloudinary.com/software-crafters/image/upload/v1553272577/posts/clean_code_javascript/og-cleancode-javascript.png"
    },
    {
        "title":"Introducción a TypeScript con ReactJS",
        "slug":"introduccion-typescript-react",
        "seoTitle":"▷ Introduccion a Typescript con React【2020】",
        "category":"typescript",
        "author": "Jose Manuel Lucas",
        "twitterAuthor": "@jmlweb",
        "background":"https://swcrafters.fra1.cdn.digitaloceanspaces.com/Categories/TS_category.png",
        "hideEbookPromo":false,
        "hideInHome":false,
        "summaryChars":396,
        "content": fs.readFileSync("./legacyData/markdown_files/introduccion-typescript-react.md", {encoding: 'utf-8'}),
        "summary": "TypeScript es un lenguaje que extiende JavaScript para dotarlo de tipado estático.",
        "ogImage": "https://swcrafters.fra1.cdn.digitaloceanspaces.com/Posts/introduccion-typescript-react/og.png"
    },
    {
        "title":"Patrones de diseño con TypeScript en el mundo real: comportamiento y UI",
        "seoTitle":"▷ PATRONES DE DISEÑO: comportamiento y UI【2020】",
        "slug":"patrones-diseno-comportamiento-ui",
        "category":"typescript",
        "author": "Iván Reinoso",
        "twitterAuthor": "@ivanirega",
        "background":"https://swcrafters.fra1.cdn.digitaloceanspaces.com/Categories/TS_category.png",
        "hideEbookPromo":false,
        "hideInHome":false,
        "summaryChars":396,
        "content": fs.readFileSync("./legacyData/markdown_files/patrones_diseno_typescript_comportamiento_ui.md", {encoding: 'utf-8'}),
        "summary": "Un patrón de diseño es un conjunto de recomendaciones que podemos aplicar para resolver problemas de diseño comunes. Comportamiento y UI",
        "ogImage": "https://swcrafters.fra1.cdn.digitaloceanspaces.com/Posts/patrones-diseno-comportamiento-ui/og.png"
    },
    {
        "title":"Aumenta tu productividad con Vuex gracias a TypeScript",
        "seoTitle":"▷ VUEX con TypeScript【2020】| VueJS",
        "slug":"aumenta-productividad-vuex-typescript",
        "category":"vuejs",
        "author": "𝕊𝕒𝕣𝕒 𝕃𝕚𝕤𝕤𝕖𝕥𝕥𝕖 🍋",
        "twitterAuthor": "@LissetteIbnz",
        "background":"https://swcrafters.fra1.cdn.digitaloceanspaces.com/Categories/vuejs_category.png",
        "hideEbookPromo":true,
        "hideInHome":false,
        "summaryChars":396,
        "content": fs.readFileSync("./legacyData/markdown_files/aumenta-productividad-vuex-typescript.md", {encoding: 'utf-8'}),
        "summary": "Vuex es librería oficial de Vue para la administración del estado de la aplicación, veremos como tiparla con TypeScript.",
        "ogImage": "https://swcrafters.fra1.cdn.digitaloceanspaces.com/Posts/aumenta-productividad-vuex-typescript/og.png"
    },
    {
        "title":"Testing en el FrontEnd",
        "seoTitle":"▷ Testing en el FrontEnd【2020】",
        "slug": "testing-frontend",
        "category": "react",
        "author": "Iago Lastra",
        "twitterAuthor": "@iagolast",
        "background":"https://swcrafters.fra1.cdn.digitaloceanspaces.com/Categories/ReactJS_category.png",
        "hideEbookPromo":false,
        "hideInHome":false,
        "summaryChars" : 356,
        "content": fs.readFileSync("./legacyData/markdown_files/testing-frontend.md", {encoding: 'utf-8'}),
        "summary":"¿Testing en el FrontEnd? En este post veremos todo lo necesario para introducirse en el mundo del testing en frontend.",
        "ogImage": "https://swcrafters.fra1.cdn.digitaloceanspaces.com/Posts/testing-frontend/og.png"
    },
    {
        "title":"Inyección de dependencias en componentes",
        "seoTitle":"▷ Inyección de dependencias en componentes【2020】| JS",
        "slug":"inyeccion-de-dependencias-componentes",
        "category":"typescript",
        "author": "Quique Fdez",
        "twitterAuthor": "@CKGrafico",
        "background":"https://swcrafters.fra1.cdn.digitaloceanspaces.com/Categories/TS_category.png",
        "hideEbookPromo":false,
        "hideInHome":false,
        "summaryChars":396,
        "content": fs.readFileSync("./legacyData/markdown_files/inyeccion-de-dependencias-componentes.md", {encoding: 'utf-8'}),
        "summary": "La Inyección de Dependencias es un patrón de orientación a objetos que nos ayuda a mantener el codigo desacoplado, permitiendo que este sea mas tolerante al cambio.",
        "ogImage": "https://swcrafters.fra1.cdn.digitaloceanspaces.com/Posts/inyeccion-de-dependencias-componentes/og.png"
    },
    {
        "title":"PostCSS Preset Env, el Babel de CSS",
        "seoTitle":"▷ POSTCSS: el babel de CSS【2020】| Software Crafters",
        "slug":"postcss-preset-env-babel-css",
        "category":"css",
        "author": "Joan León",
        "twitterAuthor": "@nucliweb",
        "background":"https://swcrafters.fra1.cdn.digitaloceanspaces.com/Categories/postcss_category.png",
        "hideEbookPromo":false,
        "hideInHome":false,
        "summaryChars":396,
        "content": fs.readFileSync("./legacyData/markdown_files/PostCSS-Preset-Env-Babel-CSS.md", {encoding: 'utf-8'}),
        "summary": "PostCSS Preset Env le permite convertir CSS moderno en algo que la mayoría de los navegadores pueden entender, determinando los polyfills que necesita.",
        "ogImage": "https://swcrafters.fra1.cdn.digitaloceanspaces.com/Posts/postcss-babel-css/OG_postcss-preset-env-babel-css.png"
    },
    {
        "title":"TDD (Test Driven Development). Desarrollo dirigido por pruebas",
        "seoTitle":"▷ TDD: Los fundamentos en 10 minutos【2020】",
        "slug":"tdd-test-driven-development",
        "category":"javascript",
        "author": "Miguel A. Gómez",
        "background":"https://swcrafters.fra1.cdn.digitaloceanspaces.com/Categories/JS_category.png",
        "summaryChars":396,
        "content": fs.readFileSync("./legacyData/markdown_files/tdd-test-driven-development.md", {encoding: 'utf-8'}),
        "summary": "Test Driven Development (TDD), o desarrollo dirigido por test en castellano, es una técnica de ingeniería de software para diseñar software. ",
        "ogImage": "https://swcrafters.fra1.cdn.digitaloceanspaces.com/Posts/tdd_test_driven_development/Open%20Graph%20post%20TDD.png"

    },
    {
        "title":"CSS para Crafters",
        "seoTitle":"▷ CSS Craftsmanship【2020】| Software Crafters",
        "slug":"css-craftsmanship",
        "category":"css",
        "author": "Joan León",
        "twitterAuthor": "@nucliweb",
        "background":"https://swcrafters.fra1.digitaloceanspaces.com/Categories/css_category.png",
        "hideEbookPromo":false,
        "hideInHome":false,
        "summaryChars":396,
        "content": fs.readFileSync("./legacyData/markdown_files/css-craftsmanship.md", {encoding: 'utf-8'}),
        "summary": "¡Me encanta CSS! Quien me conoce lo sabe, seguro que se notará en este artículo, y estoy orgulloso de ello. No pienso entrar en la guerra de si es un lenguaje de programación o no",
        "ogImage": "https://swcrafters.fra1.cdn.digitaloceanspaces.com/Posts/css-craftmanship/og2.png"
    },
];

const legacyPostsWithHtmlContent: LegacyPost[] = [
    {
        "title":"Union types y pattern matching con TypeScript.",
        "seoTitle":"▷ Pattern Matching en TypeScript【2020】",
        "slug": "union-types-pattern-matching-typescript",
        "category": "typescript",
        "author": "Daniel García",
        "background":"https://swcrafters.fra1.cdn.digitaloceanspaces.com/Categories/TS_category.png",
        "summaryChars" : 396,
        "content": nhm.translate(fs.readFileSync("./legacyData/union-types-pattern-matching-typescript.html", {encoding: 'utf-8'})),
        "summary":"Pattern Matching o búsqueda de patrones es típicamente usado por lenguajes de programación funcionales, veremos como aplicarlo en TypeScript. ",
        "ogImage":"https://res.cloudinary.com/software-crafters/image/upload/v1561323840/posts/union-types-pattern-matching-typescript/OG_pattern.png"
    },
    {
        "title":"Tutorial de Typescript, el javascript que escala. Introducción.",
        "seoTitle":"▷ TypeScript: Los fundamentos en 10 min【2020】",
        "slug": "typescript-tutorial-javascript-introduccion",
        "category": "typescript",
        "author": "Miguel A. Gómez",
        "background":"https://swcrafters.fra1.cdn.digitaloceanspaces.com/Categories/TS_category.png",
        "summaryChars" : 396,
        "content": nhm.translate(fs.readFileSync("./legacyData/typescript-javascript-introduccion.html", {encoding: 'utf-8'})),
        "summary":"TypeScript es un superconjunto de Javascript, es decir, amplía Javascript con una nueva sintaxis que permite llevar JavaScript a otro nivel."
    },
    {
        "title":"Tutorial de React JS. Introducción",
        "seoTitle":"▷ ReactJS: crea una webapp en 10 min【2020】",
        "slug": "tutorial-react-js-introduccion",
        "category": "react",
        "author": "Miguel A. Gómez",
        "background":"https://swcrafters.fra1.cdn.digitaloceanspaces.com/Categories/ReactJS_category.png",
        "summaryChars" : 396,
        "content": nhm.translate(fs.readFileSync("./legacyData/tutorial-react-js-introduccion.html", {encoding: 'utf-8'})),
        "summary":"¿Qué es React? ReactJS es una librería Javascript desarrollada por Facebook y diseñada para ayudarnos a crear SPA's (Single Page Application)."
    },
    {
        "title":"Principios SOLID en Python",
        "seoTitle":"▷ Principios SOLID en Python【2020】",
        "slug": "principios-solid-python",
        "category": "python",
        "author": "Miguel A. Gómez",
        "background":"https://swcrafters.fra1.cdn.digitaloceanspaces.com/Categories/Python_category.png",
        "summaryChars" : 396,
        "content": nhm.translate(fs.readFileSync("./legacyData/principios-solid-python.html", {encoding: 'utf-8'})),
        "summary":"SOLID es un acrónimo creado por Michael Feathers para los principios publicados por Robert C. Martin. Son 5 principios que nos ayudarán a escribir mejor código."

    },
    {
        "title": "El patrón MVVM en Xamarin Forms",
        "seoTitle":"▷ Xamarin Forms: el patrón MVVM【2020】",
        "slug": "patron-mvvm-xamarin-forms",
        "category": "xamarin",
        "author": "Miguel A. Gómez",
        "background": "https://swcrafters.fra1.cdn.digitaloceanspaces.com/Categories/Xamarin_category.png",
        "summaryChars" : 396,
        "content": nhm.translate(fs.readFileSync("./legacyData/patron-mvvm-xamarin-forms.html", {encoding: 'utf-8'})),
        "summary":"El patrón MVVM (Modelo Vista Vista-Modelo) nos ayuda a desacoplar lo máximo posible la interfaz de usuario de la lógica de la aplicación."
    },
    {
        "title": "Xamarin Forms, apps nativas multiplataforma. Introducción",
        "seoTitle":"▷ Xamarin Forms: cómo crear apps nativas【2020】",
        "slug": "xamarin-forms-apps-nativas-introduccion",
        "category": "xamarin",
        "author": "Miguel A. Gómez",
        "background": "https://swcrafters.fra1.cdn.digitaloceanspaces.com/Categories/Xamarin_category.png",
        "summaryChars" : 396,
        "content": nhm.translate(fs.readFileSync("./legacyData/xamarin-forms-apps-nativas-introduccion.html", {encoding: 'utf-8'})),
        "summary":"Xamarin nos ofrece un enfoque multiplataforma diferente, ya que nos facilita la tarea de desarrollar cualquier tipo de aplicación de forma nativa."
    },
    {
        "title":"Tutorial de Python. Los fundamentos en 10 minutos",
        "seoTitle":"▷ Python: Los fundamentos en 10 minutos【2020】",
        "slug": "tutorial-de-python-introduccion",
        "category": "python",
        "author": "Miguel A. Gómez",
        "background":"https://swcrafters.fra1.cdn.digitaloceanspaces.com/Categories/Python_category.png",
        "summaryChars" : 396,
        "content": nhm.translate(fs.readFileSync("./legacyData/tutorial-de-python-introduccion.html", {encoding: 'utf-8'})),
        "summary":"Python un lenguaje multiparadigma, que soporta orientación a objetos, programación imperativa y, en menor medida, programación funcional."

    },
    {
        "title":"Servidor de desarrollo Django con Vagrant y Ansible",
        "seoTitle":"▷ Django: Servidor con Vagrant y Ansible【2020】",
        "slug": "servidor-desarrollo-vagrant-ansible",
        "category": "devops",
        "author": "Miguel A. Gómez",
        "background": "https://res.cloudinary.com/software-crafters/image/upload/v1544894788/posts/servidor-desarrollo-vagrant-ansible/django-vagrant.png",
        "summaryChars" : 396,
        "content": nhm.translate(fs.readFileSync("./legacyData/servidor-desarrollo-vagrant-ansible.html", {encoding: 'utf-8'}))
    },
    {
        "title":"Cluster de servidores con Docker Swarm en Digital Ocean",
        "seoTitle":"▷ Docker Swarm: crea un clúster en 10 min【2020】",
        "slug": "cluster-docker-swarm-digital-ocean",
        "category": "devops",
        "author": "Miguel A. Gómez",
        "background": "https://res.cloudinary.com/software-crafters/image/upload/v1545047302/posts/cluster-docker-swarm-digital-ocean/docker-swarm-d.png",
        "summaryChars" : 396,
        "content": nhm.translate(fs.readFileSync("./legacyData/cluster-docker-swarm-digital-ocean.html", {encoding: 'utf-8'}))
    },
    {
        "title":"Testing de modelos en Django, buenas prácticas",
        "seoTitle":"▷ Django: Testing de modelos【2020】",
        "slug": "testing-modelos",
        "category": "django",
        "author": "Miguel A. Gómez",
        "background": "https://res.cloudinary.com/software-crafters/image/upload/v1545388156/posts/testing-modelos-django/django-testing-1.png",
        "summaryChars" : 396,
        "content": nhm.translate(fs.readFileSync("./legacyData/testing-modelos.html", {encoding: 'utf-8'}))
    },
    {
        "title":"Configurar un servidor HTTPS con Nginx",
        "seoTitle":"▷ NGINX: configura un servidor HTTPS【2020】",
        "slug": "configurar-servidor-https-nginx",
        "category": "devops",
        "author": "Miguel A. Gómez",
        "background": "https://res.cloudinary.com/software-crafters/image/upload/v1545389672/posts/configurar-servidor-https-nginx/nginx-ssl.png",
        "summaryChars" : 396,
        "content": nhm.translate(fs.readFileSync("./legacyData/configurar-servidor-https-nginx.html", {encoding: 'utf-8'})),
        "summary":"¿Cómo configurar un HTTPS con NGINX? En esta guía expondré los pasos necesarios para crear y configurar un certificado SSL Nginx."
}]

export const legacyPosts: LegacyPost[] = [...legacyPostsWithMarkdownContent, ...legacyPostsWithHtmlContent];
