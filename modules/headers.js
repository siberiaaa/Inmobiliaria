import * as login from './login.js';
import * as signup from './signup.js';
import * as profile from './profile.js';
import * as properties from './properties.js';
import * as principal from './principal.js';
import * as modal from './modal.js';
import * as main from './../main.js'

export function LoadAnyHeader(){
    if(localStorage.getItem('jwt') == null){
        LoadHeaderNoLogged();
    }
    else{
        LoadHeaderLogged();
    }
}

function LoadHeader(li3, li4){
    const header = document.createElement('header');
    header.classList.add('header');

    const img = document.createElement('img');
    img.src = 'assets/logo.png';

    const ul = document.createElement('ul');

    const li1 = document.createElement('li');
    li1.innerHTML = 'Inicio';
    li1.addEventListener('click', (e) => {
        e.preventDefault();
        OpenInicio();
    });

    const li2 = document.createElement('li');
    li2.innerHTML = 'Ver propiedades';

    li2.addEventListener('click', (e) => {
        e.preventDefault();
        OpenVerPropiedades();
    });

    const a = document.createElement('a');
    a.setAttribute('href', '');
    a.setAttribute('draggable', 'false');
    a.classList.add('header-button');

    const imgOptions = document.createElement('img');
    imgOptions.src = 'assets/options.png';
    imgOptions.setAttribute('draggable', 'false');
    a.addEventListener('click', (e) => {
        e.preventDefault();
        modal.OpenModalOptions();
    });

    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);
    ul.appendChild(li4);

    a.appendChild(imgOptions);

    header.appendChild(img);
    header.appendChild(ul);
    header.appendChild(a);

    const body = document.querySelector('body');
    body.prepend(header);
}

function LoadHeaderNoLogged(){
    const li3 = document.createElement('li');
    li3.innerHTML = 'Iniciar sesion';

    li3.addEventListener('click', (e) => {
        e.preventDefault();
        OpenIniciarSesion();
    });

    const li4 = document.createElement('li');
    li4.innerHTML = 'Registrarse';

    li4.addEventListener('click', (e) => {
        e.preventDefault();
        OpenRegistrarse();
    });
    
    LoadHeader(li3, li4);
}

function LoadHeaderLogged(){
    const li3 = document.createElement('li');
    li3.innerHTML = 'Ver perfil';

    li3.addEventListener('click', (e) => {
        e.preventDefault();
        OpenVerPerfil();
    });

    const li4 = document.createElement('li');
    li4.innerHTML = 'Cerrar sesion';

    li4.addEventListener('click', (e) => {
        e.preventDefault();
        OpenCerrarSesion();
    });
    
    LoadHeader(li3, li4);
}

export function AddSearchInput(){
    const header = document.querySelector('.header');

    const label = document.createElement('label');
    label.htmlFor = 'search';

    const input = document.createElement('input');
    input.type = 'password';
    input.name = 'search';
    input.placeholder = 'Contraseña';

    label.appendChild(input);

    header.firstChild.after(label);
}

export function OpenInicio(){
    const main = document.querySelector('main');
    main.innerHTML = '';

    principal.LoadPrincipal();
}

export function OpenVerPropiedades(){
    const main = document.querySelector('main');
    main.innerHTML = '';

    properties.LoadProperties();
}

export function OpenIniciarSesion(){
    const main = document.querySelector('main');
    main.innerHTML = '';

    login.LoadLogin();
}

export function OpenRegistrarse(){
    const main = document.querySelector('main');
    main.innerHTML = '';

    signup.LoadSignup();
}

export function OpenVerPerfil(){
    const main = document.querySelector('main');
    main.innerHTML = '';

    profile.LoadProfile();
}

export function OpenCerrarSesion(){
    localStorage.removeItem('jwt');
    main.Load();
}