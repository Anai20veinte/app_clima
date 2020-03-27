const cont_data = (general,temp_max,temperatura,temp_min,humedad,feels,icono) => {

  return `<ul class="list-group list-group-flush">
  <li class="list-group-item"><img src="http://openweathermap.org/img/w/${icono}.png"alt="clima" style="width:75px;height:75px;"> ${general}</li>
  <li class="list-group-item"><b>Sensaciòn Termica:</b> ${feels} ºC</li>
  <li class="list-group-item"><b>Temperatura: </b>${temperatura} ºC</li>
  <li class="list-group-item"><b>Temperatura Maxima: </b>${temp_max} ºC</li>
  <li class="list-group-item"><b>Temperatura Minima: </b>${temp_min}ºC</li>
  <li class="list-group-item"><b>Humedad : </b>${humedad} %</li>

</ul>`

}


const mostrar_clima= () => {
  var ciudad = (document.getElementById('ciudad').value).trim();

  if(ciudad  == ''){
    document.getElementById('resultados').innerHTML = '<div class="col-12"><div class="alert alert-danger" role="alert">Escribe algo :(</div></div>';
  }else{

    var key = 'ad3b43ff732592d7f866aec59885bcff';
    var api_url = 'https://api.openweathermap.org/data/2.5/weather?q='+ ciudad + '&appid='+key +'&lang=es&units=metric';
    var div_resultados = document.getElementById('resultados');
    var html_resultados = '';

    html_resultados += '<div class="col-12"><b>Las condciones actuales en '+ ciudad+ ' son: </b></div>';

    fetch(api_url).then((result) => {

      var result_json = result.json();
      result_json.then((json) => {
        var results = json; //convierte en json
        var temperatura = results.main.temp;
        var temp_max = results.main.temp_max;
        var temp_min = results.main.temp_min;
        var humedad = results.main.humidity;
        var feels = results.main.feels_like;
        results.weather.forEach((item, i) => {
          var general = item.description;
          var icono = item.icon;

          html_resultados += cont_data(general,temperatura,temp_max,temp_min,humedad,feels,icono);
        });
        div_resultados.innerHTML =  html_resultados;





      });
    })


  }
}
