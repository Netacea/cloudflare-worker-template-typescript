import proxyquire from 'proxyquire'
import tape from 'tape'

tape('Request handled', async (tap: tape.Test) => {
  const { handleRequestWithNetacea } = proxyquire('../src/handler', {
    '@netacea/cloudflare': function () {
      return {
        run: () => ({
          response: new Response()
        }),
        ingest: (): void => {
          // noop
        }
      }
    }
  })

  const methods = [
    'GET',
    'HEAD',
    'POST',
    'PUT',
    'DELETE',
    'OPTIONS',
    'PATCH'
  ]
  for (const method of methods) {
    tap.test(`${method} - Handled`, async (t: tape.Test) => {
      let waitUntilCalledTimes = 0
      const result = await handleRequestWithNetacea({
        request: new Request('https://example.com', {method}),
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
