import { Link, useLoaderData } from '@remix-run/react';
import * as m from '../../paraglide/messages';

export default function Index() {
  // It is necesary to reload the component when the language changes
  useLoaderData();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>{m.title()}</h1>
      <p>{m.description()}</p>
      <ul>
        <li>
          <Link
            to="/en/ssr-links"
          >
            EN
          </Link>
        </li>
        <li>
          <Link
            to="/es/ssr-links"
          >
            ES
          </Link>
        </li>
      </ul>
    </div>
  );
}
