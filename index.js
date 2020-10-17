const linksArray = [
    { "name": "Cloudflare", "url": "https://www.cloudflare.com/" },
    { "name": "Google", "url": "https://www.google.com/" },
    { "name": "Mozilla", "url": "https://www.mozilla.org/" }
]

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
    if (request.url.substring(request.url.lastIndexOf('/')) == "/links") {
        return new Response(JSON.stringify(linksArray), {
            headers: { 'content-type': 'application/json' },
        });
    }
    return getStaticPage();
}

async function getStaticPage() {
    let staticPage = await fetch('https://static-links-page.signalnerve.workers.dev')
        .then((response) => {
            if (response.status == 200) {
                return response;
            } else new Response('Something went wrong!', { status: 500 });
        })

    return staticPage;
}