'use client';
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import { oneDark, oneLight} from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";
import {Post} from "@/core/models";
import {useEffect, useState} from "react";
import {Theme} from "@/app/components/client/theme/themeSwicher";
import {ClientFactory} from "@/factories/clientFactory";

export const MarkdownBlock = ({post}:{post:Post}) => {
    const [codeStyle, setCodeStyle] = useState(oneLight);
    const themeStore = ClientFactory.getThemeStore();
    useEffect(() => {
        themeStore.getThemeSubject().subscribe((theme:Theme) => {
            if(theme === 'dark'){
                setCodeStyle(oneDark);
            }else{
                setCodeStyle(oneLight);
            }
        })
    }, []);

    return <ReactMarkdown
        components={{
            code({node, inline, className, children, ...props}) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                    <SyntaxHighlighter{...props} style={codeStyle} language={'typescript'}
                                      customStyle={{maxWidth: '700px'}}>
                        {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                ) : (
                    <code {...props} className={className}>
                        {children}
                    </code>
                )
            }
        }}>
        {post.markdownBody}
    </ReactMarkdown>

}
