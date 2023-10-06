import {OpenRegistrarse} from './headers.js';
import {OpenModalButton, OpenModalError, OpenModalErrorReload} from './modal.js';
import * as main from './../main.js'

export function LoadLogin(){
    document.title = 'Iniciar sesion';

    const article = document.createElement('article')
    article.classList.add('article-form');
    article.classList.add('login-article');
    

    const form = document.createElement('form');
    form.addEventListener('submit', (e) => e.preventDefault());


    const h1 = document.createElement('h1');
    h1.innerHTML = 'Iniciar sesion';

    const label1 = document.createElement('label');
    label1.htmlFor = 'email';

    const input1 = document.createElement('input');
    input1.type = 'text';
    input1.name = 'email';
    input1.placeholder = 'Correo electronico';

    label1.appendChild(input1);

    const label2 = document.createElement('label');
    label2.htmlFor = 'password';

    const input2 = document.createElement('input');
    input2.type = 'password';
    input2.name = 'password';
    input2.placeholder = 'Contraseña';

    label2.appendChild(input2);

    const a = document.createElement('a');
    a.setAttribute('href', '');
    a.setAttribute('draggable', 'false');
    a.classList.add('button-form');
    a.innerHTML = 'Iniciar Sesion';
    a.addEventListener('click', (e) => LogIn(e));

    const p = document.createElement('p');
    p.innerHTML = '¿No tienes cuenta? ';

    const a1 = document.createElement('a');
    a1.setAttribute('href', '');
    a1.setAttribute('draggable', 'false');
    a1.classList.add('link-form');
    a1.innerHTML = 'Crea una';

    a1.addEventListener('click', (e) => {
        e.preventDefault();
        OpenRegistrarse();
    });  

    p.appendChild(a1);

    form.appendChild(h1);
    form.appendChild(label1);
    form.appendChild(label2);
    form.appendChild(a);
    form.appendChild(p);

    article.appendChild(form);

    const main = document.querySelector('main');
    main.appendChild(article);
}

async function LogInAPI(email, pass) {
    const response = await fetch('https://graco-api.onrender.com/login', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'email': email, 'password': pass})
    });


    if (response.status >= 500 && response.status <= 599) {
        OpenModalErrorReload(`Error con el servidor\n${response.status}`)
        return;
    }


    const data = await response.json();
    	
    if (data['success']) {
        return data['data']['token'];
    } else {
        OpenModalError(data['message']);
        return null;
    }
}

async function LogIn(e){
    e.preventDefault();
    const form = document.querySelector('form');
    const data = new FormData(form);

    const email = data.get('email');
    const pass = data.get('password');

    if (!email || !pass) {
        OpenModalError('Llenar campos requeridos.');
        return;
    }

    if (!ValidateEmail(email)){
        OpenModalError('Formato de email inválido.');
        return;
    }
    
    const token = await LogInAPI(email, pass);

    if(token != null){
        form.reset();
        localStorage.setItem('jwt', token);
        OpenModalButton('Iniciaste sesion correctamente', main.Load);
    }

    /*
    if (token == undefined){
        return;
    }*/
}

function ValidateEmail(email){
    return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}
