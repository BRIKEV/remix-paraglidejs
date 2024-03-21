import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useParams,
} from "@remix-run/react";
import { setLanguageTag, availableLanguageTags } from "../paraglide/runtime";


export function Layout({ children }: { children: React.ReactNode }) {
  const data = useParams();
  const findLang = availableLanguageTags.find((lang) => lang === data.lang);
  setLanguageTag(findLang ?? 'en');
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
