# ⬆ Netacea Cloudflare v5 to v6 Upgrade Guide

This template has been updated to support the **v6** release of `@netacea/cloudflare`.
This version introduces changes to the interface,
requiring updates to how the module is integrated within the cloudflare handler.

This guide walks you through the required changes and best practices when using v6.

You can install v6 using `npm install --save @netacea/cloudflare@6`

## 📦 What's New in v6?

The `run` method now returns a result object with a `response` property, rather than returning a `Response` directly.
This change allows for greater extensibility in the result metadata.

### Old Usage (v5)

```ts
const response = await worker.run(event, originRequest)
event.waitUntil(worker.ingest(event.request, response))
return response
```

### New Usage (v6)

```ts
const result = await worker.run(event, originRequest)
event.waitUntil(worker.ingest(event.request, result))
return result.response
```

---

## 🔧 Code Changes

### Updated Handler

Once updated, your handler should look something like:

```ts
import { Cloudflare } from '@netacea/cloudflare'

const worker = new Cloudflare(NetaceaConfig)

export async function handleRequestWithNetacea(event: FetchEvent): Promise<Response> {
  const result = await worker.run(event, originRequest)
  event.waitUntil(worker.ingest(event.request, result))
  return result.response
}

async function originRequest(request: Request): Promise<Response> {
  // Your origin logic here
}
```

### Updated Tests

The `run` method must now return an object with a `response` property in your mocks:

```ts
const { handleRequestWithNetacea } = proxyquire('../src/handler', {
  '@netacea/cloudflare': function () {
    return {
      run: () => ({
        response: new Response()
      }),
      ingest: () => {
        // no-op
      }
    }
  }
})
```

Also, ensure your test requests include a fully qualified URL
(e.g., `https://example.com`) to avoid errors when constructing `Request` objects.

---

## ✅ Summary of Required Changes

| Area        | Change                                           |
|-------------|--------------------------------------------------|
| `run()` usage | Use `result.response` instead of `response`     |
| `ingest()`    | Pass the full `result` to `ingest()`            |
| Tests       | Update mocks to return `{ response: Response }` |
