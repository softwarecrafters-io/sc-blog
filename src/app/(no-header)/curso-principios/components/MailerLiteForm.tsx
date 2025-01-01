'use client';
import styles from './MailerLiteForm.module.css';
import {useEffect, useState} from 'react';


export const MailerLiteForm = () => {
    useEffect(() => {
        initializeMailerLite();
    }, );

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Acceso inmediato a la primera lección</h2>
            <div className={styles.form}>
                <div className="ml-form-embed"
                     data-account="1590228:z5v5a4e9e4"
                     data-form="6072582:q7o8v0">
                </div>
            </div>
        </div>
    );
}



/**
 * Inicializa MailerLite Universal de forma equivalente al snippet original.
 */
export function initializeMailerLite() {
    (function (
        m: Window,
        a: Document,
        tagName: string,
        srcUrl: string,
        globalVar: string
    ) {
        // Asigna el nombre del objeto global
        m.MailerLiteObject = globalVar;

        // Definimos una función f con un "this" dinámico
        function f(this: any) {
            const c = { a: arguments, q: [] as unknown[] };
            const result = this.push(c);
            return typeof result !== 'number' ? result : f.bind(c.q);
        }

        // Aseguramos que f tenga la propiedad q
        (f as any).q = (f as any).q || [];

        // "me" es un alias para forzar la asignación dinámica de propiedad
        const me = m as any;
        me[globalVar] = me[globalVar] || f.bind((f as any).q);
        me[globalVar].q = me[globalVar].q || (f as any).q;

        // Creamos el elemento <script>
        const scriptEl = a.createElement(tagName) as HTMLScriptElement;
        const firstScript = a.getElementsByTagName(tagName)[0];

        scriptEl.async = true;
        scriptEl.src = srcUrl + '?v' + ~~(new Date().getTime() / 1000000);

        // Insertamos el <script> en el DOM
        firstScript?.parentNode?.insertBefore(scriptEl, firstScript);
    })(window, document, 'script', 'https://static.mailerlite.com/js/universal.js', 'ml');

    // Llamada posterior a la inyección del script
    window.ml?.('accounts', '1590228', 'z5v5a4e9e4', 'load');
}
