import {OpenModalErrorReload, OpenModalError, OpenModalFormCompra, OpenModalAceptarReload} from './modal.js';

export function LoadProperty(property){
    document.title = `${property['id']} Titulo`;

    const header = document.querySelector('header');
    header.className = '';
    header.classList.add('header');
    header.classList.add('header-shortbackground');

    const article = document.createElement('article');
    article.classList.add('article-property');

    const section1 = document.createElement('section');
    section1.classList.add('property-imgs');

    const img = document.createElement('img');
    img.src = property['imagenes'][0];

    const ul1 = document.createElement('ul');

    for (let lilimg of property['imagenes']){
        const li1 = document.createElement('li');

        li1.addEventListener('click', (e) => {
            e.preventDefault();
            img.src = lilimg;
        })
        const img1 = document.createElement('img');
        img1.src = lilimg;

        li1.appendChild(img1);
        ul1.append(li1);
    }

    
    section1.appendChild(ul1);
    section1.appendChild(img);


    const section2 = document.createElement('section');
    section2.classList.add('property-details');

    const h1 = document.createElement('h1');
    h1.innerHTML = `${property['id']} Titulo`;

    const div = document.createElement('div');

    const h3 = document.createElement('h3');
    h3.innerHTML = 'Detalles';

    const ul2 = document.createElement('ul');

    const li21 = document.createElement('li'); 
    const h41 = document.createElement('h4');
    h41.innerHTML = `mts²: ${property['metroscuadrados']}`;
    li21.appendChild(h41);

    const li22 = document.createElement('li'); 
    const h42 = document.createElement('h4');
    h42.innerHTML = `Habitaciones: ${property['habitaciones']}`;
    li22.appendChild(h42);

    const li23 = document.createElement('li'); 
    const h43 = document.createElement('h4');

    const yearToday = new Date(Date.now());
    const yearProperty = new Date(property['antiguedad']);
    const antiguedad = yearToday.getFullYear() - (yearProperty.getFullYear() + 1);
    if(antiguedad == 1){
        h43.innerHTML = `Antiguedad: ${antiguedad} año`;
    }
    else{
        h43.innerHTML = `Antiguedad: ${antiguedad} años`;
    }
    
    li23.appendChild(h43);

    const li24 = document.createElement('li'); 
    const h44 = document.createElement('h4');
    h44.innerHTML = `Baños: ${property['baños']}`;
    li24.appendChild(h44);

    ul2.appendChild(li21);
    ul2.appendChild(li22);
    ul2.appendChild(li23);
    ul2.appendChild(li24);

    div.appendChild(h3);
    div.appendChild(ul2);

    section2.appendChild(h1);
    section2.appendChild(div);

    const section3 = document.createElement('section');
    section3.classList.add('property-options');

    const a1 = document.createElement('a');
    a1.setAttribute('href', '');
    a1.setAttribute('draggable', 'false');
    a1.classList.add('button-property');
    a1.innerHTML = 'Solicitar visita';
    a1.addEventListener('click', (e) =>{
        e.preventDefault();
        SolicitarVisita(property['id']);
    })

    const a2 = document.createElement('a');
    a2.setAttribute('href', '');
    a2.setAttribute('draggable', 'false');
    a2.classList.add('button-property');
    a2.innerHTML = 'Comprar';
    a2.addEventListener('click', (e) =>{
        e.preventDefault();
        OpenModalFormCompra(property['id']);
    })


    if(localStorage.getItem('jwt') != null){
        section3.appendChild(a1);
        section3.appendChild(a2);
    } /* Para que solo lo vea alguien loggeado */

    section2.appendChild(section3);

    article.appendChild(section1);
    article.appendChild(section2);

    const main = document.querySelector('main');
    main.innerHTML = '';
    main.appendChild(article);
}

async function SolicitarVisita(id){
    const jwt = localStorage.getItem('jwt');
    if(jwt == null){
        OpenModalErrorReload('Vuelve a iniciar sesión antes de continuar.');
        return;
    }
    const message = await SolicitarVisitaAPI(jwt, id);

    if(message != null){
        OpenModalAceptarReload(message);
    }

}

async function SolicitarVisitaAPI(jwt, id){
    const response = await fetch('https://graco-api.onrender.com/visitar-propiedad', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': jwt
        },
        body: JSON.stringify({'propiedad': id})
    });


    if (response.status >= 500 && response.status <= 599) {
        OpenModalErrorReload(`Error con el servidor\n${response.status}`)
        return;
    }


    const data = await response.json();
    	
    if (data['success']) {
        return data['message'];
    } else if(data['message' == 'Invalid session token'] || data['message'] == 'Token de sesión inválido'){
        OpenModalErrorReload(`Sesión expirada. Volver a iniciar sesion.`);
        localStorage.removeItem('jwt');
        return null;
    }
        else {
        OpenModalError(data['message']);
        return null;
    }
}

export async function Comprar(id, correo, nombre, telefono, pago){
    const jwt = localStorage.getItem('jwt');
    if(jwt == null){
        OpenModalErrorReload('Vuelve a iniciar sesión antes de continuar.');
        return;
    }
    const message = await ComprarAPI(jwt, id, correo, nombre, telefono, pago);

    if(message != null){
        OpenModalAceptarReload(message);
        document.documentElement.style.setProperty('--displaymodal', 'none');
    }
}

async function ComprarAPI(jwt, id, correo, nombre, telefono, pago){
    const response = await fetch('https://graco-api.onrender.com/tramitar-propiedad', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': jwt
        },
        body: JSON.stringify({'propiedad': id,
        "correo": correo,
        "nombre": nombre,
        "telefono": telefono,
        "transaccion": pago}
        )
    });


    if (response.status >= 500 && response.status <= 599) {
        OpenModalErrorReload(`Error con el servidor\n${response.status}`)
        return;
    }


    const data = await response.json();
    	
    if (data['success']) {
        return data['message'];
    } else if(data['message'] == 'Invalid session token' || data['message'] == 'Token de sesión inválido'){
        OpenModalErrorReload(`Sesión expirada. Volver a iniciar sesion.`);
        localStorage.removeItem('jwt');
        return null;
    }
        else {
        OpenModalError(data['message']);
        return null;
    }
}