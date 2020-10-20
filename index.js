import { HandleRequest } from './handler'
import Router from './router'

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    const r = new Router()

    // links path
    r.get('.*/links', request => new HandleRequest().linksHandler(request))

    //any other path
    r.get('.*/*', request => new HandleRequest().htmlTransformer(request))


    const resp = await r.route(request)
    return resp
}
