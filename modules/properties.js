import {OpenModalErrorReload} from './modal.js';
import {LoadProperty} from './property.js';

let propertiesArray = [];

export function LoadProperties(){
    document.title = 'Propiedades';

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
    a3.innerHTML = '3 habitaciones';

    const a4 = document.createElement('a');
    a4.setAttribute('href', '');
    a4.setAttribute('draggable', 'false');
    a4.innerHTML = '4 o más habitaciones';

    li.appendChild(h2);
    li.appendChild(a1);
    li.appendChild(a2);
    li.appendChild(a3);
    li.appendChild(a4);

    const li2 = document.createElement('li');

    const h22 = document.createElement('h2');
    h2.innerHTML = 'Baños';

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
    a23.innerHTML = '3 baños';

    const a24 = document.createElement('a');
    a24.setAttribute('href', '');
    a24.setAttribute('draggable', 'false');
    a24.innerHTML = '4 o más baños';

    li2.appendChild(h22);
    li2.appendChild(a21);
    li2.appendChild(a22);
    li2.appendChild(a23);
    li2.appendChild(a24);

    ul.appendChild(li);
    ul.appendChild(li2);

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
            LoadProperty(property);
            /* Mientras se arregla lo de body get
            const propertyUser = LoadSinglePropertyAPI(property['id'], jwt);
            if (propertyUser != null){
                LoadProperty(propertyUser);
            }else{
                return;
            }*/
        }

    })
    li.append(div);
    li.append(h3);

    const ul = document.querySelector('article.article-properties section ul');
    ul.append(li);
}

async function LoadSinglePropertyAPI(id, jwt){
    const response = await fetch('https://graco-api.onrender.com/propiedadusuario/id', {
        method: 'GET',
        headers:  {
            "Content-Type": "application/json",
            "Authorization": jwt
          },
        body: JSON.stringify({"propiedad": id})
    });

    if (response.status >= 500 && response.status <= 599) {
        OpenModalErrorReload(`Error con el servidor\n${response.status}`)
        return;
    }

    const data = await response.json();

    if (data['success']) {
        return {...data['data']};
    } else {
        OpenModalErrorReload(data['message']);
        return null;
    }
}