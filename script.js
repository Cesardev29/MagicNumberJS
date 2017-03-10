(function(){

let	respuesta, num_magico, musica, regresa = 7, tiempo, id_public,
	confirmacion = document.getElementById("respuesta"),
		cuenta = document.getElementById("numero"),
		num1 = document.getElementById("num1"),
		num2 = document.getElementById("num2"),
		num3 = document.getElementById("num3"),
		num4 = document.getElementById("num4"),
		titulo = document.getElementById("titulo");

function colores_letras(){
	let color1 = Math.floor(Math.random() * (255 - 0)) + 0,
		color2 = Math.floor(Math.random() * (255 - 0)) + 0,
		color3 = Math.floor(Math.random() * (255 - 0)) + 0;
		titulo.setAttribute("style", `color: rgb(${color1},${color2},${color3})`);
}

function iniciar(){
	if(num1.disabled == true || num2.disabled == true || num3.disabled == true
		|| num4.disabled == true ){
		colores(true, id_public, "rgb(233, 233, 233)", "black", "rgb(115, 115, 115)");
	}
	deshabilitar(false);
	regresa = 7;
	confirmacion.textContent="";
	cuenta.textContent="";
	respuesta=0;
	respuesta = aleatorio(100);
	// Se muestra en la consola la respuesta al acertijo
	//console.log(respuesta);
	num_magico = aleatorio(5);
	if(parseInt(num_magico) === 0){
		num_magico++;
	}

	if(parseInt(num_magico) === 5){
		num_magico--;
	}

	document.getElementById("num" + num_magico).setAttribute('value', respuesta.toString());

	for (let i = 1; i <= 4; i++) {
		let seg = aleatorio(100);

		if(seg === respuesta) {
			while (seg === respuesta) {
					seg = aleatorio(100);
				}
		}
		if(i == num_magico){
			continue;
		}else{
			document.getElementById("num" + i).setAttribute('value', seg.toString());
		}
	}
}

function cuenta_regresiva(){
	if(regresa > 0){
		regresa--;
		cuenta.textContent = "Intentalo nuevamente en: "+ regresa;
	}
	if(regresa == 0){
		clearInterval(tiempo);
		iniciar();
	}
}

function deshabilitar(estado) {
	for (let i = 1; i <= 4; i++) {
		document.getElementById("num"+ i).disabled = estado;
	}
}

//Esta función genera un número aleatorio hasta el número especificado
function aleatorio (numero) {
	return Math.floor(Math.random() * numero);
}

function colores(estado, id, color, color_letra, color_borde){
	if (estado == true) {
		confirmacion.style.color = "Green";
		confirmacion.textContent = "Felicidades ganaste ^.^";
		cuenta.style.color = "Green";
	} else {
		confirmacion.style.color = "Red";
		confirmacion.textContent = "Perdiste, T.T";
		cuenta.style.color = "Red";
	}
	document.getElementById(id).style.background = color;
	document.getElementById(id).style.borderColor = color_borde;
	document.getElementById(id).style.color = color_letra;
}

function comprobar(id, valor) {
	let numero=0;
	//console.log(valor);
	id_public = id;

	if(valor == respuesta){
		musica = new Audio("sonido/Bandera.mp3");
		musica.play();
		colores(true, id, "rgb(94, 199, 37)", "#fff", "rgb(94, 199, 37)");
	}else{
		musica = new Audio("sonido/Pierde.mp3");
		musica.play();
		colores(false, id, "rgb(224, 55, 55)", "#fff", "rgb(224, 55, 55)");
	}
	deshabilitar(true);
	tiempo = setInterval(cuenta_regresiva, "1000");
}

// Función para cambiar de color al titulo
setInterval(colores_letras, 1000);
//Se llaman a las funciones
document.getElementsByTagName("body")[0].addEventListener("load", iniciar());
//num1.addEventListener("click", comprobar.bind(null, num1.id));
num1.addEventListener("click", ()=>{
	comprobar(num1.id, num1.value);
});
// num2.addEventListener("click", comprobar.bind(null, num2.id));
num2.addEventListener("click", ()=>{
	comprobar(num2.id, num2.value);
});
// num3.addEventListener("click", comprobar.bind(null, num3.id));
num3.addEventListener("click", ()=>{
	comprobar(num3.id, num3.value);
})
// num4.addEventListener("click", comprobar.bind(null, num4.id));
num4.addEventListener("click", ()=>{
	comprobar(num4.id, num4.value);
})
})();
