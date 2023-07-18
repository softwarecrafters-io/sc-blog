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
                    width: 800,
                    height: 600,
                },
                {
                    url: imageUrl,
                    width: 1800,
                    height: 1600,
                },
            ],
            locale: 'es_ES',
            type: 'website',
        },
    }
}
