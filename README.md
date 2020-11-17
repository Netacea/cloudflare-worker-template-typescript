# Netacea Cloudflare Worker Template
![Netacea Header](./header.jpg)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

A simple Cloudflare worker with Netacea built in.

## 💡 Getting Started

This template is meant to be used with [Wrangler](https://github.com/cloudflare/wrangler). If you are not already familiar with the tool, we recommend that you install the tool and configure it to work with your [Cloudflare account](https://dash.cloudflare.com). Documentation can be found [here](https://developers.cloudflare.com/workers/tooling/wrangler/).

To generate using Wrangler, run this command:

```bash
wrangler generate netacea-cloudflare-worker https://github.com/netacea/cloudflare-worker-template-typescript
```

Ensure the `@netacea/cloudflare` package is up to date by running:
```bash
npm i @netacea/cloudflare@latest
```

Insert your Netacea API and Secret key into `./src/NetaceaConfig.json`. Ensure you are [logged into wrangler](https://github.com/cloudflare/wrangler#-login). Insert your wrangler credentials into the `wrangler.toml` file in the root directory (you only need to change `account_id`, `route` and `zone_id` - the rest is okay).


## 💻 Developing
If you need to extend or enhance the functionality of the Cloudflare Worker, the documentation can be found [here](https://developers.cloudflare.com/workers/).
Code extensions should be made in `./src/handler.ts`
Please ensure that `worker.run(event, originRequest)` and `event.waitUntil(worker.ingest(event.request, response))` are called.

## ✔ Testing
- `npm run test` - This will run a set of simple method tests against the worker (see `./tests/handler.test.ts`)
- `npm run dev-cf` - alias for `wrangler dev` - [documentation](https://github.com/cloudflare/wrangler#-dev).
- `npm run watch-cf` - alias for `wrangler preview --watch` - live preview of your code in a cloudflare sandbox - accessible from only your machine.

## ☁ Publishing
`npm run publish-cf` is your friend. This will publish to your cloudflare distribution

## 🤢 Issues
If you run into issues with this specific project, please feel free to file an issue [here](https://github.com/Netacea/cloudflare-worker-template-typescript/issues). If the problem is with Wrangler, please file an issue [here](https://github.com/cloudflare/wrangler/issues).