# Remix-paraglidejs

[![CI](https://github.com/BRIKEV/remix-paraglidejs/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/BRIKEV/remix-paraglidejs/actions/workflows/ci.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/c87cad92a1de39d294bb/maintainability)](https://codeclimate.com/github/BRIKEV/remix-paraglidejs/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/c87cad92a1de39d294bb/test_coverage)](https://codeclimate.com/github/BRIKEV/remix-paraglidejs/test_coverage)

Translate your Remix apps with [ParaglideJS](https://inlang.com/m/gerre34r/library-inlang-paraglideJs).

This dependency includes utilities that will help you set up your Remix app to use ParaglideJS.

## Installation

Assuming you have a Remix app using Vite and have already set up Paraglide, follow these steps:

1. Install the required packages:

```bash
npm i --save remix-paraglidejs @inlang/paraglide-js-adapter-vite
```

2. Modify vite.config.ts.

```ts
import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
/* --- INCLUDE THIS --- */
import { paraglide } from "@inlang/paraglide-js-adapter-vite";
/* ----------------- */

installGlobals();

export default defineConfig({
  plugins: [
    remix(),
    tsconfigPaths(),
    /* --- INCLUDE THIS --- */
    paraglide({
      project: "./project.inlang", //Path to your inlang project 
      outdir: "./paraglide", //Where you want the generated files to be placed
    }),
    /* ----------------- */
  ],
});
```

3. Now we need to modify the Remix entry files [entry.client.tsx](https://remix.run/docs/en/main/file-conventions/entry.client) and [entry.server.tsx](https://remix.run/docs/en/main/file-conventions/entry.server). If you don't see these files, use `npx remix reveal`.

```tsx
// entry.client.tsx
import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
/* --- INCLUDE THIS --- */
import { hydrateLang } from 'remix-paraglidejs/client';
import { availableLanguageTags, setLanguageTag } from "<YOUR_PARAGLIDE_DIR>/runtime";
/* ----------------- */

startTransition(() => {
  /* --- INCLUDE THIS --- */
  const lang = hydrateLang('language-tag', availableLanguageTags);
  setLanguageTag(lang);
  /* ----------------- */
  hydrateRoot(
    document,
    <StrictMode>
      <RemixBrowser />
    </StrictMode>
  );
});
```

```tsx
// entry.server.tsx
import { PassThrough } from "node:stream";

import type { AppLoadContext, EntryContext } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import {
  createReadableStreamFromReadable,
/* --- INCLUDE THIS --- */
  createCookie,
} from "@remix-run/node";
import { setLangServerCookie, getContextLang } from 'remix-paraglidejs/server';
import { setLanguageTag, availableLanguageTags } from "<YOUR_PARAGLIDE_DIR>/runtime";

// language-tag value the same as the one in the entry.client.tsx
export const setLangCookie = createCookie("language-tag", {});
/* ----------------- */

const ABORT_DELAY = 5_000;

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  return isbot(request.headers.get("user-agent") || "")
    ? handleBotRequest(
        request,
        responseStatusCode,
        responseHeaders,
        remixContext
      )
    : handleBrowserRequest(
        request,
        responseStatusCode,
        responseHeaders,
        remixContext
      );
}

function handleBotRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      <RemixServer
        context={remixContext}
        url={request.url}
        abortDelay={ABORT_DELAY}
      />,
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set("Content-Type", "text/html");

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            })
          );

          pipe(body);
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        },
      }
    );

    setTimeout(abort, ABORT_DELAY);
  });
}

function handleBrowserRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    /* --- INCLUDE THIS --- */
    const lang = getContextLang(remixContext, {
      defaultValue: availableLanguageTags[0],
      availableLanguages: availableLanguageTags,
      // The URL parameter to look for when determining the language
      // for example ($lang)._index.tsx
      urlParam: 'lang',
    });
    setLanguageTag(lang);
    /* ----------------- */
    const { pipe, abort } = renderToPipeableStream(
      <RemixServer
        context={remixContext}
        url={request.url}
        abortDelay={ABORT_DELAY}
      />,
      {
        async onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set("Content-Type", "text/html");
          /* --- INCLUDE THIS --- */
          await setLangServerCookie(lang, responseHeaders, setLangCookie);
          /* ----------------- */

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            })
          );

          pipe(body);
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        },
      }
    );

    setTimeout(abort, ABORT_DELAY);
  });
}
```

**Remix route usage**

Once you have these files modified you can include your route for example the `_index.tsx` as `($lang)._index.tsx`, and use Paraglide.

```tsx
import { Link } from '@remix-run/react';
import * as m from '<YOUR_PARAGLIDE_DIR>/messages';

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>{m.title()}</h1>
      <p>{m.description()}</p>
      <ul>
        <li>
          <Link
            to="/en"
            reloadDocument
          >
            EN
          </Link>
        </li>
        <li>
          <Link
            to="/es"
            reloadDocument
          >
            ES
          </Link>
        </li>
      </ul>
    </div>
  );
}
```

Check out our [examples](https://github.com/BRIKEV/remix-paraglidejs/tree/main/examples) to review how to use links without reloadDocument or a page without the `($lang)`.

*Recommendation:* Install [Sherlock extension](https://marketplace.visualstudio.com/items?itemName=inlang.vs-code-extension).
