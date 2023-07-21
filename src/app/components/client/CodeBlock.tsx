'use client';
// @ts-ignore
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
// @ts-ignore
import { oneDark, oneLight} from "react-syntax-highlighter/dist/esm/styles/prism";
import {Post} from "@/core/models";
import {ReactNode, useEffect, useState} from "react";
import {Theme} from "@/app/components/client/theme/themeSwicher";
import {ClientFactory} from "@/infrastructure/factories/clientFactory";


export const CodeBlock = ({children, post}:{children:ReactNode, post:Post}) => {
    const themeStore = ClientFactory.getThemeStore();
    const [codeStyle, setCodeStyle] = useState(oneDark);
    useEffect(() => {
        const storedTheme = window.localStorage.getItem('theme') as Theme;
        const defaultTheme = storedTheme || 'dark';
        setCodeStyle(defaultTheme === 'dark' ? oneDark : oneLight);
        themeStore.getThemeSubject().subscribe((theme:Theme) => {
            theme === 'dark' ? setCodeStyle(oneDark): setCodeStyle(oneLight)
        })
    }, []);

    return <SyntaxHighlighter style={codeStyle} language={'typescript'}  customStyle={{maxWidth: '80vw', overflowX: 'scroll'}}>
        {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
}
