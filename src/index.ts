import { handleRequest } from './handler'

addEventListener('fetch', (event:any) => {
  event.respondWith(handleRequest(event.request))
})

