class reproductor {

    constructor(nomRep, token, nomObj, busc, cajaReproductor, cajaListaReproduccion) {

        this.nombreReproductor = nomRep;
        this.tokenAutentificacion = token;
        this.nombreObjeto = nomObj;
        this.parametroBusqueda = '';
        this.arrayObjetosRecibidos = [];
        this.cajaIdReproductor = cajaReproductor;
        this.cajaIdListaReproduccion = cajaListaReproduccion;

    }

    async autentificarToken() {
        //VALIDA EL ACCESO A LA API DE SOUND CLOUD
        try {

            await SC.initialize({
                client_id: this.tokenAutentificacion
            })

        } catch (error) {
            console.log(error)
        }
    }  

    //FUNCION QUE MUESTRA LOS RESULTADOS EN FORMA DE OBJETO OBTENIDOS DE LA FUNCION BUSQUEDA.
    mostrarResultados(objetosCanciones) {

        let selectorIdListaReproduccion = `#${this.cajaIdListaReproduccion}`
        
        //limpia la lista de reproduccion despues de cada busqueda
        $(selectorIdListaReproduccion).html("");
        this.arrayObjetosRecibidos = objetosCanciones;
        
        //filtra los resultados buscados que se han almacenado en el array de objetos y se descartan los que no tienen
        // caratula con el metodo filter
        this.arrayObjetosRecibidos
            .filter(element => element.artwork_url != null)
            .forEach(element => {
                console.log(element)
                $(selectorIdListaReproduccion).append(`<div id = '${element.id}' class = "arrastraCancion" 
                draggable = "true" ondragstart = '${this.nombreObjeto}.drag(event)' >
                <img class = "caratula" draggable = "false" src='${element.artwork_url}'><div class="cajaDatosCancion">
                <p  class = "datosCancion">
                ${element.title}</p><p  class = "datosCancion">
                ${element.user.username}</p></div></div>`);
                

            });

    }

    //FUNCION QUE DE FORMA ASINCRONA HACE UNA CONSULTA A LA API DE SOUNDCLOUD RECOGIENDO LOS DATOS DE LA API QUE COINCIDAN
    //CON EL VALOR QUE HAYA INTRODUCIDO EL USUARIO EN EL ELEMENTO INPUT.
    async busqueda() {

        let objeto = await SC
            .get('/tracks', {
                q: this.parametroBusqueda,
                limit: 100
            })
            .then((res) => res)
            .catch(e => console.log(e))

        return objeto

    }

    //FUNCION QUE SE ACTIVA AL ARRASTRAR UN ELEMENTO CON LA PROPIEDAD ONDRAGSTART. MANDA DATOS A LA FUNCION DROP.
    drag(event) {

        event.dataTransfer.setData('data', event.target.id);

    }
    //FUNCION QUE EVITA QUE POR DEFECTO UN ELEMENTO NO PUEDA SOLTARSE SOBRE OTRO ELEMENTO
    permitirDrop(event) {
        event.preventDefault();
    }
    
    //LA FUNCION DROP SE INICIA AL SALTAR EL EVENTO ONDROP DE LA CAJA CONTENEDORA DEL REPRODUCTOR, RECIBE DATOS DE LA 
    //FUNCION DRAG. EL METODO JQUERY .HTML CREA UN CONTENEDOR EN EL LA CAJA #REPRODUCTOR CON EL REPRODUCTOR WIDGET DE SOUNDCLOUD

    drop(event) {

        event.preventDefault();

        let cancionId = event.dataTransfer.getData('data');

        let zonaDeDrop = '<p class="arrastrarText">Arrastra la cancion aqui para reproducirla.</p>';

        let reproductorEmbebido = `<label for="controlVolumen">Volumen</label>
        <input id="controlVolumen" onchange="${this.nombreObjeto}.controlarVolumen(event)" type="range" min="0" max="100" value="50" step="10" id="mislider">
        <span id="valor"></span><iframe allow="autoplay" width="100%" height="400" scrolling="no" frameborder="no" 
        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${cancionId}?client_id=${this.tokenAutentificacion}visual=true&amp;
        url=https://api.soundcloud.com/tracks/${cancionId}/stream;show_artwork=true&amp;auto_play=true">
        </iframe>`;
        let selectorCajaReproductor = `#${this.cajaIdReproductor}`;
        $(selectorCajaReproductor).html(reproductorEmbebido);
        $(selectorCajaReproductor).append(zonaDeDrop);

    }
    //funcion que controla el evento volumen
    controlarVolumen(event) {
        let widgetElemento = document.querySelector('iframe');
        let reproductorWidget = SC.Widget(widgetElemento);
        var nivelVolumen = event.target.value;
        reproductorWidget.setVolume(nivelVolumen);
    }


    
}