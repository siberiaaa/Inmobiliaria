export function LoadPrincipal(){ //TODO:Propiedades principales
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

    const section2 = document.createElement('section');
    section2.classList.add('properties');

    article.appendChild(section1);

    article.appendChild(section2);

    const main = document.querySelector('main');
    main.appendChild(article);



}