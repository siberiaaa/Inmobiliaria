import * as headers from './modules/headers.js';
import * as footers from './modules/footers.js';
import * as principal from './modules/principal.js';

export function Load(){
const body = document.querySelector('body');
    body.innerHTML = '';
    body.appendChild(document.createElement('main'));

    headers.LoadAnyHeader();
    principal.LoadPrincipal();
    footers.LoadFooter();
}

Load();