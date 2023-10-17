import { Hono, Context } from 'hono'
import { handleRequestWithNetacea } from './handler.ts'

const honoApp = new Hono()

// c.event is of type FetchEventLike which doesn't quite match FetchEvent
honoApp.get('/', (c: Context) => handleRequestWithNetacea({
  request: c.req.raw
} as any as FetchEvent))

honoApp.post('/AtaVerifyCaptcha', (c: Context) => handleRequestWithNetacea({
  request: c.req.raw
} as any as FetchEvent))

export default honoApp
