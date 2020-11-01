let LinkArr=[{ "name": "Linkedin", "url": "https://www.linkedin.com/in/bilal-shaikh-293235170/" },{ "name": "Github", "url": "https://github.com/BilalShakh" },{ "name": "Twitter", "url": "https://twitter.com" }];
let url="https://static-links-page.signalnerve.workers.dev";

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */

/**
 * gatherResponse awaits and returns a response body as a string.
 * Use await gatherResponse(..) in an async function to get the response body
 * @param {Response} response
 */

async function gatherResponse(response) {
  const { headers } = response
  const contentType = headers.get("content-type") || ""
  if (contentType.includes("application/json")) {
    return JSON.stringify(await response.json())
  }
  else if (contentType.includes("application/text")) {
    return await response.text()
  }
  else if (contentType.includes("text/html")) {
    return await response.text()
  }
  else {
    return await response.text()
  }
}

//Edits the div link container
class LinksTransformer {
  constructor(links) {
    this.links = links
  }
  
  async element(element) {
    // Your code
    element.setInnerContent(`<a href="${LinkArr[0].url}" target="_blank">${LinkArr[0].name}</a>
    <a href="${LinkArr[1].url}" target="_blank">${LinkArr[1].name}</a>
    <a href="${LinkArr[2].url}" target="_blank">${LinkArr[2].name}</a>`, 
    {html: true},
    );
  }
}

//Edits the profile container(allows the display of its children)
class profileTransformer {
  constructor(profile) {
    this.profile = profile
  }
  
  async element(element) {
		element.removeAttribute("style");
  }
}

//Edits the img container(Adds my image in the profile section)
class imgTransformer {
  constructor(img) {
    this.img = img
  }
  
  async element(element) {
		element.setAttribute("src","https://avatars2.githubusercontent.com/u/48187140?s=460&u=38c44660138c8d6c0436392b94d3a6dcaa59c79a&v=4");
  }
}

//Edits the name container(Adds my name in the text section of profile)
class nameTransformer {
  constructor(name) {
    this.name = name
  }
  
  async element(element) {
		element.setInnerContent("Bilal Shaikh");
  }
}

//Edits the name container(Adds my name in the text section of profile)
class backgroundTransformer {
  constructor(background) {
    this.background = background
  }
  
  async element(element) {
		element.setAttribute("class","bg-gray-400");
  }
}

//Edits the name container(Adds my name in the text section of profile)
class socialTransformer {
  constructor(name) {
    this.name = name
  }
  
  async element(element) {
    element.setAttribute("style","display: flex");
    element.setInnerContent(`<a href="${LinkArr[0].url}" target="_blank"><svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><image href="https://simpleicons.org/icons/linkedin.svg"/></svg></a>
    <a href="${LinkArr[1].url}" target="_blank"><svg  viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><image href="https://simpleicons.org/icons/github.svg"/></svg></a>
    <a href="${LinkArr[2].url}" target="_blank"><svg  viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><image href="https://simpleicons.org/icons/twitter.svg"/></svg></a>`, 
    {html: true},
    );
  }
}

//Handles all the requests to the server
async function handleRequest(request) {
  if(request.url.includes("links")){
    return new Response(JSON.stringify(LinkArr,null,2), {
      headers: { 'content-type': 'application/json;charset=UTF-8' },
    })
  }else{
    const init = {
      headers: {
        "content-type": "text/html;charset=UTF-8",
      },
    }
    var response = await fetch(url, init)
    response = new HTMLRewriter().on("div#links", new LinksTransformer()).transform(response);
    response = new HTMLRewriter().on("div#profile", new profileTransformer()).transform(response);
    response = new HTMLRewriter().on("img#avatar", new imgTransformer()).transform(response);
    response = new HTMLRewriter().on("h1#name", new nameTransformer()).transform(response);
    response = new HTMLRewriter().on("div#social", new socialTransformer()).transform(response);
    response = new HTMLRewriter().on("body", new backgroundTransformer()).transform(response);
    const results = await gatherResponse(response)
    return new Response(results, init)
  }
}
