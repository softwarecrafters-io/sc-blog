export function generateStaticMetadata({title, description, url, imageUrl, noIndex}:{title:string, description:string, url:string, imageUrl:string, noIndex?:boolean}){
    return {
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
            url: url,
            siteName: title,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                }
            ],
            locale: 'es_ES',
            type: 'website',
        },
        robots: noIndex ? 'noindex' : 'index',
    }
}
