const app = new ApiAiApp({ request, response });
const WELCOME_INTENT = 'input.welcome';
const DATETIME = 'datetime';

function welcomeIntent (app) {
    app.askForDateTime('When do you want to come in?',
        'Which date works best for you?',
        'What time of day works best for you?');
}

function datetime (app) {
    app.tell({speech: 'Great see you at your appointment!',
        displayText: 'Great, we will see you on '
        + app.getDateTime().date.month
        + '/' + app.getDateTime().date.day
        + ' at ' + app.getDateTime().time.hours
        + (app.getDateTime().time.minutes || '')});
}

const actionMap = new Map();
actionMap.set(WELCOME_INTENT, welcomeIntent);
actionMap.set(DATETIME, datetime);
app.handleRequest(actionMap);







