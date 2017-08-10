const app = new ApiAiApp({ request, response });
const WELCOME_INTENT = 'input.welcome';
const SIGN_IN = 'sign.in';

function welcomeIntent (app) {
    app.askForSignIn();
}

function signIn (app) {
    if (app.getSignInStatus() === app.SignInStatus.OK) {
        let accessToken = app.getUser().accessToken;
        app.ask('Great, thanks for signing in!');
    } else {
        app.ask('I won\'t be able to save your data, but let\'s continue!');
    }
}

const actionMap = new Map();
actionMap.set(WELCOME_INTENT, welcomeIntent);
actionMap.set(SIGN_IN, signIn);
app.handleRequest(actionMap);