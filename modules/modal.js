import * as headers from './headers.js';
import * as main from './../main.js'
import {Comprar} from './property.js';

function CreateModal(){
    const oldModal = document.querySelector('article.modal');
    
    if(oldModal != null){
        oldModal.remove();
    }

    const modal = document.createElement('article');
    modal.classList.add('modal');

    const section = document.createElement('section');
    section.classList.add('modal-content');

    modal.appendChild(section);

    const body = document.querySelector('body');
    body.prepend(modal);
}

export function OpenModalButton(message, button){
    CreateModal();
    const modalContent = document.querySelector('.modal-content');
    modalContent.classList.add('messagebox');

    const p = document.createElement('p');
    p.innerHTML = message;
    modalContent.appendChild(p);

    const a = document.createElement('a');
    a.innerHTML = 'Aceptar';
    a.addEventListener('click', () => {
        button();
        document.documentElement.style.setProperty('--displaymodal', 'none')
    });

    modalContent.appendChild(a);


    document.documentElement.style.setProperty('--displaymodal', 'flex');
}

export function OpenModalAceptarReload(message){
    CreateModal();
    const modalContent = document.querySelector('.modal-content');
    modalContent.classList.add('messagebox');

    const p = document.createElement('p');
    p.innerHTML = message;
    modalContent.appendChild(p);

    const a = document.createElement('a');
    a.innerHTML = 'Aceptar';
    a.addEventListener('click', () => {
        document.documentElement.style.setProperty('--displaymodal', 'none')
        main.Load();
    });

    modalContent.appendChild(a);


    document.documentElement.style.setProperty('--displaymodal', 'flex');
}

export function OpenModalError(message){
    CreateModal();
    const modalContent = document.querySelector('.modal-content');
    modalContent.classList.add('messagebox');
    modalContent.classList.add('error');
 
    const h1 = document.createElement('h1');
    h1.innerHTML = 'Error';
    modalContent.appendChild(h1);

    const p = document.createElement('p');
    p.innerHTML = message;
    modalContent.appendChild(p);

    const a = document.createElement('a');
    a.innerHTML = 'Aceptar';
    a.addEventListener('click', () => {document.documentElement.style.setProperty('--displaymodal', 'none')});

    modalContent.appendChild(a);


    document.documentElement.style.setProperty('--displaymodal', 'flex');
}

export function OpenModalErrorReload(message){
    CreateModal();
    const modalContent = document.querySelector('.modal-content');
    modalContent.classList.add('messagebox');
    modalContent.classList.add('error');
 
    const h1 = document.createElement('h1');
    h1.innerHTML = 'Error';
    modalContent.appendChild(h1);

    const p = document.createElement('p');
    p.innerHTML = message;
    modalContent.appendChild(p);

    const a = document.createElement('a');
    a.innerHTML = 'Aceptar';
    a.addEventListener('click', () => {
        document.documentElement.style.setProperty('--displaymodal', 'none');
        main.Load();
    });

    modalContent.appendChild(a);


    document.documentElement.style.setProperty('--displaymodal', 'flex');
}


export function OpenModalOptions(){
    CreateModal();
    const ul = document.querySelector('header ul')
    const modalContent = document.querySelector('.modal-content');
    
    modalContent.classList.add('headermenu');
    modalContent.appendChild(ul.cloneNode(true));
    document.documentElement.style.setProperty('--displaymodal', 'flex');

    const modal = document.querySelector('.modal');
    modal.addEventListener('click', () => {document.documentElement.style.setProperty('--displaymodal', 'none')});

    const liInicio = document.querySelectorAll('.modal-content li')[0];
    liInicio.addEventListener('click', (e) => {
        e.preventDefault();
        headers.OpenInicio();
    });

    const liVerPropiedades = document.querySelectorAll('.modal-content li')[1];
    liVerPropiedades.addEventListener('click', (e) => {
        e.preventDefault();
        headers.OpenVerPropiedades();
    });

    const li3 = document.querySelectorAll('.modal-content li')[2];
    if(li3.innerHTML == 'Iniciar sesion'){
        li3.addEventListener('click', (e) => {
            e.preventDefault();
            headers.OpenIniciarSesion();
        });
    } else{
        li3.addEventListener('click', (e) => {
            e.preventDefault();
            headers.OpenVerPerfil();
        });
    }

    const li4 = document.querySelectorAll('.modal-content li')[3];
    if(li4.innerHTML == 'Registrarse'){
        li4.addEventListener('click', (e) => {
            e.preventDefault();
            headers.OpenRegistrarse();
        });
    } else{
        li4.addEventListener('click', (e) => {
            e.preventDefault();
            headers.OpenCerrarSesion();
        });
    }

}


export function OpenModalFormCompra(id){
    CreateModal();

    const form = document.createElement('form');
    form.addEventListener('submit', (e) => e.preventDefault());

    const label1 = document.createElement('label');
    label1.htmlFor = 'email';
    const span1 = document.createElement('span');
    span1.innerHTML = 'Correo Electronico';
    const input1 = document.createElement('input');
    input1.type = 'text';
    input1.name = 'email';

    label1.appendChild(span1);
    label1.appendChild(input1);

    const label2 = document.createElement('label');
    label2.htmlFor = 'nombres';
    const span2 = document.createElement('span');
    span2.innerHTML = 'Nombre y apellido';
    const input2 = document.createElement('input');
    input2.type = 'text';
    input2.name = 'nombres';

    label2.appendChild(span2);
    label2.appendChild(input2);
    

    const label3 = document.createElement('label');
    label3.htmlFor = 'telefono';
    const span3 = document.createElement('span');
    span3.innerHTML = 'Telefono';
    const input3 = document.createElement('input');
    input3.type = 'text';
    input3.name = 'telefono';

    label3.appendChild(span3);
    label3.appendChild(input3);

    const label4 = document.createElement('label');
    label4.htmlFor = 'pago';
    const span4 = document.createElement('span');
    span4.innerHTML = 'Pago de <b>contado</b> ó <b>prestamo</b>';
    const input4 = document.createElement('input');
    input4.type = 'text';
    input4.name = 'pago';

    label4.appendChild(span4);
    label4.appendChild(input4);

    form.appendChild(label1);
    form.appendChild(label2);
    form.appendChild(label3);
    form.appendChild(label4);

    const h1 = document.createElement('h1');
    h1.innerHTML = 'Datos de contacto';

    const a1 = document.createElement('a');
    a1.setAttribute('href', '');
    a1.setAttribute('draggable', 'false');
    a1.innerHTML = 'Comprar';
    a1.classList.add('button-form');
    

    a1.addEventListener('click', (e) => {
        e.preventDefault();

        const form = document.querySelector('form');
        const data = new FormData(form);
    
        const email = data.get('email');
        const nombres = data.get('nombres');
        const telefono = data.get('telefono');
        const pago = data.get('pago');
    
        if (!email || !nombres || !telefono || !pago) {
            OpenModalError('Llenar campos requeridos.');
            return;
        }
        if (!ValidateEmail(email)){
            OpenModalError('Formato de email inválido.');
            return;
        }
        if (!(pago == 'contado' || pago == 'prestamo')){
            OpenModalError('Debe escribir "contado" ó "prestamo".');
            return;
        }

        Comprar(id, email, nombres, telefono, pago);
    });  


    const modalContent = document.querySelector('.modal-content');
    modalContent.classList.add('article-form');
    modalContent.appendChild(h1);
    modalContent.appendChild(form);
    modalContent.appendChild(a1);
    document.documentElement.style.setProperty('--displaymodal', 'flex');
}

function ValidateEmail(email){
    return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}
