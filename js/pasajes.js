/* datos para mostrar clima*/

const latMad = '-42.76705657797566' ;
const lonMad = '-65.03900027311204';

const lonCom = '-67.49656';
const latCom = '-45.86413' ;

const lonBar = '-71.30822';
const latBar = '-41.14557' ;

const lonUsh = '-68.31591';
const latUsh = '-54.81084' ;

const lonGrut = '-64.9333';
const latGrut = '-40.7333' ;

const lonBb = '-62.2833';
const latBb = '-38.7167' ;

const part = 'hourly,daily'; 
const key = `e7ea28eea6e66941216ebf0b7faa1321`;

/* precios */ 
const pasaje_madryn = 8000;
const pasaje_comodoro = 8500;
const pasaje_bariloche = 9000;
const pasaje_ushuaia = 10000;
const pasaje_las_grutas = 8000;
const pasaje_bahia_blanca = 7000;

/* variables globales */ 
let destino_elegido;
let cuotas_elegidas;
let compras_efectuadas = [];
let string_destino;

/* info del dom */ 
let boton_comprar = document.getElementById('boton_comprar');
let cuotas = document.querySelectorAll('.cuotas');
let destinos_btn = document.querySelectorAll('.destinos');
let result = document.getElementById('result');
let clima = document.getElementById('clima');

boton_comprar.addEventListener('click', function(){

    for (let i = 0; i < destinos_btn.length; i++){ 
        if (destinos_btn[i].checked) {
          destino_elegido = destinos_btn[i].value;
          }
    }

    if(destino_elegido == 1){
        string_destino = 'Puerto Madryn';
        precio_pasaje = pasaje_madryn;
        
    
    } else if (destino_elegido == 2){
        string_destino = 'Comodoro Rivadavia';
        precio_pasaje = pasaje_comodoro;
    
    } else if (destino_elegido == 3){
        string_destino = 'Bariloche';
        precio_pasaje = pasaje_bariloche;
    
    } else if (destino_elegido == 4){
        string_destino ='Ushuahia'
        precio_pasaje = pasaje_ushuaia;
    
    } else if (destino_elegido == 5){
        string_destino = 'Las Grutas';
        precio_pasaje = pasaje_las_grutas;
    
    } else if (destino_elegido == 6){
        string_destino = 'Bahia Blanca'
        precio_pasaje = pasaje_bahia_blanca;
    }else {
        result.innerHTML = `<h2>Debe elegir un destino</h2>`;
    }


    for (let i = 0; i < cuotas.length; i++){ 
      if (cuotas[i].checked) {
        cuotas_elegidas = cuotas[i].value;
        }
    }
    
    calcular_precio_final(precio_pasaje, cuotas_elegidas)
})

function calcular_precio_final(){

    if(cuotas_elegidas == 1){
        precio_final = "El precio final es: " + precio_pasaje + "(sin intereses!)";
        precio_final = precio_pasaje;
    } else if(cuotas_elegidas == 3){
        precio_final = precio_pasaje + 2000;
    } else if(cuotas_elegidas == 6){
        precio_final = precio_pasaje + 4000;
    } else {
        console.log("Ingrese un numero de cuotas valido, 1, 3 o 6.");
        precio_final = "No se pudo efectuar la compra";
        result.innerHTML = `<h2>Seleccione numero de cuotas</h2>`;
    }
    
    function saveData(){

        let compra_efectuada = {destino: destino_elegido,  precio: precio_final}
        compras_efectuadas.push(compra_efectuada)
        // convierto a json
        let compras_JSON = JSON.stringify(compras_efectuadas)
        localStorage.setItem("compras_efectuadas", compras_JSON)
    }
    saveData();
    
    function getData(){
        let datos_recuperados = localStorage.getItem("compras_efectuadas")
        get_data = JSON.parse(datos_recuperados)
    }

    getData()

    function showData(){
        result.innerHTML = `<div class="text-center"><h3>Usted a elegido viajar a: ${string_destino}</h3><h4>El precio final es ${precio_final}</h4></div>`;
    }

    showData(destino_elegido, precio_final);

    let resultClima = async function(){

        let resultClima = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitud}&lon=${longitud}&lang=es&unit=metric&exclude=${part}&appid=${key}`)
        .then(res => res.json())
        .then(res =>{
            clima.innerHTML = `<div class="text-center"><h5>Temperatura actual en ${string_destino}: ${Math.round(res.current.temp).toString().substring(0,2)} grados</h5></div>`;
        
        })
    }
    if(destino_elegido == 1){
        latitud = latMad;
        longitud = lonMad;
        
    } else if (destino_elegido == 2){
        latitud = latCom;
        longitud = lonCom;
    
    } else if (destino_elegido == 3){
        latitud = latBar;
        longitud = lonBar;
    
    } else if (destino_elegido == 4){
        latitud = latUsh;
        longitud = lonUsh;
    
    } else if (destino_elegido == 5){
        latitud = latGrut;
        longitud = lonGrut;
    
    } else if (destino_elegido == 6){
        latitud = latBb;
        longitud = lonBb;
    }else {
        
    }

    resultClima()

};

