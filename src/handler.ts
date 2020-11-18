import Cloudflare, {CloudflareConstructorArgs} from '@netacea/cloudflare'
import * as NetaceaConfig from './NetaceaConfig.json'
const worker = new Cloudflare(NetaceaConfig as CloudflareConstructorArgs)

export async function handleRequestWithNetacea(
  event: FetchEvent
): Promise<Response> {
  const response = await worker.run(event, originRequest)
  event.waitUntil(worker.ingest(event.request, response))
  return response
}

async function originRequest(request: Request): Promise<Response> {
  // Implement custom pre-fetch logic here
  const response = await fetch(request)
  // Implement custom post-fetch logic here
  return response
}
