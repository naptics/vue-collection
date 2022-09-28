# Vue Collection

Vue Collection is a collection of styled and fully functional Vue components which can easily be integrated into our projects.

## Showroom 🎆

You can take a look at all components on [Gitlab Pages](https://naptx.gitlab.io/libraries/vue-collection/).

## Integrate Vue Collection into a new project 🔨

1. Create a new vue-project with `npm init vue@latest`. Add at least typescript, jsx, vue-router, eslint and prettier.
2. Remove boilerplate code.
3. Follow the instructions to [install tailwind](https://tailwindcss.com/docs/installation/using-postcss).
    - `npm install -D tailwindcss postcss autoprefixer`
    - `npx tailwindcss init`
    - ... follow the further instructions
    - When creating the App.css add contents of this repo's `App.css`
4. Add tailwind forms with `npm install -D @tailwindcss/forms`
5. Copy the tailwind configuration `tailwind.config.js` to your project.
6. Add other dependencies with `npm install @headlessui/vue @heroicons/vue vue-i18n awesome-phonenumber @popperjs/core`
7. Copy files from `.vscode` to your project. Remove `.vscode/settings.json` file from `.gitignore`. Copy `.prettierrc` to your project.
8. Make sure typescript config is correct. Double check with this repo.
9. Copy the contents of `src/components/base` (without the tests), `src/i18n` and `src/utils/vue-collection` to your project.
10. Create your `App.tsx` file (you probably deleted earlier) and add a router view to the app. Link the `App.css` to it. Then you're ready to add a `HomeView` and link it to the router. Make sure to always use the `createView` and `createComponent` functions defined in the `src/utils/vue` file.
11. Close your project and reopen it again. Now all weird warnings should go away.
12. You're ready to go: Run your app with `npm run dev`.
13. Don't forget to configure primary, secondary and default color in `tailwind.config.js`. Also choose which classes are white-listed.
