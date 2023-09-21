function LoadHeader(li3, li4){
    const header = document.createElement('header');
    header.classList.add('header');

    const img = document.createElement('img');
    img.src = 'assets/logo.png';

    const ul = document.createElement('ul');

    const li1 = document.createElement('li');
    li1.innerHTML = 'Inicio';

    const li2 = document.createElement('li');
    li2.innerHTML = 'Ver propiedades';

    const a = document.createElement('a');
    a.setAttribute('href', '');
    a.setAttribute('draggable', 'false');
    a.classList.add('header-button');

    const imgOptions = document.createElement('img');
    imgOptions.src = 'assets/options.png';
    imgOptions.setAttribute('draggable', 'false');

    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);
    ul.appendChild(li4);

    a.appendChild(imgOptions);

    header.appendChild(img);
    header.appendChild(ul);
    header.appendChild(a);

    const body = document.querySelector('body');
    body.appendChild(header);
}

export function LoadHeaderNoLogged(){
    const li3 = document.createElement('li');
    li3.innerHTML = 'Iniciar sesion';

    const li4 = document.createElement('li');
    li4.innerHTML = 'Registrarse';
    
    LoadHeader(li3, li4);
}

export function LoadHeaderLogged(){
    const li3 = document.createElement('li');
    li3.innerHTML = 'Ver perfil';

    const li4 = document.createElement('li');
    li4.innerHTML = 'Cerrar sesion';
    
    LoadHeader(li3, li4);
}

export function AddSearchInput(){ //TODO: arreglar tamaño de esa cosa estando en medio de las cosas
    const header = document.querySelector('.header');

    const label = document.createElement('label');
    label.htmlFor = 'search';

    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'search';
    input.placeholder = 'Busqueda';

    label.appendChild(input);

    header.firstChild.after(label);
}