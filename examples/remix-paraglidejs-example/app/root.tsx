import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { useParamsLang } from 'remix-paraglidejs/client';
import { setLanguageTag, availableLanguageTags, sourceLanguageTag } from "../paraglide/runtime";

export function Layout({ children }: { children: React.ReactNode }) {
  const lang = useParamsLang('lang', availableLanguageTags, sourceLanguageTag);
  setLanguageTag(lang);
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
