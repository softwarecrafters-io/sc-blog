type Mailer = {
    email: string;
}

export function addSubscriber(email:string, apiKey: string):Promise<Mailer>{
    const groupId = '111862219'
    const headers = {
        accept: 'application/json',
        'X-MailerLite-ApiDocs': 'true',
        'content-type': 'application/json',
        'X-MailerLite-ApiKey': apiKey
    } as any;
    const fields = {marketing_permissions: 'acepto'}
    const body = JSON.stringify({email, resubscribe: false, type: 'confirmed', fields});
    const method = 'POST';
    const url = `https://api.mailerlite.com/api/v2/groups/${groupId}/subscribers`;
    return fetch(url, {method, headers, body}).then(res => res.json())
}
