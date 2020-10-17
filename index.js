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

class LinkTransformer {
    constructor(links) {
        this.links = links;
    }

    async element(element) {
        if (element) {
            let text = '\n';
            this.links.forEach((link) => {
                text += '<a href="';
                text += link.url;
                text += '">';
                text += link.name;
                text += '</a>\n'
            })
            element.setInnerContent(text, { html: true });
        }
    }
}

class ProfileTransformer {
    async element(element) {
        if (element) {
            if (element.tagName === "div") {
                element.removeAttribute("style");
            } else if (element.tagName === "img") {
                element.setAttribute("src", "https://avatars0.githubusercontent.com/u/34393703?s=460&u=37af9117851ee4eaf8afdd7b642648a60edb4831&v=4");
            } if (element.tagName === "h1") {
                element.setInnerContent("Yaswanth Bellam");
            }
        }
    }
}

const linkTransformer = new HTMLRewriter().on('div#links', new LinkTransformer(linksArray));

const profileTransformer = new HTMLRewriter().on('div#profile', new ProfileTransformer(linksArray));
const profileImageTransformer = new HTMLRewriter().on('img#avatar', new ProfileTransformer());
const profileNameTransformer = new HTMLRewriter().on('h1#name', new ProfileTransformer());

async function getStaticPage() {
    let staticPage = await fetch('https://static-links-page.signalnerve.workers.dev')
        .then((response) => {
            if (response.status == 200) {
                return response;
            } else new Response('Something went wrong!', { status: 500 });
        })

    staticPage = linkTransformer.transform(staticPage);

    staticPage = profileTransformer.transform(staticPage);
    staticPage = profileImageTransformer.transform(staticPage);
    staticPage = profileNameTransformer.transform(staticPage);

    return staticPage;
}