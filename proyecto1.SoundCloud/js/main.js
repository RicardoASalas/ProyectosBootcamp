
//VALIDA EL ACCESO A LA API DE SOUND CLOUD
SC.initialize({
    client_id: 'aa06b0630e34d6055f9c6f8beb8e02eb',
  });

  //ESTA FUNCION SE INICIA AL HACER CLICK EN UNA CANCION, EL METODO JQUERY .HTML CREA UN CONTENEDOR CON EL REPRODUCTOR WIDGET DE SOUNCLOUD
  
    function reproducirCancion(cancion){
            var track_url = cancion;
        SC.oEmbed(track_url, { auto_play: true })
        .then(function(oEmbed) {
        const reproductorEmbebido=oEmbed.html;
        $('footer').html(reproductorEmbebido);
    })
    .catch(e=>console.log(e));
    
} 

  
  

  

async function gestionarBusqueda(){
    
    const valorDeInput =  $('input').val();
    await busqueda(valorDeInput)
    .then( res => mostrarResultados(res))
    .catch(e => console.log(e))
    
   
    

}

function mostrarResultados(objetosCanciones){
    console.log(objetosCanciones);
    const arrayObjetosRecibidos = objetosCanciones;
    $('#listaReproduccion').html('');
    arrayObjetosRecibidos.forEach(element => {
        $('#listaReproduccion').append(`<a href="#" onclick="reproducirCancion(this.id)" id='${element.permalink_url}'>${element.title}</a>`);
        console.log(element.title)
        $('#fotoBanda').src=""
    });
    // objetosCanciones.array.forEach(element => {
    //     $('#listaReproduccion').append(`<p id='${element.id}'>${element.title}</p>`);
    // });
    
    
}




async function busqueda(parametroBusqueda){
    
    const resultadosBusqueda = await SC
    .get('/tracks', {q: parametroBusqueda, limit:20})

    return resultadosBusqueda;
     
}





// function Busqueda() {
//      $('.lista').empty(); //Limpiamos la lista.
//     var autor = $('input').val();
//     SC.initialize({
//       client_id: 'aa06b0630e34d6055f9c6f8beb8e02eb',
//     });
//     SC.get('/tracks', {
//       q: autor,
//     }).then(function(tracks) {
//       var numero = 0;
//       if (tracks.length > 12) {
//         numero = 12;
//       } else {
//         numero = tracks.length;
//       }
//       for (var i = 0; i < numero; i++) {
//         if (tracks[i].artwork_url !== null) {
//           $('.lista').append(
//             "<div class='imagen_mini col-xs-2'><img src='" +
//               tracks[i].artwork_url +
//               "' id ='" +
//               tracks[i].id +
//               "' draggable='true' ondragstart='drag(event)'></div>"
//           );
//         }
//       }
//     });
//    }