import * as headers from './modules/headers.js';
import * as footers from './modules/footers.js';
import * as login from './modules/login.js';
import * as signup from './modules/signup.js';
import * as profile from './modules/profile.js'

headers.LoadHeaderLogged();
/*
login.LoadLogin();
signup.LoadSignup();
*/
profile.LoadProfile();

footers.LoadFooter();


