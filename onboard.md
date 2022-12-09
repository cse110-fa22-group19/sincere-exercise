# Onboarding The Repo of Sincere Exercise

*Note*: There are two repos in this [organization](https://github.com/cse110-fa22-group19)
1. [cse110-fa22-group19](https://github.com/cse110-fa22-group19/cse110-fa22-group19) - Repo containing our meetings, ADRs, team logs, etc.
2. [sincere-exercise](https://github.com/cse110-fa22-group19/sincere-exercise) - Repo containing the app itself.


### Setting up the project to run

1. `npm i` to install all dev dependencies
2. Run a live server from the root of this repository

### Project Workflow

1. Checkout to a new branch (naming practice in ADRs)
2. Make changes
3. `git commit ...` changes
   1. This will trigger E2E tests, linting, and code styling.
   2. _If E2E test fail on the main branch, consider:_
    - Confirming the URL in the test files with your root link on live server
    - Installing packages
    - Running `npm test` to run all tests, including unit tests
4. `git push` changes
5. On GitHub, make PR if completed work, requesting reviewers and linking the issue
6. Actions run, running lint & unit tests, and generating documentation after tests pass
7. Code is merged

### Repo Structure

#### App

The directory that stores all app content
- core: contains CRUD functions with localStorage
- main: contains all components - View & Controllers
- shared: contains components shared throughout entire app

#### Assets

The directory that stores all static media content

#### Docs

The directory that stores documentation of our code

[Link to documentation](https://cse110-fa22-group19.github.io/sincere-exercise/docs/)

#### Test files

- `__tests__` - the directory that contains unit tests and e2e tests
- `setup` - the directory that contains the mock localStorage for unit tests

#### Config files & directories

- `.github` - contains all Github action files
- `.husky` - contains a pre-commit hook script
- `.eslintrc.js` - the ESLint config file
- `.prettierrc.json` - the Prettier config file
- `babel.config.js` - the babel config file
- `jest-puppeteer.confic.cjs` - the Jest Puppeteer config file
- `jsdoc.json` - the JSDoc config file

