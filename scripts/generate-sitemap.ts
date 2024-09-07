const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://softwarecrafters.io'; // Reemplaza con tu URL
interface SitemapEntry {
    url: string;
    lastmod: string;
    changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority: number;
}

// Rutas con prioridades
const routes: [string, number][] = [
    ['/', 1.0],
    ['/about', 0.9],
    ['/opiniones', 0.9],
    ['/cursos', 0.8],
    ['/blog', 0.8],
    ['/legal', 0.5],
    ['/blockchain/merkle-trees-typescript-tdd', 0.8],
    ['/react/arquitectura-hexagonal-frontend', 0.8],
    ['/javascript/introduccion-programacion-funcional-javascript', 0.8],
    ['/javascript/clean-code-javascript', 0.8],
    ['/typescript/patrones-diseno-creacionales-estructurales', 0.7],
    ['/devops/docker-nodejs-buenas-practicas', 0.7],
    ['/react/tdd-react-typescript', 0.7],
    ['/typescript/introduccion-typescript-react', 0.7],
    ['/typescript/patrones-diseno-comportamiento-ui', 0.7],
    ['/vuejs/aumenta-productividad-vuex-typescript', 0.7],
    ['/react/testing-frontend', 0.7],
    ['/typescript/inyeccion-de-dependencias-componentes', 0.7],
    ['/css/postcss-preset-env-babel-css', 0.7],
    ['/javascript/tdd-test-driven-development', 0.7],
    ['/css/css-craftsmanship', 0.7],
    ['/javascript/introduccion-programacion-reactiva-rxjs', 0.7],
    ['/typescript/union-types-pattern-matching-typescript', 0.7],
    ['/typescript/typescript-tutorial-javascript-introduccion', 0.7],
    ['/react/tutorial-react-js-introduccion', 0.7],
    ['/python/principios-solid-python', 0.7],
    ['/xamarin/patron-mvvm-xamarin-forms', 0.7],
    ['/xamarin/xamarin-forms-apps-nativas-introduccion', 0.7],
    ['/python/tutorial-de-python-introduccion', 0.7],
    ['/configurar-servidor-https-nginx', 0.7],
    ['/historias/el-error-del-billon-de-dolares-de-tony-hoare', 0.6],
    ['/historias/john-von-neumann-un-computador-humano', 0.6],
    ['/sesgos/wysiati-software', 0.6],
    ['/historias/cisne-negro-codigo', 0.6],
    ['/testing/dejemos-de-picar-codigo', 0.7],
    ['/historias/programar-rapido-programar-despacio', 0.6],
    ['/refactoring/code-smells-hay-algo-en-ese-codigo-que-me-huele-mal', 0.7],
    ['/historias/codigo-bueno-feo-y-malo', 0.6],
    ['/historias/el-programador-unabomber', 0.6],
    ['/testing/cobertura-de-tests-el-efecto-cobra', 0.7],
    ['/javascript/brendan-eich-creo-javascript-10-dias', 0.7],
    ['/ia/la-ia-esta-cambiando-las-reglas-del-juego', 0.7],
    ['/historias/property-based-testing-la-ley-de-los-pequenos-numeros', 0.6],
    ['/historias/developers-sin-los-pies-en-la-tierra', 0.6],
    ['/historias/la-pregunta-del-millon', 0.6],
    ['/historias/el-programador-chofer', 0.6],
    ['/git/git-tips-notas-sobre-el-control-de-versiones', 0.7],
];

function formatSitemapEntry(entry: SitemapEntry): string {
    return `
    <url>
      <loc>${entry.url}</loc>
      <lastmod>${entry.lastmod}</lastmod>
      <changefreq>${entry.changefreq}</changefreq>
      <priority>${entry.priority.toFixed(1)}</priority>
    </url>
  `;
}

function generateSitemap(): void {
    const sitemapEntries: SitemapEntry[] = routes.map(([route, priority]) => ({
        url: `${SITE_URL}${route}`,
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: priority
    }));

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemapEntries.map(formatSitemapEntry).join('')}
    </urlset>
  `;

    // Escribe el sitemap en el directorio public
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir);
    }
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);

    console.log('Sitemap generado con éxito.');
}

generateSitemap();
