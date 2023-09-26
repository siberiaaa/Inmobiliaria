export function LoadSignup(){
    document.title = 'Registro';

    const article = document.createElement('article');
    article.classList.add('article-form');
    article.classList.add('signup-article');

    const form = document.createElement('form');

    const h1 = document.createElement('h1');
    h1.innerHTML = 'Registrate';

    const div1 = document.createElement('div');

    const label1 = document.createElement('label');
    label1.htmlFor = 'nombres';

    const input1 = document.createElement('input');
    input1.type = 'text';
    input1.name = 'nombres';
    input1.placeholder = 'Nombres';

    label1.appendChild(input1);

    const label2 = document.createElement('label');
    label2.htmlFor = 'apellidos';

    const input2 = document.createElement('input');
    input2.type = 'text';
    input2.name = 'apellidos';
    input2.placeholder = 'Apellidos';

    label2.appendChild(input2);

    div1.appendChild(label1);
    div1.appendChild(label2);


    const label3 = document.createElement('label');
    label3.htmlFor = 'email';

    const input3 = document.createElement('input');
    input3.type = 'text';
    input3.name = 'email';
    input3.placeholder = 'Correo electronico';

    label3.appendChild(input3);


    const label4 = document.createElement('label');
    label4.htmlFor = 'direccion';

    const input4 = document.createElement('input');
    input4.type = 'text';
    input4.name = 'direccion';
    input4.placeholder = 'Direccion';

    label4.appendChild(input4);


    const div2 = document.createElement('div');

    const label5 = document.createElement('label');
    label5.htmlFor = 'cedula';

    const input5 = document.createElement('input');
    input5.type = 'text';
    input5.name = 'cedula';
    input5.placeholder = 'Cedula';

    label5.appendChild(input5);

    const label6 = document.createElement('label');
    label6.htmlFor = 'fecha';

    const input6 = document.createElement('input');
    input6.type = 'date';
    input6.name = 'fecha';
    input6.setAttribute('id', 'fecha-form');

    label6.appendChild(input6);

    div2.appendChild(label5);
    div2.appendChild(label6);

    const label7 = document.createElement('label');
    label7.htmlFor = 'password';

    const input7 = document.createElement('input');
    input7.type = 'password';
    input7.name = 'password';
    input7.placeholder = 'Contraseña';

    label7.appendChild(input7);

    const a = document.createElement('a');
    a.setAttribute('href', '');
    a.setAttribute('draggable', 'false');
    a.classList.add('button-form');
    a.innerHTML = 'Registrarme';

    const p = document.createElement('p');
    p.innerHTML = '¿Ya tienes cuenta? ';

    const a1 = document.createElement('a');
    a1.setAttribute('href', '');
    a1.setAttribute('draggable', 'false');
    a1.classList.add('link-form');
    a1.innerHTML = 'Inicia sesion';

    p.appendChild(a1);

    form.appendChild(h1);
    form.appendChild(div1);
    form.appendChild(label3);
    form.appendChild(label4);
    form.appendChild(div2);
    form.appendChild(label7);
    form.appendChild(a);
    form.appendChild(p);

    article.appendChild(form);

    const main = document.querySelector('main');
    main.appendChild(article);
}