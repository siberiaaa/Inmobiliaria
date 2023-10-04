import * as headers from './modules/headers.js';
import * as footers from './modules/footers.js';
import * as principal from './modules/principal.js';


headers.LoadHeaderNoLogged();
principal.LoadPrincipal();
footers.LoadFooter();
