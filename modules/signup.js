import {OpenIniciarSesion} from './headers.js';
import {OpenModalButton, OpenModalError, OpenModalErrorReload, SpinnerOn, SpinnerOff} from './modal.js';
import * as main from './../main.js'

export function LoadSignup(){
    document.title = 'Registro';

    const header = document.querySelector('header.header');
    header.className = '';
    header.classList.add('header');

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
    a.addEventListener('click', (e) => SignUp(e));

    const p = document.createElement('p');
    p.innerHTML = '¿Ya tienes cuenta? ';

     

    const a1 = document.createElement('a');
    a1.setAttribute('href', '');
    a1.setAttribute('draggable', 'false');
    a1.classList.add('link-form');
    a1.innerHTML = 'Inicia sesion';
    a1.addEventListener('click', (e) => {
        e.preventDefault();
        OpenIniciarSesion();
    }); 
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


async function Register(nombres, apellidos, email, direccion, cedula, fecha, password) {
    const response = await fetch('https://graco-api.onrender.com/registrar', {
        method: 'POST',
        headers:  {
            "Content-Type": "application/json"
          },
        body: JSON.stringify({"nombre": nombres,
        "apellido": apellidos,
        "mail": email,
        "clave": password,
        "dni": cedula,
        "nacimiento": fecha,
        "direccion": direccion})
    });

    if (response.status >= 500 && response.status <= 599) {
        OpenModalErrorReload(`Error con el servidor\n${response.status}`)
        return;
    }

    const data = await response.json();

    if (data['success']) {
        return true;
    } else {
        if(typeof data['message'] === 'object'){
            OpenModalError('Tremendo error con el servidor, no sé que error es');
            return false;
        }
        else{
            OpenModalError(data['message']);
            return false;
        }
    }
}

async function SignUp(e) {
    e.preventDefault();
    
    const form = document.querySelector('form');
    const data = new FormData(form);

    const nombres = data.get('nombres');
    const apellidos = data.get('apellidos');
    const email = data.get('email');
    const direccion = data.get('direccion');
    const cedula = data.get('cedula');
    const fecha = data.get('fecha');
    const password = data.get('password');

    if (!nombres || !apellidos || !email || !direccion || !cedula || !fecha || !password) {
        OpenModalError('Llenar campos requeridos.');
        return;
    }
    
    if (!ValidateEmail(email)){
        OpenModalError('Formato de email inválido.');
        return;
    }

    if (!Validate18(fecha)){
        OpenModalError('Debe ser mayor de edad para utilizar la plataforma');
        return;
    }

    SpinnerOn();
    const registered = await Register(nombres, apellidos, email, direccion, cedula, fecha, password);
    SpinnerOff();
    if(registered){
        form.reset();
        OpenModalButton('Registrado correctamente.', main.Load);
    }

}

function ValidateEmail(email){
    return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    }
    
//Validacion que pedí prestada por ahí 
function Validate18(birthday){
	// it will accept two types of format yyyy-mm-dd and yyyy/mm/dd
	var optimizedBirthday = birthday.replace(/-/g, "/");

	//set date based on birthday at 01:00:00 hours GMT+0100 (CET)
	var myBirthday = new Date(optimizedBirthday);

	// set current day on 01:00:00 hours GMT+0100 (CET)
	var currentDate = new Date().toJSON().slice(0,10)+' 01:00:00';

	// calculate age comparing current date and borthday
	var myAge = ~~((Date.now(currentDate) - myBirthday) / (31557600000));

	if(myAge < 18) {
     	    return false;
        }else{
	    return true;
	}
}