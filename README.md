# Netacea Cloudflare Worker Template
![Netacea Header](https://assets.ntcacdn.net/header.jpg)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

A simple Cloudflare worker with Netacea built in.

## 💡 Getting Started

This template is meant to be used with [Wrangler](https://developers.cloudflare.com/workers/wrangler/). If you are not already familiar with the tool, we recommend that you install the tool and configure it to work with your [Cloudflare account](https://dash.cloudflare.com).

Node version `16.13.0` or later and npm version `9` or later is required.

To generate using Wrangler, run this command:

```bash
wrangler generate netacea-cloudflare-worker https://github.com/netacea/cloudflare-worker-template-typescript
```

Ensure the `@netacea/cloudflare` package is up to date by running:
```bash
npm i @netacea/cloudflare@latest
```
- Ensure you are [logged into Wrangler](https://developers.cloudflare.com/workers/wrangler/commands/#login).
- Insert your wrangler credentials into the `wrangler.toml` file in the root directory (you only need to change `account_id`, `route`, and `compatibility_date` - the rest is okay).

## ⚠️ Configuration

Configuration of the integration can be performed in the `NetaceaConfig.json` file, in the `./src` directory.
Here you can find several parameters which need to be properly configured:

  - `apiKey` - the API key for your domain. Provided by Netacea. Used to communicate with the Mitigation and Ingest APIs.
  - `secretKey` - the Secret key for your domain. Provided by Netacea. Used to check the authenticity of cookies.
  - `mitigationType` - either "INGEST" or "MITIGATE" to disable / enable mitigation, respectively.
  - `cookieEncryptionKey` - used to encrypt cookie data. Can be provided by either the customer, or Netacea.
  - `netaceaCookieName` - name of the mitigation cookie. Can be provided by either the customer, or Netacea. As a security best practice, the name of this cookie should not reveal its purpose.
  - `netaceaCaptchaCookieName` - name of the captcha cookie. Can be provided by either the customer, or Netacea. Similarly to `netaceaCookieName`, this cookie should be named as to not reveal its purpose.
  - `enableDynamicCaptchaContentType` - either `true` or `false`. When set to `true`, the `Content-Type` header returned from Mitigation Service will be set according to the `Accept` header. Supported `Accept` header values are `text/html`, and `application/json`. If another value is provided, `Content-Type` will default to `text/html`. Setting this to `false` will result in the `Content-Type` header being always set as `text/html`.
  - `timeout` (optional) - the number of milliseconds to wait for a response from the Mitigation API before proceeding to the origin website. Default 3000ms.

## 💻 Development
If you need to extend or enhance the functionality of the Cloudflare Worker, the documentation can be found [here](https://developers.cloudflare.com/workers/).
Code extensions should be made in `./src/handler.ts`
Please ensure that `worker.run(event, originRequest)` and `event.waitUntil(worker.ingest(event.request, response))` are called.

## ✔ Testing
- `npm run test` - This will run a set of simple method tests against the worker (see `./tests/handler.test.ts`)
- `npm run dev` - alias for `wrangler dev` - [documentation](https://developers.cloudflare.com/workers/wrangler/commands/#dev).
- `npm run dev:local` - alias for `wrangler dev --local` - live preview of your code in a cloudflare sandbox - accessible from only your machine.

## ☁ Publishing
`npm run publish` is your friend. This will publish to your Cloudflare distribution

## ❗ Issues
If you run into issues with this specific project, please feel free to file an issue [here](https://github.com/Netacea/cloudflare-worker-template-typescript/issues). If the problem is with Wrangler, please file an issue [here](https://github.com/cloudflare/workers-sdk/tree/main/packages/wrangler).