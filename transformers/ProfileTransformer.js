export class ProfileTransformer {
    constructor(attributeName) {
        this.attributeName = attributeName
    }
    element(e) {
        // removing display:none prop
        if (this.attributeName === "style") {
            e.removeAttribute(this.attributeName)
        }

        // adding profile image
        if (this.attributeName === "src") {
            e.setAttribute(this.attributeName, "https://i.stack.imgur.com/WmvM0.png") // stock profile image
        }

        // adding name in h1 tag
        if (this.attributeName === "name") {
            e.setInnerContent("Jay Chitalia")
        }
    }
}
