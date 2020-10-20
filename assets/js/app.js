$('document').ready(function() {
    $('#formulario').submit(function(evento) {
        evento.preventDefault();
        var numeroPokemon = $('input[name=idPokemon]').val();

        $.ajax({
            type: 'GET',
            "url": 'https://pokeapi.co/api/v2/pokemon/' + numeroPokemon.toString(),
            dataType: 'json',

            success: function(res) {
                var info = $('#info'); 

                $("#imgfront").attr("src", `${res.sprites.front_default}`);
                $("#imgback").attr("src", `${res.sprites.back_default}`);
                
                $("#nombrePokemon").text(`${res.name}`);
                               
                $("#habilidades").text("Habilidades: ");
                $.each(res.abilities, function(indice, elemento) {
                    $("#habilidades").text($("#habilidades").text() + `${elemento.ability.name} | `); 
                });

                
    
                var arrayTipos = res.types;

                $("#tipos").text("Tipos: ");
                $.each(arrayTipos, function(indice, elemento) {
                    $("#tipos").text($("#tipos").text() + `${elemento.type.name} | `);
                });
                
                $("#altura").text(`Altura: ${res.height / 10} m`);

                $("#peso").text(`Peso: ${res.weight / 10} kg`);

               
               $("#miGrafico").append('<ul id="estadisticas">Estadísticas</ul>');
               
               var estadisticas = res.stats;

               
               var datos = [];

               
               $.each(estadisticas, function(indice, elemento) {
                   datos.push({x: indice, y: estadisticas[indice].base_stat, label: estadisticas[indice].stat.name});
               });
               
               
               var chart = new CanvasJS.Chart("miGrafico", {
                   title: { text: "Estadísticas base"},
                   axisY: {includeZero: true, title: "Valores"},
                   axisX: {labelAngle: -50},
                   data: [{
                       type: "column",
                       label: "Estadísticas",
                       dataPoints: datos
                   }]
               });

               
               chart.render();0


            } 

        });
    });
});