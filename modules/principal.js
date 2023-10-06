import {LoadProperty} from './property.js';

export function LoadPrincipal(){ 
    document.title = 'Inmobiliaria';

    const article = document.createElement('article');
    article.classList.add('princial-article');

    const section1 = document.createElement('section');
    section1.classList.add('banner');

    const h1 = document.createElement('h1');
    h1.innerHTML = '¡Bienvenidos!';

    const p = document.createElement('p');
    p.innerHTML = 'Descubre tu nuevo hogar hoy.<br>Bienvenido a la experiencia inmobiliaria definitiva.'; //TODO:

    section1.appendChild(h1);
    section1.appendChild(p);

    

    const article2 = document.createElement('article')
    article2.classList.add('article-properties');
    const h2 = document.createElement('h2');
    h2.innerHTML = 'Propiedades principales';
    const section = document.createElement('section')
    const ul = document.createElement('ul');
    section.appendChild(ul);
    article2.appendChild(h2);
    article2.appendChild(section);

    article.appendChild(section1);

    article.appendChild(article2);
    const main = document.querySelector('main');
    main.appendChild(article);


    FillPropertiesAPI();
}

async function GetPropertiesAPI(){
    const response = await fetch('https://graco-api.onrender.com/propiedad-principales');

    if (response.status >= 500 && response.status <= 599) {
        OpenModalErrorReload(`Error con el servidor\n${response.status}`)
        return false;
    }

    const data = await response.json();

    if (data['success']) {
        return [...data['data']];
    } else {
        OpenModalError(data['message']);
        return null;
    }
}

async function FillPropertiesAPI(){
    const result = await GetPropertiesAPI();

    if (result != null) {
        for (let property of result){
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
        LoadProperty(property);
    })
    li.append(div);
    li.append(h3);

    const ul = document.querySelector('article.article-properties section ul');
    ul.append(li);
}