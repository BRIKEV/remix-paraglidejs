import { Link } from '@remix-run/react';
import * as m from '../../paraglide/messages';

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>{m.title()}</h1>
      <p>{m.description()}</p>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor, delectus beatae? Nesciunt voluptatum totam eius beatae accusantium? Illo, qui amet quam delectus aut sed eveniet, harum doloremque, voluptatibus quaerat quia!</p>
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
