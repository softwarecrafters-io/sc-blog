export function generateStaticMetadata({title, description, url, imageUrl}:{title:string, description:string, url:string, imageUrl:string}){
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
                    width: 600,
                    height: 600,
                }
            ],
            locale: 'es_ES',
            type: 'website',
        },
    }
}
