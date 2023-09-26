import makeServiceWorkerEnv from 'service-worker-mock'
import proxyquire from 'proxyquire'
import tape from 'tape'
// Doesn't expose a type!
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fetch = require('service-worker-mock/fetch')
declare let global: any
Object.assign(global, makeServiceWorkerEnv())
global.fetch = fetch

tape('Request handled', async (tap: tape.Test) => {
  /**
   * Use proxyquire to delay evaluation of '../src/handler' until now,
   * so that it will use the globally stubs declared at start of file.
   */
  const { handleRequestWithNetacea } = proxyquire('../src/handler', {})

  const methods = [
    'GET',
    'HEAD',
    'POST',
    'PUT',
    'DELETE',
    'CONNECT',
    'OPTIONS',
    'TRACE',
    'PATCH'
  ]
  for (const method of methods) {
    tap.test(`${method} - Handled`, async (t: tape.Test) => {
      let waitUntilCalledTimes = 0
      const result = await handleRequestWithNetacea({
        request: new Request('/', {method}),
        waitUntil: async (promiseResult: Promise<any>) => {
          waitUntilCalledTimes++
          await promiseResult
        }
      })
      try {
        await result.text()
        t.equals(waitUntilCalledTimes, 1, 'Expects waitUntil to be called once')
      } catch (error: unknown) {
        const _err = error as Error
        t.fail(`Erorr thrown from worker - ${_err.message}`)
      }
    })
  }
})
