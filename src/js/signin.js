import "../scss/signin.scss"

const form = document.querySelector("form")
const password = document.querySelector("#password")  //LLAMAMOS LOS CAMPOS DEL FORMULARIO Y EL FORMULARIO
const email = document.querySelector("#email")
async function validateEmail (email){  //CREAMOS LA FUNCION QUE VA A VERIFICAR SI EL EMALI INGRESADO EXISTE EN NUESTRO JSON
    const response = await fetch(`http://localhost:3000/user?email=${email.value}`) //BUSCAMOS EN EL JSON EL VALOR DEL INPUT QUE NOS DIO EL USUARIO
    const data = await response.json() //PASAMOS ESTA RESPUESTA A JSON
    //ESTA PETICION VA A DEVOLVER UN ARRAY, SI EL ARRAY DEVUELVE ALGO SIN POSICIONES QUIERE DECIR QUE NO ENCONTRO EL EMAIL
    if (data.length>0){  //+VERIFICAMOS SI EL ARRAY TIENE ALGO ADENTRO, ES DECIR ENCONTRO EL USUARIO CON ESE CORREO INGRESADO
        return data[0]  //TOMAMOS ESE ARRAY EN LA POSICION 0 (POSICION UNICA DE ESTE YA QUE SOLO DEBE HABER UN USUARIO CON CADA CORREO) Y LO DEVOLVEMOS, ESTE DEVUELVE TODOS LOS DATOS DEL USUARIO CON ESE CORREO
    }else{
       return false //SI NO DEVOLVEMOS FALSO
    }
}
form.addEventListener("submit", async(event)=>{ //CUANDO EL USUARIO DE CLICK EN EL BOTON
    event.preventDefault() //EVITA QUE SE RECARGUE LA PAGINA
    const user = await validateEmail(email) //METEMOS EL PARAMETRO A LA FUNCION, ESTA VA A DEVOLVER FALSO O O LOS DATOS DEL USUARIO QUE ENCONTRÓ
    if (user === false){ //SI DEVUELVE FALSO NOS VA A MANDAR UNA ALERTA
        alert("Usted no está registrado")
    }else{ //SI NO DEVUELVE FALSO ENTRA A VERIFICAR SI LA CONTRASEÑA QUE TIENE ASIGNADA ESTE USUARIO COINCIDE CON LA DEL FORMULARIO
        if(user.password== password.value){ //SI LA LLAVE CONTRASEÑA DEL USUARIO QUE ENCONTRO COINCIDE CON LA CONTRASEÑA QUE INGRESO EL USUARIO:
            localStorage.setItem("userOnline",JSON.stringify(user)) //SUBIMOS EL USUARIO AL LOCAL STORAGE (LLAVE,VALOR)  RECORDAR QUE PASAMOS EL USUARIO A STRING
            window.location.href = "../pages/register.html" //REDIRECCIONAMOS AL USUARIO A LA SIGUIENTE PANTALLA
        }else{ //SI LA CONTRASEÑA NO ES CORRECTA SACA LA ALERTA
            alert("Contraseña incorrecta")
        }
    }
})