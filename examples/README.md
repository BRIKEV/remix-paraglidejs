## Remix Paraglide Examples

This repository contains various examples demonstrating the usage and configuration of remix-paraglide.

Below, we outline the steps to set up a basic environment with Remix and ParaglideJS.

### Remix basic setup

To begin, we'll install Remix using the `create vite` command:

```bash
npm create vite@latest
```

When prompted, provide a project name, select the React framework, and choose the Remix variant:

```yml
✔ Project name: … remix-paraglidejs-example
✔ Select a framework: › React
✔ Select a variant: › Remix ↗
```

After answering additional questions, you'll have a basic Remix app resembling the one in the `remix-paraglidejs-example` folder.

### ParaglideJS

Within your app folder, initialize ParaglideJS using the following command:

```bash
npx @inlang/paraglide-js@latest init
```

You have to answer this when it asks you about the stack.

```
Which tech stack are you using? Vite
```

This sets up ParaglideJS with a folder named `project.inlang` and a file named `project.inlang/settings.json`. In this `settings.json` file, you can specify the languages you need. For instance, let's include Spanish (ES).

```json
{
  "$schema": "https://inlang.com/schema/project-settings",
  "sourceLanguageTag": "en",
  "languageTags": [
    "en",
    "es"
  ],
  "modules": [
    "https://cdn.jsdelivr.net/npm/@inlang/message-lint-rule-empty-pattern@latest/dist/index.js",
    "https://cdn.jsdelivr.net/npm/@inlang/message-lint-rule-identical-pattern@latest/dist/index.js",
    "https://cdn.jsdelivr.net/npm/@inlang/message-lint-rule-missing-translation@latest/dist/index.js",
    "https://cdn.jsdelivr.net/npm/@inlang/message-lint-rule-without-source@latest/dist/index.js",
    "https://cdn.jsdelivr.net/npm/@inlang/message-lint-rule-valid-js-identifier@latest/dist/index.js",
    "https://cdn.jsdelivr.net/npm/@inlang/plugin-message-format@latest/dist/index.js",
    "https://cdn.jsdelivr.net/npm/@inlang/plugin-m-function-matcher@latest/dist/index.js"
  ],
  "plugin.inlang.messageFormat": {
    "pathPattern": "./messages/{languageTag}.json"
  }
}
```

After this, create a new folder named `messages` since it's the name specified in our `settings.json`.

Following the README guide, you'll need to modify three files: `vite.config.ts`, `entry.client.tsx`, and `entry.server.tsx`. Once these modifications are complete, your app will be ready to use ParaglideJS.

Feel free to explore the `remix-paraglidejs-example` for a detailed implementation.
