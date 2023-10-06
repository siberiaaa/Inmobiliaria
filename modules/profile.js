import {OpenModalButton, OpenModalError, OpenModalErrorReload} from './modal.js';
import {LoadHistory} from './history.js';
import {OpenCerrarSesion} from './headers.js';

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

    const dateLabel = document.createElement('label');
    dateLabel.htmlFor = 'fecha';
    const spanDate = document.createElement('span');
    spanDate.innerHTML = 'Fecha de nacimiento';
    const date = document.createElement('input');
    date.type = 'date';
    date.name = 'fecha';
    date.setAttribute('disabled', 'true');
    
    dateLabel.appendChild(spanDate);
    dateLabel.appendChild(date);

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
    form.appendChild(dateLabel);
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
    a1.addEventListener('click', (e) => {
        e.preventDefault();
        ModifyProfile();
    });

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
    a3.addEventListener('click', (e) => {
        e.preventDefault();
        const main = document.querySelector('main');
        main.innerHTML = '';
        LoadHistory();
    });

    section2.appendChild(a1);
    section2.appendChild(a2);
    section2.appendChild(a3);

    div.appendChild(section1);
    div.appendChild(section2);
    
    article.appendChild(h1);
    article.appendChild(div);

    const main = document.querySelector('main');
    main.appendChild(article);

    LoadProfileAPI();
}


async function ProfileAPI(jwt) {
    const response = await fetch('https://graco-api.onrender.com/perfil', {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': jwt
        }
    });

    if (response.status >= 500 && response.status <= 599) {
        OpenModalErrorReload(`Error con el servidor\n${response.status}`)
        return;
    }

    const data = await response.json();
    	
    if (data['success']) {
        return {...data['data']};
    } else {
        OpenModalError(data['message']);
        return null;
    }
}

async function LoadProfileAPI() {
    const jwt = localStorage.getItem('jwt');
    if(jwt == null){
        OpenModalErrorReload('Vuelve a iniciar sesión antes de continuar.');
        return;
    }

    const profileData = await ProfileAPI(jwt);

    if(profileData != null){
        document.querySelector('form input[name="email"]').value = profileData['mail'];
        document.querySelector('form input[name="nombres"]').value = profileData['nombre'];
        document.querySelector('form input[name="apellidos"]').value = profileData['apellido'];

        const fecha = new Date(profileData['nacimiento']).toLocaleDateString('en-CA');
        document.querySelector('form input[name="fecha"]').value = fecha;
        document.querySelector('form input[name="cedula"]').value = profileData['dni'];
        document.querySelector('form input[name="direccion"]').value = profileData['direccion'];
    }
}

function ModifyProfile(){
    const nombres = document.querySelector('form input[name="nombres"]');
    const apellidos =  document.querySelector('form input[name="apellidos"]');
    const fecha = document.querySelector('form input[name="fecha"]');
    const cedula = document.querySelector('form input[name="cedula"]');
    const direccion = document.querySelector('form input[name="direccion"]');
   
    nombres.removeAttribute ('disabled');
    apellidos.removeAttribute ('disabled');
    fecha.removeAttribute ('disabled');
    cedula.removeAttribute ('disabled');
    direccion.removeAttribute ('disabled');

    const form = document.querySelector('.article-profile section form');
    form.classList.add('formedit');

    const buttonCancel = document.createElement('a');
    buttonCancel.setAttribute('href', '');
    buttonCancel.setAttribute('draggable', 'false');
    buttonCancel.classList.add('button-form');
    buttonCancel.innerHTML = 'Cancelar';
    buttonCancel.addEventListener('click', (e) => {
        e.preventDefault();
        const main = document.querySelector('main');
        main.innerHTML = '';
        LoadProfile();
    });

    const buttonSave = document.createElement('a');
    buttonSave.setAttribute('href', '');
    buttonSave.setAttribute('draggable', 'false');
    buttonSave.classList.add('button-form');
    buttonSave.innerHTML = 'Guardar cambios';
    buttonSave.addEventListener('click', (e) => {
        e.preventDefault();
        if (!SaveModify()){
            return;
        }
    });
    
    const button = document.querySelector('a.button-form:nth-child(1)');
    const button1 = document.querySelector('a.button-form:nth-child(2)');
    const button2 = document.querySelector('a.button-form:nth-child(3)');

    button1.remove();
    button2.remove();

    button.before(buttonSave);
    button.before(buttonCancel);

    button.remove();     
}

async function SaveModify(){
    const jwt = localStorage.getItem('jwt');
    if(jwt == null){
        OpenModalErrorReload('Vuelve a iniciar sesión antes de continuar.');
        return;
    }

    const form = document.querySelector('form');
        const data = new FormData(form);
    
        const nombres = data.get('nombres');
        const apellidos = data.get('apellidos');
        const direccion = data.get('direccion');
        const dni = data.get('cedula');
        const fecha = data.get('fecha');
    
        if (!nombres || !apellidos || !direccion || !dni || !fecha) {
            OpenModalError('Llenar campos requeridos.');
            return;
        }
        
        if (!Validate18(fecha)){
            OpenModalError('Debe ser mayor de edad para utilizar la plataforma');
            return;
        }

        const dateOffset = new Date(fecha);
        dateOffset.setUTCDate(dateOffset.getUTCDate() + 1);

        const modified = await SaveModifyAPI(jwt, nombres, apellidos, dni, dateOffset, direccion);

        if(modified){
            OpenModalButton('Cambios guardados correctamente', () => {
                const main = document.querySelector('main');
                main.innerHTML = '';
                LoadProfile();
            });
        }
        else{
            return false;
        }

}
async function SaveModifyAPI(jwt, nombres, apellidos, dni, fecha, direccion){
    const response = await fetch('https://graco-api.onrender.com/perfil', {
        method: 'PUT',
        headers:  {
            "Content-Type": "application/json",
            'Authorization': jwt
          },
        body: JSON.stringify({"nombre": nombres,
        "apellido": apellidos,
        "dni": dni,
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
    } else if(data['message' == 'Invalid session token']){
        OpenModalErrorReload(`Sesión expirada. Volver a iniciar sesion.`);
        localStorage.removeItem('jwt');
        return false;
    } else{
        OpenModalError(data['message']);
        return false;
    }
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

