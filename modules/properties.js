import {OpenModalErrorReload} from './modal.js';
import {LoadProperty} from './property.js';

let propertiesArray = [];

export function LoadProperties(){
    document.title = 'Propiedades';

    const header = document.querySelector('header');
    header.className = '';
    header.classList.add('header');
    header.classList.add('header-shortbackground');

    const article = document.createElement('article')
    article.classList.add('article-properties');

    const aside = document.createElement('aside');

    const h1 = document.createElement('h1');
    h1.innerHTML = 'Filtros';

    const ul = document.createElement('ul');

    const li = document.createElement('li');

    const h2 = document.createElement('h2');
    h2.innerHTML = 'Habitaciones';

    const a1 = document.createElement('a');
    a1.setAttribute('href', '');
    a1.setAttribute('draggable', 'false');
    a1.innerHTML = '1 habitación';

    const a2 = document.createElement('a');
    a2.setAttribute('href', '');
    a2.setAttribute('draggable', 'false');
    a2.innerHTML = '2 habitaciones';

    const a3 = document.createElement('a');
    a3.setAttribute('href', '');
    a3.setAttribute('draggable', 'false');
    a3.innerHTML = '3 o más habitaciones';

    li.appendChild(h2);
    li.appendChild(a1);
    li.appendChild(a2);
    li.appendChild(a3);

    const li2 = document.createElement('li');

    const h22 = document.createElement('h2');
    h22.innerHTML = 'Baños';

    const a21 = document.createElement('a');
    a21.setAttribute('href', '');
    a21.setAttribute('draggable', 'false');
    a21.innerHTML = '1 baño';

    const a22 = document.createElement('a');
    a22.setAttribute('href', '');
    a22.setAttribute('draggable', 'false');
    a22.innerHTML = '2 baños';

    const a23 = document.createElement('a');
    a23.setAttribute('href', '');
    a23.setAttribute('draggable', 'false');
    a23.innerHTML = '3 baños o más baños';

    li2.appendChild(h22);
    li2.appendChild(a21);
    li2.appendChild(a22);
    li2.appendChild(a23);

    const li3 = document.createElement('li');

    const h23 = document.createElement('h2');
    h23.innerHTML = 'Antigüedad';

    const a31 = document.createElement('a');
    a31.setAttribute('href', '');
    a31.setAttribute('draggable', 'false');
    a31.innerHTML = '0 a 4 años';

    const a32 = document.createElement('a');
    a32.setAttribute('href', '');
    a32.setAttribute('draggable', 'false');
    a32.innerHTML = '5 a 9 años';

    const a33 = document.createElement('a');
    a33.setAttribute('href', '');
    a33.setAttribute('draggable', 'false');
    a33.innerHTML = '10 a más años';

    li3.appendChild(h23);
    li3.appendChild(a31);
    li3.appendChild(a32);
    li3.appendChild(a33);

    const li4 = document.createElement('li');

    const h24 = document.createElement('h2');
    h24.innerHTML = 'Metros Cuadrados';

    const a41 = document.createElement('a');
    a41.setAttribute('href', '');
    a41.setAttribute('draggable', 'false');
    a41.innerHTML = '0 a 50 mts²';

    const a42 = document.createElement('a');
    a42.setAttribute('href', '');
    a42.setAttribute('draggable', 'false');
    a42.innerHTML = '51 a 100 mts²';

    const a43 = document.createElement('a');
    a43.setAttribute('href', '');
    a43.setAttribute('draggable', 'false');
    a43.innerHTML = '100 a más mts²';

    li4.appendChild(h24);
    li4.appendChild(a41);
    li4.appendChild(a42);
    li4.appendChild(a43);

    ul.appendChild(li);
    ul.appendChild(li2);
    ul.appendChild(li3);
    ul.appendChild(li4);

    aside.appendChild(h1);
    aside.appendChild(ul);


    const section = document.createElement('section')

    const ul2 = document.createElement('ul');

    section.appendChild(ul2);

    article.appendChild(aside);
    article.appendChild(section);

    const main = document.querySelector('main');
    main.appendChild(article);

    FillPropertiesAPI();

}

async function GetPropertiesAPI(){
    const response = await fetch('https://graco-api.onrender.com/propiedad');

    if (response.status >= 500 && response.status <= 599) {
        OpenModalErrorReload(`Error con el servidor\n${response.status}`)
        return false;
    }

    const data = await response.json();

    if (data['success']) {
        propertiesArray = [...data['data']];
        return true;
    } else {
        OpenModalError(data['message']);
        return false;
    }
}

async function FillPropertiesAPI(){
    const result = await GetPropertiesAPI();

    if (result) {
        for (let property of propertiesArray){
            LoadPropertyLi(property);
        }
 }
    

}

export function LoadPropertyLi(property){
    const li = document.createElement('li');

    const div = document.createElement('div');
    const img = document.createElement('img');

    img.setAttribute('draggable', 'false');
    img.src = property['imagenes'][0];

    const h2 = document.createElement('h2');
    h2.innerHTML = `${property['id']} Titulo`;

    const p1 = document.createElement('p');
    if (property['habitaciones'] == 1){
        p1.innerHTML = '1 habitación'; 
    } else{
        p1.innerHTML = `${property['habitaciones']} habitaciones`;
    }

    const p2 = document.createElement('p');
    if (property['baños'] == 1){
        p2.innerHTML = '1 baño'; 
    } else{
        p2.innerHTML = `${property['baños']} baños`;
    }

    div.appendChild(img);
    div.appendChild(h2);
    div.appendChild(p1);
    div.appendChild(p2);

    const h3 = document.createElement('h3');
    h3.innerHTML = `${property['precio']}$`;


    li.addEventListener('click', (e) => {
        e.preventDefault();
        const jwt = localStorage.getItem('jwt');
        if(jwt == null){
            LoadProperty(property);
        }
        else{
            const propertyUser = LoadSinglePropertyAPI(property['id'], jwt);
            if (propertyUser != null){
                LoadProperty(propertyUser);
            }else{
                return;
            }
        }

    })
    li.append(div);
    li.append(h3);

    const ul = document.querySelector('article.article-properties section ul');
    ul.append(li);
}

async function LoadSinglePropertyAPI(id, jwt){
    const response = await fetch(`https://graco-api.onrender.com/propiedadusuario/${id}`, {
        method: 'GET',
        headers:  {
            "Content-Type": "application/json",
            "Authorization": jwt
          }
    });

    if (response.status >= 500 && response.status <= 599) {
        OpenModalErrorReload(`Error con el servidor\n${response.status}`)
        return;
    }

    const data = await response.json();

    if (data['success']) {
        return {...data['data']};
    } else if(data['message' == 'Invalid session token']){
        OpenModalErrorReload(`Sesión expirada. Volver a iniciar sesion.`);
        localStorage.removeItem('jwt');
        return null;
    } else {
        OpenModalErrorReload(data['message']);
        return null;
    }
}