export function LoadLogin(){
    document.title = 'Iniciar sesion';

    const article = document.createElement('article')
    article.classList.add('article-form');
    article.classList.add('login-article');
    

    const form = document.createElement('form');

    const h1 = document.createElement('h1');
    h1.innerHTML = 'Iniciar sesion';

    const label1 = document.createElement('label');
    label1.htmlFor = 'email';

    const input1 = document.createElement('input');
    input1.type = 'text';
    input1.name = 'email';
    input1.placeholder = 'Correo electronico';

    label1.appendChild(input1);

    const label2 = document.createElement('label');
    label2.htmlFor = 'password';

    const input2 = document.createElement('input');
    input2.type = 'password';
    input2.name = 'password';
    input2.placeholder = 'Contraseña';

    label2.appendChild(input2);

    const a = document.createElement('a');
    a.setAttribute('href', '');
    a.setAttribute('draggable', 'false');
    a.classList.add('button-form');
    a.innerHTML = 'Iniciar Sesion';

    const p = document.createElement('p');
    p.innerHTML = '¿No tienes cuenta? ';

    const a1 = document.createElement('a');
    a1.setAttribute('href', '');
    a1.setAttribute('draggable', 'false');
    a1.classList.add('link-form');
    a1.innerHTML = 'Crea una';

    p.appendChild(a1);

    form.appendChild(h1);
    form.appendChild(label1);
    form.appendChild(label2);
    form.appendChild(a);
    form.appendChild(p);

    article.appendChild(form);

    const body = document.querySelector('body');
    body.appendChild(article);
}