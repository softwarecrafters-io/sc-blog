import fs from 'fs';
import path from 'path';
import {remark} from 'remark';
import htmlHtml from 'remark-html';
import {Newsletter} from "@/app/components/client/newsletter/newsletter";

export default async function Legal() {
    const data = await getMarkdown();
    return (
        <>
            <div dangerouslySetInnerHTML={{ __html: data }} />
            <Newsletter/>
        </>
    );
}

async function getMarkdown() {
    const legalTerms = fs.readFileSync(path.join('./src/app/legal', 'legal.md')).toString();
    const legalTermsHtml = await remark().use(htmlHtml).process(legalTerms);

    return legalTermsHtml.toString();
}
