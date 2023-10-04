import * as headers from './headers.js';

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