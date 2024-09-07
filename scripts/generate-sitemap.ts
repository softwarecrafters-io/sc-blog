const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://softwarecrafters.io'; // Reemplaza con tu URL
interface SitemapEntry {
    url: string;
    lastmod: string;
    changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority: number;
}

// Rutas hardcodeadas
const routes: string[] = [
    '/',
    '/about',
    '/opiniones',
    '/cursos',
    '/blog',
    '/legal',
    '/react/arquitectura-hexagonal-frontend',
    '/javascript/introduccion-programacion-funcional-javascript',
    '/blockchain/merkle-trees-typescript-tdd',
    '/historias/el-error-del-billon-de-dolares-de-tony-hoare',
    '/historias/john-von-neumann-un-computador-humano',
    '/sesgos/wysiati-software',
    '/historias/cisne-negro-codigo',
    '/testing/dejemos-de-picar-codigo',
    '/testing/dejemos-de-picar-codigo',
    '/historias/programar-rapido-programar-despacio',
    '/refactoring/code-smells-hay-algo-en-ese-codigo-que-me-huele-mal',
    '/historias/codigo-bueno-feo-y-malo',
    '/historias/el-programador-unabomber',
    '/testing/cobertura-de-tests-el-efecto-cobra',
    '/javascript/brendan-eich-creo-javascript-10-dias',
    '/ia/la-ia-esta-cambiando-las-reglas-del-juego',
    '/historias/property-based-testing-la-ley-de-los-pequenos-numeros',
    '/historias/developers-sin-los-pies-en-la-tierra',
    '/historias/la-pregunta-del-millon',
    '/historias/el-programador-chofer',
    '/git/git-tips-notas-sobre-el-control-de-versiones',

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
    const sitemapEntries: SitemapEntry[] = routes.map(route => ({
        url: `${SITE_URL}${route}`,
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: 0.7
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
