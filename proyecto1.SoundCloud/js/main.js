
//VALIDA EL ACCESO A LA API DE SOUND CLOUD
SC.initialize({
    client_id: 'aa06b0630e34d6055f9c6f8beb8e02eb',
  });

  //ESTA FUNCION SE INICIA AL HACER CLICK EN UNA CANCION, EL METODO JQUERY .HTML CREA UN CONTENEDOR EN EL 
  //ELEMENTO FOOTER CON EL REPRODUCTOR WIDGET DE SOUNDCLOUD
  
function reproducirCancion(cancion){
    var track_url = cancion;
    SC.oEmbed(track_url, { auto_play: false })
        .then(function(oEmbed) {
        const reproductorEmbebido=oEmbed.html;
        $('#reproductor').html(reproductorEmbebido);
        $('#reproductor iframe:first').addClass("sueltaCancion");
        $('.sueltaCancion').droppable({
            drop: function() {
                console.log("entra aqui joder")
               $('.sueltaCancion').attr("auto_play","true");
               //const id =`"#${cancion}"`;
               //$(id).remove();
            }
         });
        })
        .catch(e => console.log(e))
    
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
    
    jQuery(document).ready(function() {
    
    
        $('#listaReproduccion').html('');
        arrayObjetosRecibidos
        .filter(element => element.artwork_url != null)
        .forEach(element => {
            console.log(element);
            $('#listaReproduccion').append(`<div class = "arrastraCancion" ><a href="#" 
            onclick="reproducirCancion(this.id)" id='${element.permalink_url}' class="titulo">
            ${element.title}</a><img class="caratula" src='${element.artwork_url}'</div>`); 
            $('.arrastraCancion').draggable({zIndex: 100, opacity: 0.35, containment: 'body', scroll: false});    
      
        });
    });
    
    
}

async function busqueda(parametroBusqueda){
    
    const resultadosBusqueda = await SC
        .get('/tracks', {q: parametroBusqueda, limit: 100})

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