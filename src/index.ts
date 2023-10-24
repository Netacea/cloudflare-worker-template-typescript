import { Hono, Context } from 'hono'
import { handleRequestWithNetacea } from './handler.ts'

const honoApp = new Hono()

async function handleHonoRequest (c: Context): Promise<Response> {
  const response = handleRequestWithNetacea({
    request: c.req.raw,
    waitUntil: c.executionCtx.waitUntil.bind(c.executionCtx)
  } as any as FetchEvent)
  c.executionCtx.waitUntil(Promise.resolve())
  return response
}

// c.event is of type FetchEventLike which doesn't quite match FetchEvent
honoApp.get('/', handleHonoRequest)
honoApp.post('/AtaVerifyCaptcha', handleHonoRequest)

export default honoApp
