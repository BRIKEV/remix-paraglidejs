
## Remix basic setup

This dependency relies on Remix vite installation.

```
npm create vite@latest
```

Once you run that command create a new project name, select React framework and Remix variant.

```
✔ Project name: … remix-paraglidejs-example
✔ Select a framework: › React
✔ Select a variant: › Remix ↗
```

After a few more question that you will have a basic Remix app.

### Development

Run the Vite dev server:

```shellscript
npm run dev
```

### Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## ParaglideJS

Initialize paraglide-js whith:

```
npx @inlang/paraglide-js@latest init
```

You have to answer this when it asks you about the stack.

```
Which tech stack are you using? Vite
```

Now you have the ParaglideJS setup.

Once you have this you can check out our [README](https://github.com/BRIKEV/remix-paraglidejs) with the steps you need to follow to use paraglideJS.

