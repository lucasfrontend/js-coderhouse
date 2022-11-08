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

};
