$(document).ready(function () {
    let token = 'aa06b0630e34d6055f9c6f8beb8e02eb'
    let nombreReproductor = "Richify Player"
    let cajaReproductor="reproductor";
    let cajaListaReproduccion="listaReproduccion";
    
    //se limpia la casilla de busqueda
    
    $('.introducirBusqueda').val("");

    
    //se instancia la clase reproductor y se crea un objeto de esa clase.
    richify = new reproductor(nombreReproductor, token, 'richify' , " ", cajaReproductor, cajaListaReproduccion);
    $('#tituloCabecera').append(nombreReproductor);

    //se llama a la funcion que autentifica la api de soundcloud
    richify.autentificarToken();
    
    
    //SE CREA EL CONTENEDOR DEL REPRODUCTOR EMBEBIDO DE SOUND CLOUD y EL DE LA LISTA DE REPRODUCCION

         $('main').append(
        `<div id=${cajaListaReproduccion}>
        </div>`);

        $('main').append(
        `<div id=${cajaReproductor} ondragover = "richify.permitirDrop(event)" ondrop = "richify.drop(event)">
            <h2>Arrastra la cancion aqui para reproducirla.</h2>
        </div>`
        );
    
    
    //FUNCION QUE GESTIONA LA BUSQUEDA PASANDO EL VALOR DEL ELEMENTO INPUT A LA FUNCION BUSQUEDA, QUE LA USARA PARA
    //ENCONTRAR CONCIDENCIAS EN LA API DE SOUNCLOUD Y EN CUANTO LAS RECIBA MANDARA EL OBJETO RECIBIDO A LA FUNCION MOSTRARRESULTADOS
    //PARA CREAR LA LISTA EN HTML.

        async function gestionarBusqueda() {
            
               
                richify.parametroBusqueda = $('.introducirBusqueda').val();
            
                let objetoCanciones = await richify.busqueda();
                
    
                richify.mostrarResultados(objetoCanciones)
                
        }
    //gestion del evento click en el boton de busqueda
        $('#botonBuscar').click( gestionarBusqueda);
    
    //gestion del evento keyup al presionar enter
        $('.introducirBusqueda').on("keyup", e=>{
            if (e.keyCode === 13){
                
                gestionarBusqueda();
            }
        });   

})





