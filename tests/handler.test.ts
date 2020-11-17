import makeServiceWorkerEnv from 'service-worker-mock'
import { handleRequestWithNetacea } from '../src/handler'
import tape from 'tape'
// Doesn't expose a type!
const fetch = require('service-worker-mock/fetch')
declare var global: any
Object.assign(global, makeServiceWorkerEnv())
global.fetch = fetch

tape('Request handled', async (tap: tape.Test) => {
  const methods = [
    'GET',
    'HEAD',
    'POST',
    'PUT',
    'DELETE',
    'CONNECT',
    'OPTIONS',
    'TRACE',
    'PATCH',
  ]
  for (const method of methods) {
    tap.test(`${method} - Handled`, async (t: tape.Test) => {
      let waitUntilCalledTimes = 0
      // @ts-ignore
      const result = await handleRequestWithNetacea({
        request: new Request('/', { method }),
        waitUntil: async (promiseResult:Promise<any>) => {
          waitUntilCalledTimes++
          await promiseResult
        }
      })
      try {
        await result.text()
        t.equals(waitUntilCalledTimes, 1, 'Expects waitUntil to be called once')
      } catch (err) {
        t.fail(`Erorr thrown from worker - ${err.message}`)
      }
    })
  }
})