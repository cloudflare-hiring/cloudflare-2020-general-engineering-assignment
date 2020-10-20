addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

const LINKS = [
  { "name": "Salman's LinkedIn", "url": "https://www.linkedin.com/in/salmanfakhri/" },
  { "name": "Salman's Github", "url": "https://github.com/Salamander1012" },
  { "name": "Resume", "url": "https://drive.google.com/file/d/1wdvkkPuOC4E49eC871cQ1poOuYoOVGdV/view?usp=sharing" }
]

const SOCIALS = [
  { 'name': 'spotify', 'url': 'https://open.spotify.com/user/saldude1012?si=x8w58XQRSWK7fYBHrXf1kw', 'svg': 'https://cdnjs.cloudflare.com/ajax/libs/simple-icons/3.12.0/spotify.svg'},
  { 'name': 'linkedin', 'url': 'https://www.linkedin.com/in/salmanfakhri/', 'svg': 'https://cdnjs.cloudflare.com/ajax/libs/simple-icons/3.12.0/linkedin.svg'},
  { 'name': 'github', 'url': 'https://github.com/Salamander1012', 'svg': 'https://cdnjs.cloudflare.com/ajax/libs/simple-icons/3.12.0/github.svg'}
]

const TEMPLATE_URL = "https://static-links-page.signalnerve.workers.dev"

const AVATAR_SRC = 'https://scontent-ort2-2.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/62269364_357864154871369_5398838332881324654_n.jpg?_nc_ht=scontent-ort2-2.cdninstagram.com&_nc_cat=105&_nc_ohc=8qYz3Zbt-P4AX_-yMpv&_nc_tp=15&oh=a1a8a380fddab6f2d1b5575c79e31ce8&oe=5FB6298A'

/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  const url = new URL(request.url)
  
  if (url.pathname == "/links" || url.pathname == "/links/") {
    const json = JSON.stringify(LINKS, null, 2)
    return new Response(json, {
      headers: { "content-type": "application/json;charset=UTF-8" },
    })
  }

  const init = {
    headers: {
      "content-type": "text/html;charset=UTF-8",
    },
  }
  const html_template = await fetch(TEMPLATE_URL, init)
  return rewriter.transform(html_template)
}

class BackgroundTransformer {   
  async element(element) {
      const gradientStyle = 'background-image: linear-gradient(#4C51BF, #7F9CF5);'
      element.setAttribute('style', gradientStyle)
  }
}

class TextTransformer {   
  constructor(content) {
    this.content = content
  }

  async element(element) {
      element.setInnerContent(this.content)
  }
}

class ProfileTransformer {   
  async element(element) {
      element.removeAttribute('style')
  }
}

class ImageTransformer {   
  constructor(src) {
    this.src = src
  }

  async element(element) {
      element.setAttribute('src', this.src)
  }
}

class LinksTransformer {
  constructor(links) {
      this.links = links
  }

  async element(element) {
      for (let link of this.links) {
          element.append(this.generateLinkTag(link), { html: true })
      }
  }

  generateLinkTag(link) {
      let tag = "<a href=\"" + link.url + "\">" + link.name + "</a>"
      return tag
  }
}

class SocialLinksTransformer { 
  constructor(links) {
    this.links = links
  }
  
  async element(element) {
      element.removeAttribute("style")
      for (let socialLink of this.links) {
        element.append(this.generateSocialLinkTag(socialLink), { html: true })
      }
  }

  generateSocialLinkTag(link) {
    let tag = "<a href=\"" + link.url + "\">" + "<img src=\"" + link.svg + "\"/>" + "</a>"
    return tag
  }
}

const rewriter = new HTMLRewriter()
  .on("title", new TextTransformer('Salman Fakhri'))
  .on("body", new BackgroundTransformer())
  .on("div#profile", new ProfileTransformer())
  .on("div#profile img#avatar", new ImageTransformer(AVATAR_SRC))
  .on("div#profile h1#name", new TextTransformer('Salman Fakhri'))
  .on("div#links", new LinksTransformer(LINKS))
  .on("div#social", new SocialLinksTransformer(SOCIALS))