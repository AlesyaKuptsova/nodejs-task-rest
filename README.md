# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm test
```

To run only one of all test suites (users, boards or tasks)

```
npm test <suite name>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization (users, boards or tasks)

```
npm run test:auth <suite name>
```

## Development

If you're using VSCode, you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

## JSDoc
if you want to create a documentation page based on JSDoc descriptions

```
npm run doc
```
### Docker
`.env` file contains the configuration.
If you want to start the application using docker:

```
docker-compose up # or docker compose up
```
## Load testing(boards)
### Express
|                    |              |
|--------------------|--------------|
| Scenarios launched | 640          |
| Scenarios completed| 640          |
| Requests completed | 15360        |
| Mean response/sec  | 191.83       |
| Response time (msec):             |
|   min:             | 5            |
|   max:             | 438          |
|   median:          | **18**       |
|   p95:             | **64**       |
|   p99:             | **117.9**    |
| Scenario counts    | 640 (100%)   |
| Codes:                            |
|   200:             | 14720        |
|   201:             | 640          |

### Fastify
|                    |              |
|--------------------|--------------|
| Scenarios launched | 640          |
| Scenarios completed| 640          |
| Requests completed | 15360        |
| Mean response/sec  | 191.86       |
| Response time (msec):             |
|   min:             | 5            |
|   max:             | 476          |
|   median:          | **17**       |
|   p95:             | **55**       |
|   p99:             | **94**       |
| Scenario counts    | 640 (100%)   |
| Codes:                            |
|   200:             | 14720        |
|   201:             | 640          |