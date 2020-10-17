//@author Mark Volkov

/**
 * Respond with link json object
 */

function getLinks() {
  return[
    {
      "name": "Cloudflare",
      "url": "https://www.cloudflare.com/" 
    },
    {
      "name": "Google",
      "url": "https://www.google.com/" 
    },
    {
      "name": "Netflix",
      "url": "https://www.netflix.com/" 
    },
    {
      "name": "Hulu",
      "url": "https://www.Hulu.com/" 
    }
  ]
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  route = request.url.split(".")
  route = route[route.length - 1].split("/")[1]
  if (request.method != "GET") {
    return encodeError("Incorrect request type, this route only handles 'GET' requests.", 400)
  }
  if (route === "links") {
    return new Response(JSON.stringify(getLinks()), {
      headers: { 'content-type': 'application/json' },
      status: 200
    })
    } else {
      const response = await fetch("https://static-links-page.signalnerve.workers.dev")
      const AVATAR_URL = "https://avatars0.githubusercontent.com/u/19876503?s=460&u=482878f40568186df1326850576b021620398bd9&v=4"
      return new HTMLRewriter().on("div#links", new LinksTransformer(getLinks()))
                                  .on("div#profile", new AttributeTransformer("style", null)).on("img#avatar", new AttributeAppender("src", AVATAR_URL))
                                    .on("h1#name",  new ElementAppender("Mark Volkov", false, false)).on("div#social", new AttributeTransformer("style", null))
                                      .on("div#social", new ElementAppender("<a href=https://github.com/markvolkov><img src=\"https://simpleicons.org/icons/github.svg\"" + "/></a>", true, false))
                                        .on("body", new AttributeAppender("style", "background-color: #4C51BF;")).on("title", new ElementAppender("<title>Mark Volkov</title>", true, true)).transform(response)
    }
  }
  
function encodeError(error, statusCode) {
  let errorResponse = {
    "error": error,
  }
  return new Response(JSON.stringify(errorResponse), {
    headers: { 'content-type': 'application/json' },
    status: statusCode
  })
}

class LinksTransformer {

  constructor(links) {
    this.links = links;
  }

  async element(element) {
    this.links.forEach(link => element.append("<a href=" + link.url + ">" + link.name + "</a>", { html: true }))
  }

}

class AttributeTransformer {

  constructor(target, attr) {
    this.target = target;
    this.attr = attr;
  }

  async element(element) {
    if (this.attr == null) {
      element.removeAttribute(this.target)
    } else {
      element.setAttribute(this.target, this.attr)
    }
  }

}

class AttributeAppender {

  constructor(target, attrAppendix) {
    this.target = target;
    this.attrAppendix = attrAppendix;
  }

  async element(element) {
    if (element.hasAttribute(this.target)) {
      element.setAttribute(this.target, element.getAttribute(this.target) + this.attrAppendix)
    } else {
      element.setAttribute(this.target, this.attrAppendix)
    }
  }

}


class ElementAppender {

  constructor(appendix, isHtml, replace) {
    this.appendix = appendix;
    this.isHtml = isHtml;
    this.replace = replace;
  }
  
  async element(element) {
    if (this.replace) {
      element.replace(this.appendix, { html: this.isHtml })
    } else {
      element.append(this.appendix, { html: this.isHtml })
    }
   
  }

}


