## Forked from [wesbos](https://github.com/wesbos/eslint-config-wesbos)

## Local / Per Project Install
1. Run below code
```
npx install-peerdeps --dev eslint-config-prettier-react
```

2. You can see in your package.json there are now a big list of devDependencies.

3. Create a `.eslintrc` file in the root of your project's directory (it should live where package.json does). Your `.eslintrc` file should look like this:

```json
{
  "extends": [
    "prettier-react"
  ]
}
```
4. ⚠️⚠️⚠️ Delete `eslintConfig` in the package.json
   
Tip: You can alternatively put this object in your `package.json` under the property `"eslintConfig":`. This makes one less file in your project.

1. You can add two scripts to your package.json to lint and/or fix:

```json
"scripts": {
  "lint": "eslint .",
  "lint:fix": "eslint . --fix"
},
```

## Global Install

1. First install everything needed:

```
npx install-peerdeps --global eslint-config-prettier-react
```

2. Then you need to make a global `.eslintrc` file:

ESLint will look for one in your home directory

* `~/.eslintrc` for mac
* `C:\Users\username\.eslintrc` for windows

In your `.eslintrc` file, it should look like this:

```json
{
  "extends": [
    "prettier-react"
  ]
}
```

3. To use from the CLI, you can now run `eslint .` or configure your editor as we show next.

## With VS Code

  ```js
  "editor.formatOnSave": true,
  "[javascript]": {
    "editor.formatOnSave": false
  },
  "[javascriptreact]": {
    "editor.formatOnSave": false
  },
  "eslint.autoFixOnSave": true,
  "prettier.disableLanguages": ["javascript", "javascriptreact"],
  ```

## With Create React App

1. You gotta eject first `npm run eject` or `yarn eject`
1. run `npx install-peerdeps --dev eslint-config-prettier-react`
1. Crack open your `package.json` and replace `"extends": "react-app"` with `"extends": "prettier-react"`

