$(function(){

	var objFirebase = new Firebase("https://chatwilmer.firebaseio.com/");

	$('#btnEnviarMsj').click(clickEnvio);	

	$('.estrellita').click(clickMsgImportante);

	$('#imgAvatar').attr('src', sessionStorage.getItem('profileImageURL'));	

	console.log(sessionStorage.getItem('profileImageURL'));

	$(".cont-mensaje-timeline").animate({		
        scrollTop: $(document).height()
    }, 'slow');

        function clickMsgImportante(){
    	console.log("entra");
    	//$('.estrellita');
    	console.log($('.estrellita'));
    }

	function clickEnvio(){		
		var mensaje = $('#inMensaje').val();
		$('#inMensaje').val('');

		objFirebase.push(
			{  			
  				autor: "Wilmercity",  			
    			mensaje: mensaje
  			}
		);

		console.log(mensaje);
	}

	objFirebase.on("child_added", function(data){
		var registro = data.val();
		var plantilla = getPlantilla(registro.autor,registro.mensaje);		
		$('.cont-mensaje-timeline').append(plantilla);

		var datos = mensaje_favorito(registro.autor,registro.mensaje);					
		$('.panel').append(datos);

		var fntSelEstrella = seleccionarEstrella(false);
		$(plantilla).find(".estrellita").click(function(event){
					event.preventDefault();
					fntSelEstrella.cambiarEstado();	
		});	
	});

	function getPlantilla(autor, mensaje){
		var plantilla = '<article class="cont-mensaje"> \
			 	<div class="cont-mensaje-texto"> \
					<figure class="cont-imagen-autor"> \
					<img src="../imgs/avatarwilmer.jpg"> \
					</figure> \
					<div class="cont-mensaje-detalles"> \
						<p class="cont-mensaje-detalles-txt">'+ mensaje +'</p> \
						<label class="cont-mensaje-detalles-fecha" >Hace 20 Min</label>	\
					</div> \
				</div> \
				<div class="cont-mensaje-meta"> \
					<div class="cont-mensaje-autor"> \
							por <a href="#">'+autor+'</a> \
					</div> \
					<div class="cont-mensaje-fecha"> \
						<label class="fecha"> \
							26/09/2015 \
						</label> \
						<a class="estrellita" href="">	\
						</a> \
					</div> \
				</div>		\
			</article>';

		return plantilla
	}

	function mensaje_favorito(autor, mensaje){
		var menfav = '<div id = "panel-oculto" style="display:none;" > <p class="cont-mensaje-detalles-txt">'+ mensaje +'</p> \
			Por <a href="#">'+autor+'</a></div>';

	return menfav
	}

function seleccionarEstrella(estado){

		var estadoTmp = estado || false;

		return{
			cambiarEstado: function(){
				console.log("Cambiando Estado");
				if (estadoTmp) {
					estadoTmp = false;					
				}
				else{
					estadoTmp = true;
				}

				return estadoTmp
			}
		}
	}	

	 $('#mensajefavorito').toggle(  
        /* 
            Primer click.
        */
        function(e){ 
            $('#panel-oculto').slideDown();
           /*  $(this).text('Cerrar el panel');*/
            e.preventDefault();
        }, // Separamos las dos funciones con una coma
     
        /* 
            Segundo click.
        */
        function(e){ 
            $('#panel-oculto').slideUp();
           /*  $(this).text('Mostrar el panel oculto');*/
            e.preventDefault();
        }
 
    );

});