export function LoadHistory(){
    document.title = 'Propiedades';

    const article = document.createElement('article')
    article.classList.add('article-properties');

    const section = document.createElement('section')

    const ul2 = document.createElement('ul');

    section.appendChild(ul2);

    article.appendChild(section);

    const main = document.querySelector('main');
    main.appendChild(article);
}


export function LoadPropertyHistory(/*propiedad se supone*/){
    const li = document.createElement('li');

    const div = document.createElement('div');
    const img = document.createElement('img');

    img.setAttribute('draggable', 'false');
    img.src = 'assets/test/src.jpg';

    const h2 = document.createElement('h2');
    h2.innerHTML = 'Titulo';

    const p1 = document.createElement('p');
    p1.innerHTML = '1 habitación'; 

    const p2 = document.createElement('p');
    p2.innerHTML = '4 baños'; 

    div.appendChild(img);
    div.appendChild(h2);
    div.appendChild(p1);
    div.appendChild(p2);

    const h3 = document.createElement('h3');
    h3.innerHTML = '5000$';

    li.append(div);
    li.append(h3);

    const ul = document.querySelector('article.article-properties section ul');
    ul.append(li);
}