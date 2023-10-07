import * as headers from './modules/headers.js';
import * as footers from './modules/footers.js';
import * as principal from './modules/principal.js';

export function Load(){
const body = document.querySelector('body');
    body.innerHTML = '';

    const article = document.createElement('article');
    article.classList.add('modalspinner');

    const div = document.createElement('div');
    div.classList.add('spinner');

    article.appendChild(div);

    body.appendChild(article);
    body.appendChild(document.createElement('main'));

    headers.LoadAnyHeader();
    principal.LoadPrincipal();
    footers.LoadFooter();
}

Load();