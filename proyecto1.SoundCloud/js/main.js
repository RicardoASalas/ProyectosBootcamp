
//VALIDA EL ACCESO A LA API DE SOUND CLOUD
SC.initialize({
    client_id: 'aa06b0630e34d6055f9c6f8beb8e02eb',
  });

//LA FUNCION DROP SE INICIA AL SALTAR EL EVENTO ONDROP DE LA CAJA CONTENEDORA DEL REPRODUCTOR, RECIBE DATOS DE LA 
//FUNCION DRAG. EL METODO JQUERY .HTML CREA UN CONTENEDOR EN EL LA CAJA #REPRODUCTOR CON EL REPRODUCTOR WIDGET DE SOUNDCLOUD
  
async function drop(event){
   
    event.preventDefault();
    track_url = event.dataTransfer.getData('data');
    zonaDeDrop = '<h2>Arrastra la cancion aqui para reproducirla.</h2>';
    await SC.oEmbed(track_url, { auto_play: true })
        .then(function(oEmbed) {
        const reproductorEmbebido=oEmbed.html;
        $('#reproductor').html(reproductorEmbebido);
        $('#reproductor').append(zonaDeDrop);
    
        })
        .catch(e => console.log(e))
    
} 

//FUNCION QUE EVITA QUE POR DEFECTO UN ELEMENTO NO PUEDA SOLTARSE SOBRE OTRO ELEMENTO
function permitirDrop(event){

    event.preventDefault();
}

//FUNCION QUE SE ACTIVA AL ARRASTRAR UN ELEMENTO CON LA PROPIEDAD ONDRAGSTART. MANDA DATOS A LA FUNCION DROP.
function drag(event){

    event.dataTransfer.setData('data', event.target.id);
    
}
  

//FUNCION QUE MUESTRA LOS RESULTADOS EN FORMA DE OBJETO OBTENIDOS DE LA FUNCION BUSQUEDA.
function mostrarResultados(objetosCanciones){
    
    const arrayObjetosRecibidos = objetosCanciones;
    
        $('#listaReproduccion').html('');
        arrayObjetosRecibidos
        .filter(element => element.artwork_url != null)
        .forEach(element => {

            $('#listaReproduccion').append(`<div id = '${element.permalink_url}' class = "arrastraCancion"  
            draggable = "true" ondragstart = "drag(event)" ><p  class = "titulo">
             ${element.title}</p><img class = "caratula" draggable = "false" src='${element.artwork_url}'</div>`); 
            
        });
    
}

//FUNCION QUE DE FORMA ASINCRONA HACE UNA CONSULTA A LA API DE SOUNDCLOUD RECOGIENDO LOS DATOS DE LA API QUE COINCIDAN
//CON EL VALOR QUE HAYA INTRODUCIDO EL USUARIO EN EL ELEMENTO INPUT.
async function busqueda(parametroBusqueda){
    
    const resultadosBusqueda = await SC
        .get('/tracks', {q: parametroBusqueda, limit: 100})

    return resultadosBusqueda;
     
}

//FUNCION ASINCRONA QUE GESTIONA LA BUSQUEDA PASANDO EL VALOR DEL ELEMENTO INPUT A LA FUNCION BUSQUEDA, QUE LA USARA PARA
//ENCONTRAR CONCIDENCIAS EN LA API DE SOUNCLOUD Y EN CUANTO LAS RECIBA MANDARA EL OBJETO RECIBIDO A LA FUNCION MOSTRARRESULTADOS
//PARA CREAR LA LISTA EN HTML.
async function gestionarBusqueda(){
    
    const valorDeInput =  $('input').val();
    await busqueda(valorDeInput)
        .then( res => mostrarResultados(res))
        .catch(e => console.log(e))
    
}





