import Cloudflare from '@netacea/cloudflare'

const worker = new Cloudflare()

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
