import {OpenModalError, OpenModalErrorReload, SpinnerOn, SpinnerOff} from './modal.js';

export function LoadHistory(){
    document.title = 'Propiedades';

    const header = document.querySelector('header');
    header.className = '';
    header.classList.add('header');
    header.classList.add('header-shortbackground');

    const article = document.createElement('article')
    article.classList.add('article-properties');

    const section = document.createElement('section')

    const ul2 = document.createElement('ul');

    section.appendChild(ul2);

    article.appendChild(section);

    const main = document.querySelector('main');
    main.appendChild(article);

    LoadHistoryAPI();
}


export function LoadPropertyHistory(property){
    const li = document.createElement('li');

    const div = document.createElement('div');

    /*
    const img = document.createElement('img');

    img.setAttribute('draggable', 'false');
    img.src = property['imagenes'][0];
*/ //pipipi pensé que tenía imágenes para el historial

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

    /*div.appendChild(img);*/
    div.appendChild(h2);
    div.appendChild(p1);
    div.appendChild(p2);


    const h3 = document.createElement('h3');
    if(property['estado'] = 1){
        h3.innerHTML = 'Visita pendiente';
    }
    else if(property['estado'] = 2){
        h3.innerHTML = 'Visita realizada';
    }
    else if(property['estado'] = 3){
        h3.innerHTML = 'Comprado';
    }
 

    li.append(div);
    li.append(h3);

    const ul = document.querySelector('article.article-properties section ul');
    ul.append(li);
}

async function HistoryAPI(jwt) {
    const response = await fetch('https://graco-api.onrender.com/historial', {
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
        if(Array.isArray(data['data'])){
            return [...data['data']];
        }
        else{
            return {...data['data']};
        }
        
    } else if(data['message' == 'Invalid session token'] || data['message'] == 'Token de sesión inválido'){
        OpenModalErrorReload(`Sesión expirada. Volver a iniciar sesion.`);
        localStorage.removeItem('jwt');
        return null;
    } else {
        if(typeof data['message'] === 'object'){
            OpenModalError('Tremendo error con el servidor, no sé que error es');
            return null;
        }
        else{
            OpenModalError(data['message']);
            return null;
        }
    }
}

async function LoadHistoryAPI(){
    const jwt = localStorage.getItem('jwt');
    if(jwt == null){
        OpenModalErrorReload('Vuelve a iniciar sesión antes de continuar.');
        return;
    }
    SpinnerOn();
    const data = await HistoryAPI(jwt);
    SpinnerOff();

    if(data != null){
        if(data.length == 0){
            const ul = document.querySelector('article.article-properties section ul');
            const li = document.createElement('li');
            li.innerHTML = 'Nada registrado en el historial'.
            ul.append(li);
        }
        else{
            if(Array.isArray(data)){
                for (let property of data){
                    LoadPropertyHistory(property);
            }}
            else{
                LoadPropertyHistory(data);
                
            }
        } 
    
    }
}