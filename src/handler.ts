import Router from './routes';
import linkHandler from './routes/link';
export async function handleRequest(request: Request): Promise<Response> {
  const r = new Router();
  r.get('./link', (request: Request)=>linkHandler(request));
  return new Response(`request method: ${request.method}`)
}
