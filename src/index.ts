import {handleRequestWithNetacea} from './handler'

addEventListener('fetch', event => {
  const fetchEvent = event as FetchEvent
  return fetchEvent.respondWith(handleRequestWithNetacea(fetchEvent))
})
