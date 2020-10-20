//svgs for the social links
import { svg as reddit } from 'simple-icons/icons/reddit'
import { svg as linkedin } from 'simple-icons/icons/linkedin'
import { svg as github } from 'simple-icons/icons/github'
import { Links } from '../links'

export class SocialTransformer extends Links {
    constructor(attributeName) {
        super()
        this.attributeName = attributeName
    }
    element(e) {
        if (this.attributeName === "style") {
            e.removeAttribute(this.attributeName)
            const iconArray = [reddit, linkedin, github]

            // loop for adding links with svgs in the social div
            for (let i = 0; i < iconArray.length; i++) {
                const element = iconArray[i];
                e.append(`<a href=${this.links[i].url}>${element}${this.links[i].name}</a>`, { html: true })   
            }
        }
        // changing title of the page
        if (this.attributeName === "title") {
            e.setInnerContent("Jay Chitalia")
        }

        // changing background-color of the page
        if(this.attributeName === "body") {
            e.setAttribute("class", "bg-indigo-500")
        }

    }
}