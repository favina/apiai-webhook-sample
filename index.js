const app = new ApiAiApp({request: request, response: response});
const WELCOME_INTENT = 'input.welcome';
const NUMBER_INTENT = 'input.number';

function welcomeIntent (app) {
    app.ask('Welcome to action snippets! Say a number.');
}

function numberIntent (app) {
    const number = app.getArgument(NUMBER_ARGUMENT);
    app.tell('You said ' + number);
}

const actionMap = new Map();
actionMap.set(WELCOME_INTENT, welcomeIntent);
actionMap.set(NUMBER_INTENT, numberIntent);
app.handleRequest(actionMap);