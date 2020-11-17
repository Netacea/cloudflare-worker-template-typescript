import { handleRequestWithNetacea } from './handler'
addEventListener('fetch', (event: FetchEvent) => {
  return event.respondWith(handleRequestWithNetacea(event))
})
