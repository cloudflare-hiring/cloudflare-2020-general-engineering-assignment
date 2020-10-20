import { Links } from '../links'

export class LinksTransformer extends Links {
    constructor() {
        super()
    }
    element(e) {
        // loop for adding lniks in the link div
        for (const link of this.links) {
            e.append(`<a href=${link.url}>${link.name}</a>`, { html: true })
        }
    }
}