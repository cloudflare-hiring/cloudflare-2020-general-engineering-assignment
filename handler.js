import { Links } from './links'
import { LinksTransformer } from './transformers/LinkTransformer'
import { ProfileTransformer } from './transformers/ProfileTransformer'
import { SocialTransformer } from './transformers/SocialTransformer'

export class HandleRequest {

    linksHandler(request) {

        // setting correct content header
        const init = {
            headers: { 'content-type': 'application/json' },
        }
        const body = JSON.stringify(new Links())
        return new Response(body, init)
    }

    async htmlTransformer(request) {
        
        // setting correct content header
        const init = {
            headers: { 'content-type': 'text/html' },
        }

        const url = "https://static-links-page.signalnerve.workers.dev"
        const rewriter = new HTMLRewriter()
            .on("div#links", new LinksTransformer())
            .on("div#profile", new ProfileTransformer('style'))
            .on("img#avatar", new ProfileTransformer('src'))
            .on("h1#name", new ProfileTransformer('name'))
            .on("div#social", new SocialTransformer('style'))
            .on("title", new SocialTransformer('title'))
            .on("body", new SocialTransformer('body'))
    
        return rewriter.transform(await fetch(url, init))
    }
    
}  