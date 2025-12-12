# W3C Accessibility Maturity Model Assessment Tool# Svelte + TS + Vite



A single-page application to help organizations assess their accessibility maturity across 7 dimensions based on the [W3C Accessibility Maturity Model](https://www.w3.org/TR/maturity-model/).This template should help get you started developing with Svelte and TypeScript in Vite.



## 🚀 Quick Start## Recommended IDE Setup



```bash[VS Code](https://code.visualstudio.com/) + [Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode).

npm install --legacy-peer-deps

npm run dev## Need an official Svelte framework?

```

Check out [SvelteKit](https://github.com/sveltejs/kit#readme), which is also powered by Vite. Deploy anywhere with its serverless-first approach and adapt to various platforms, with out of the box support for TypeScript, SCSS, and Less, and easily-added support for mdsvex, GraphQL, PostCSS, Tailwind CSS, and more.

Visit http://localhost:5173

## Technical considerations

## 📦 Deploying to GitHub Pages

**Why use this over SvelteKit?**

### Step 1: Build the Project

- It brings its own routing solution which might not be preferable for some users.

```bash- It is first and foremost a framework that just happens to use Vite under the hood, not a Vite app.

npm run build

```This template contains as little as possible to get started with Vite + TypeScript + Svelte, while taking into account the developer experience with regards to HMR and intellisense. It demonstrates capabilities on par with the other `create-vite` templates and is a good starting point for beginners dipping their toes into a Vite + Svelte project.



This creates a `dist/` folder with optimized static files.Should you later need the extended capabilities and extensibility provided by SvelteKit, the template has been structured similarly to SvelteKit so that it is easy to migrate.



### Step 2: Enable GitHub Pages**Why `global.d.ts` instead of `compilerOptions.types` inside `jsconfig.json` or `tsconfig.json`?**



1. Go to your repository on GitHubSetting `compilerOptions.types` shuts out all other types not explicitly listed in the configuration. Using triple-slash references keeps the default TypeScript setting of accepting type information from the entire workspace, while also adding `svelte` and `vite/client` type information.

2. Click **Settings** → **Pages**

3. Under "Build and deployment", select **GitHub Actions** as the source**Why include `.vscode/extensions.json`?**



### Step 3: Push to GitHubOther templates indirectly recommend extensions via the README, but this file allows VS Code to prompt the user to install the recommended extension upon opening the project.



```bash**Why enable `allowJs` in the TS template?**

git add .

git commit -m "Deploy to GitHub Pages"While `allowJs: false` would indeed prevent the use of `.js` files in the project, it does not prevent the use of JavaScript syntax in `.svelte` files. In addition, it would force `checkJs: false`, bringing the worst of both worlds: not being able to guarantee the entire codebase is TypeScript, and also having worse typechecking for the existing JavaScript. In addition, there are valid use cases in which a mixed codebase may be relevant.

git push origin main

```**Why is HMR not preserving my local component state?**



The GitHub Action will automatically build and deploy your site!HMR state preservation comes with a number of gotchas! It has been disabled by default in both `svelte-hmr` and `@sveltejs/vite-plugin-svelte` due to its often surprising behavior. You can read the details [here](https://github.com/rixo/svelte-hmr#svelte-hmr).



### Step 4: Access Your SiteIf you have state that's important to retain within a component, consider creating an external store which would not be replaced by HMR.



Once deployed (check the Actions tab), visit:```ts

```// store.ts

https://mgifford.github.io/w3c-a11y-maturity-model/// An extremely simple external store

```import { writable } from 'svelte/store'

export default writable(0)

**Note**: Change the repo name in `vite.config.ts` if you rename the repository:```

```typescript
base: '/your-repo-name/',
```

## ✨ Features

- 7 Dimensions Assessment with 120+ proof points
- 4 Maturity Levels (Inactive, Launch, Integrate, Optimize)
- Visual analytics with radar charts and progress tracking
- Auto-save to localStorage
- Export/Import JSON data
- **WCAG 2.2 AA Compliant** - fully accessible
- 15+ automated tests

## 🧪 Testing

```bash
npm test           # Run tests
npm run test:ui    # Run with UI
```

## 📖 Documentation

- [WCAG_COMPLIANCE.md](./WCAG_COMPLIANCE.md) - Accessibility compliance details
- [ACCESSIBILITY_FIXES.md](./ACCESSIBILITY_FIXES.md) - Accessibility audit results

## 🛠️ Tech Stack

- Svelte 4.2.0
- Vite 7.2.2
- TypeScript
- Vitest + Testing Library


## AI Disclosure

Yes. AI was used in creating this tool. There be dragons! 


