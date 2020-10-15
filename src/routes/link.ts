interface linkObject{
    name:string,
    url:string
}
const links=[
    {
    "name"  : "LinkedIn profile",
    "url"   : "https://www.linkedin.com/in/wkhanh-le/"
    },
    {
        "name"  : "LinkedIn profile",
        "url"   : "https://www.linkedin.com/in/wkhanh-le/"
    },
    {
        "name"  : "LinkedIn profile",
        "url"   : "https://www.linkedin.com/in/wkhanh-le/"
    }
];

const linkHandler = (request: Request): Response =>{
    const init = {
        headers: { 'content-type': 'application/json'}
    };
    const body = JSON.stringify(links);
    return new Response(body,init);
}

export default linkHandler;