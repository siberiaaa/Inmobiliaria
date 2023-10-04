export function LoadProperty(/*Propiedad*/){
    document.title = 'Propiedad';

    const article = document.createElement('article');
    article.classList.add('article-property');

    const section1 = document.createElement('section');
    section1.classList.add('property-imgs');

    const ul1 = document.createElement('ul');

    const li1 = document.createElement('li');
    const img1 = document.createElement('img');
    img1.src = 'assets/test/src.jpg';

    li1.appendChild(img1);

    const li2 = document.createElement('li');
    const img2 = document.createElement('img');
    img2.src = 'assets/test/src.jpg';
    li2.appendChild(img2);


    ul1.append(li1);
    ul1.append(li2);


    const img = document.createElement('img');
    img.src = 'assets/test/src.jpg';

    section1.appendChild(ul1);
    section1.appendChild(img);


    const section2 = document.createElement('section');
    section2.classList.add('property-details');

    const h1 = document.createElement('h1');
    h1.innerHTML = 'Titlulo';

    const div = document.createElement('div');

    const h3 = document.createElement('h3');
    h3.innerHTML = 'Detalles';

    const ul2 = document.createElement('ul');

    const li21 = document.createElement('li'); 
    const h41 = document.createElement('h4');
    h41.innerHTML = 'mts²: 2';
    li21.appendChild(h41);

    const li22 = document.createElement('li'); 
    const h42 = document.createElement('h4');
    h42.innerHTML = 'Habitaciones: 2';
    li22.appendChild(h42);

    const li23 = document.createElement('li'); 
    const h43 = document.createElement('h4');
    h43.innerHTML = 'Antiguedad: 2';
    li23.appendChild(h43);

    const li24 = document.createElement('li'); 
    const h44 = document.createElement('h4');
    h44.innerHTML = 'Baños: 2';
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

    const a2 = document.createElement('a');
    a2.setAttribute('href', '');
    a2.setAttribute('draggable', 'false');
    a2.classList.add('button-property');
    a2.innerHTML = 'Comprar';

    section3.appendChild(a1);
    section3.appendChild(a2);

    section2.appendChild(section3);

    article.appendChild(section1);
    article.appendChild(section2);

    const main = document.querySelector('main');
    main.appendChild(article);
}