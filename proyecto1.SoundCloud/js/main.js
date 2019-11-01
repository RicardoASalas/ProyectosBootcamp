
SC.initialize({
    client_id: 'aa06b0630e34d6055f9c6f8beb8e02eb',
  });

async function gestionarBusqueda(){
    
    const valorDeInput =  $('input').val();
    await busqueda(valorDeInput)
    .then( res => mostrarResultados(res))
    .catch(e => console.log("ha habido un error" + e))
    
   
    

}

function mostrarResultados(objetosCanciones){
    console.log("entra aqui");
    const arrayObjetosRecibidos = objetosCanciones;
    arrayObjetosRecibidos.forEach(element => {
        $('#listaReproduccion').append(`<p id='${element.id}'>${element.title}</p>`);
        console.log(element.title)
    });
    // objetosCanciones.array.forEach(element => {
    //     $('#listaReproduccion').append(`<p id='${element.id}'>${element.title}</p>`);
    // });
    
    
}


function reproducirCanciones(){

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