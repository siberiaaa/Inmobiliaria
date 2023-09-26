export function LoadProfile(){
    document.title = 'Perfil';

    const article = document.createElement('article');
    article.classList.add('article-profile');

    const h1 = document.createElement('h1');
    h1.innerHTML = 'Informacion de tu perfil';

    const div = document.createElement('div');

    const section1 = document.createElement('section');
    section1.classList.add('article-form');

    const form = document.createElement('form');

    const label1 = document.createElement('label');
    label1.htmlFor = 'email';

    const span1 = document.createElement('span');
    span1.innerHTML = 'Correo Electronico';
    const input1 = document.createElement('input');
    input1.type = 'text';
    input1.name = 'email';
    input1.setAttribute('disabled', 'true');

    label1.appendChild(span1);
    label1.appendChild(input1);

    const label2 = document.createElement('label');
    label2.htmlFor = 'nombres';

    const span2 = document.createElement('span');
    span2.innerHTML = 'Nombres';
    const input2 = document.createElement('input');
    input2.type = 'text';
    input2.name = 'nombres';
    input2.setAttribute('disabled', 'true');

    label2.appendChild(span2);
    label2.appendChild(input2);
    

    const label3 = document.createElement('label');
    label3.htmlFor = 'apellidos';

    const span3 = document.createElement('span');
    span3.innerHTML = 'Apellidos';
    const input3 = document.createElement('input');
    input3.type = 'text';
    input3.name = 'apellidos';
    input3.setAttribute('disabled', 'true');

    label3.appendChild(span3);
    label3.appendChild(input3);


    const label4 = document.createElement('label');
    label4.htmlFor = 'cedula';

    const span4 = document.createElement('span');
    span4.innerHTML = 'Cedula';
    const input4 = document.createElement('input');
    input4.type = 'text';
    input4.name = 'cedula';
    input4.setAttribute('disabled', 'true');

    label4.appendChild(span4);
    label4.appendChild(input4);


    const label5 = document.createElement('label');
    label5.htmlFor = 'direccion';

    const span5 = document.createElement('span');
    span5.innerHTML = 'Direccion';
    const input5 = document.createElement('input');
    input5.type = 'text';
    input5.name = 'direccion';
    input5.setAttribute('disabled', 'true');

    label5.appendChild(span5);
    label5.appendChild(input5);


    form.appendChild(label1);
    form.appendChild(label2);
    form.appendChild(label3);
    form.appendChild(label4);
    form.appendChild(label5);

    section1.appendChild(form);


    const section2 = document.createElement('section');
    section2.classList.add('article-form');
    section2.classList.add('profileoptions-section');

    const a1 = document.createElement('a');
    a1.setAttribute('href', '');
    a1.setAttribute('draggable', 'false');
    a1.classList.add('button-form');
    a1.innerHTML = 'Modificar perfil';

    const a2 = document.createElement('a');
    a2.setAttribute('href', '');
    a2.setAttribute('draggable', 'false');
    a2.classList.add('button-form');
    a2.innerHTML = 'Cambiar contraseña';

    const a3 = document.createElement('a');
    a3.setAttribute('href', '');
    a3.setAttribute('draggable', 'false');
    a3.classList.add('button-form');
    a3.innerHTML = 'Ver historial';

    section2.appendChild(a1);
    section2.appendChild(a2);
    section2.appendChild(a3);

    div.appendChild(section1);
    div.appendChild(section2);
    
    article.appendChild(h1);
    article.appendChild(div);

    const main = document.querySelector('main');
    main.appendChild(article);
}