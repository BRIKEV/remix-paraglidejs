import * as m from '../../paraglide/messages';

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>{m.title()}</h1>
      <p>{m.description()}</p>
      <ul>
        <li>
          <a
            href="/en"
          >
            EN
          </a>
        </li>
        <li>
          <a
            href="/es"
          >
            ES
          </a>
        </li>
      </ul>
    </div>
  );
}
