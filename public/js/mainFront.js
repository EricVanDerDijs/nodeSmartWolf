var body = $('html, body');
var pageNo = 0;
var pageLastIndex;
var pageFirstIndex;

//anima el movimiento de los anchor points de la página 
function animateScroll(e){
	e.preventDefault();
	
	body.animate({
        scrollTop: $( $(this).attr("href") ).offset().top
    }, 400);

    return false;
}

//aplica al jumbotron la altura de la ventana o una altura determinada por el contenido del mismo
function applyFullHeight(){
	function aFH(){
		var vpHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

		if($(".jumbotron div").innerHeight() > (vpHeight-134)){
			$(".jumbotron").innerHeight($(".jumbotron div").innerHeight() + 134);
		}
		else{
			$(".jumbotron").innerHeight(vpHeight-67);
		}
	}
	//Aplica la altura completa del jumbotron al cargar la pagina
	$(aFH);
	//Aplica la altura completa del jumbotron cada vez que se hace rezise
	$( window ).resize(function(){
		var paused = false;
		var delay = 150;

		if(!paused){
			aFH();
			paused = true;
			setTimeout(function(){paused = false}, delay);
		}
	});

}
//aplica a todos los elementos seleccionados la misma altura
function normalizeHeight(string){
	
	function nH(){
		//inicializa las variables
		var maxHeight = 0, maxHeightIndex = null;
		//sobreescribe los valores de altura a auto para que se reacomode el contenido
		$(string).each(function(index) {
	    	$(this).height("auto");
		});

		//busca el elemento de mayor altura y guarda su altura e indice
		$(string).each(function(index) {
	    	if ($(this).height() >= maxHeight){
	    		maxHeight = $(this).height();
	    		maxHeightIndex = index;
	    	}
		});

		//aplica a todos los elementos la altura del mayor 
	   	$(string).each(function (index){
	   		$( this ).height(maxHeight);
	   	});
	}

	//normaliza las alturas al cargar la pagina
	$(nH);
	//normaliza las alturas cada vez que se hace rezise
	$( window ).resize(function(){
		var paused = false;
		var delay = 150;

		if(!paused){
			nH();
			paused = true;
			setTimeout(function(){paused = false}, delay);
		}
	});
}

//Realiza la animacion y cambia las clases que permiten muestran los elementos al moverse a la derecha
function pageUp() {
	//se cambia el número de pagina y se encuentra el indice del primer elemento de esta
	pageNo++;
	pageFirstIndex = pageNo*3;
	
	//se realiza un cambio de pagiana siempre que hayan más páginas
	if(pageFirstIndex < $("div.cliente").length){
	//se realiza la animacion de salida de los elementos visibles
		$("div.visible").animate({
			right: "50px", opacity: "0"
		},300);

		//se quita la clase "visible" y se cambia si display a "none"
		$("div.visible").toggleClass("visible d-md-none");

		//dado que siempre se tendran 3 divs por pagina, el ultimo indice de la pagina sera el primero + 2
		pageLastIndex = pageFirstIndex+2;

		//se aplican las clases y estilos equeridos para la siguiente animación
		for (var i = pageFirstIndex; i <= pageLastIndex; i++){
			$("div.cliente")[i].style.opacity = 0;
			$("div.cliente")[i].style.right = "-50px";
			$("div.cliente")[i].classList.remove("d-none");
			$("div.cliente")[i].classList.toggle("visible");
			$("div.cliente")[i].classList.toggle("d-md-none");	
		}

		//se hace la animacion de entrada
		$("div.visible").animate({
			right: "0px", opacity: "1"
		},300);

		//se cambia la posicion del indicador de pagina
		$("span.page-indicator").removeClass("activo");
		$("span.page-indicator")[pageNo].classList.add("activo");
	}

	//si no hay más páginas por delante se mantine la misma pagina (ultima)
	else{pageNo--;}
}

//Realiza la animacion y cambia las clases que permiten muestran los elementos al moverse a la izquierda, revisar comentarios de pageUp()
function pageDown() {
	pageNo--;
	pageFirstIndex = pageNo*3;
	
	if(pageFirstIndex >= 0 ){
		$("div.visible").animate({
			right: "-50px", opacity: "0"
		},300);


		$("div.visible").toggleClass("visible d-md-none");

		pageLastIndex = pageFirstIndex+2;

		for (var i = pageFirstIndex; i <= pageLastIndex; i++){
			$("div.cliente")[i].style.opacity = 0;
			$("div.cliente")[i].style.right = "50px";
			$("div.cliente")[i].classList.toggle("visible");
			$("div.cliente")[i].classList.toggle("d-md-none");	
		}

		$("div.visible").animate({
			right: "0px", opacity: "1"
		},300);

		$("span.page-indicator").removeClass("activo");
		$("span.page-indicator")[pageNo].classList.add("activo");
	}
	else{pageNo++;}
}






applyFullHeight();
normalizeHeight(".bg-S-section");
normalizeHeight(".bg-C-section");
$("button.fa-angle-right").click(pageUp);
$("button.fa-angle-left").click(pageDown);
$("a.nav-link, a.navbar-brand, a.btn-lg").click(animateScroll);