export function LoadFooter(){
    const footer = document.createElement('footer');

    const section1 = document.createElement('section');

    const ul1 = document.createElement('ul');
    ul1.setAttribute('id', 'ul-socialmedia');

    const li11 = document.createElement('li');
    const img = document.createElement('img');
    img.setAttribute('id', 'footer-logo');
    img.src = 'assets/logo.png';
    li11.appendChild(img);

    const li12= document.createElement('li');
    const h1 = document.createElement('h');
    h1.innerHTML = 'Siguenos';
    li12.appendChild(h1);

    const li13 = document.createElement('li');
    const img1 = document.createElement('img');
    img1.src = 'assets/socialmedia/Instagram.png';
    const img2 = document.createElement('img');
    img2.src = 'assets/socialmedia/Facebook.png';
    const img3 = document.createElement('img');
    img3.src = 'assets/socialmedia/YouTube.png';
    li13.appendChild(img1);
    li13.appendChild(img2);
    li13.appendChild(img3);

    ul1.appendChild(li11);
    ul1.appendChild(li12);
    ul1.appendChild(li13);


    const ul2 = document.createElement('ul');

    const li21 = document.createElement('li');
    const h3 = document.createElement('h3');
    h3.innerHTML = 'Nuestras políticas';
    li21.appendChild(h3);

    const li22 = document.createElement('li');
    const h4 = document.createElement('h4');
    h4.innerHTML = 'Nuestras políticas';
    li22.appendChild(h4);

    const li23 = document.createElement('li');
    const h41 = document.createElement('h4');
    h41.innerHTML = 'Términos y condiciones';
    li23.appendChild(h41);

    const li24 = document.createElement('li');
    const h42 = document.createElement('h4');
    h42.innerHTML = 'Términos de servicio';
    li24.appendChild(h42);

    const li25 = document.createElement('li');
    const h43 = document.createElement('h4');
    h43.innerHTML = 'Políticas de cookies';
    li25.appendChild(h43);

    ul2.appendChild(li21);
    ul2.appendChild(li22);
    ul2.appendChild(li23);
    ul2.appendChild(li24);
    ul2.appendChild(li25);


    const ul3 = document.createElement('ul');

    const li31 = document.createElement('li');
    const h31 = document.createElement('h3');
    h31.innerHTML = '¿Necesitas ayuda?';
    li31.appendChild(h31);

    const li32 = document.createElement('li');
    const h44 = document.createElement('h4');
    h44.innerHTML = 'Nos gustaría saber lo que piensas';
    li32.appendChild(h44);

    const li33 = document.createElement('li');
    const h45 = document.createElement('h4');
    h45.innerHTML = 'Acerca de nosotros';
    li33.appendChild(h45);

    const li34 = document.createElement('li');
    const h46 = document.createElement('h4');
    h46.innerHTML = 'Soporte';
    li34.appendChild(h46);

    const li35 = document.createElement('li');
    const h47 = document.createElement('h4');
    h47.innerHTML = 'Contáctanos';
    li35.appendChild(h47);

    ul3.appendChild(li31);
    ul3.appendChild(li32);
    ul3.appendChild(li33);
    ul3.appendChild(li34);
    ul3.appendChild(li35);
    

    section1.appendChild(ul1);
    section1.appendChild(ul2);
    section1.appendChild(ul3);

    const hr = document.createElement('hr');

    const section2 = document.createElement('section');

    const h48 = document.createElement('h4');
    h48.innerHTML = 'Copyright © 2023 All rights reserved.';
    section2.appendChild(h48);

    const h49 = document.createElement('h4');
    h49.innerHTML = 'By ';

    const a = document.createElement('a');
    a.setAttribute('href', 'https://github.com/siberiaaa');
    a.setAttribute('draggable', 'false');
    a.innerHTML = 'Siberia';

    h49.appendChild(a);

    section2.appendChild(h49);

    footer.appendChild(section1);
    footer.appendChild(hr);
    footer.appendChild(section2);

    const body = document.querySelector('body');
    body.appendChild(footer);
}