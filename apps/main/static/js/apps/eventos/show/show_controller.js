EventManager.module("EventosApp.Show", function(Show, 
	EventManager, Backbone, Marionette, $, _) {

	Show.Controller = {
		showEvento: function(id) {

			$.ajaxSetup({ 
		    beforeSend: function(xhr, settings) {
		         function getCookie(name) {
		             var cookieValue = null;
		             if (document.cookie && document.cookie != '') {
		                 var cookies = document.cookie.split(';');
		                 for (var i = 0; i < cookies.length; i++) {
		                     var cookie = jQuery.trim(cookies[i]);
		                     // Does this cookie string begin with the name we want?
		                 if (cookie.substring(0, name.length + 1) == (name + '=')) {
		                     cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
		                     break;
		                 }
		             }
		         }
		         return cookieValue;
		         }
		         if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
		             // Only send the token to relative URLs i.e. locally.
		             xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
		         }
		     } 
		});

			var fetchEvento = EventManager.request("evento:entity", id);
			var fetchFavoritos = EventManager.request("favoritos:entities");
			var fetchRegistros = EventManager.request("registro:entity", id);

			var eventsListLayout = new Show.Layout();
			var registerPanel = new Show.Register();

			$.when(fetchEvento).done(function(evento){
				var fecha = new Date(evento.get('date'));
				var dia = EventManager.EventosApp.Show.Controller.getDia(fecha.getDay());
				evento.set({dia: dia});
				evento.set({hora: fecha.getHours() +":"+ fecha.getMinutes()});
				evento.set({fecha: fecha.getDate() +"/"+ fecha.getMonth() +
					"/" + fecha.getFullYear()});

				var eventoView = new Show.Event({
					model: evento
				});

				eventsListLayout.on("show", function(){
					eventsListLayout.eventRegion.show(eventoView);
					eventsListLayout.panelRegister.show(registerPanel);
				});

				eventoView.on("showList:eventos", function(model){
					EventManager.trigger("events:list");
				});

				eventoView.on("favorito:eventos", function(model){
					$.when(fetchFavoritos).done(function(favoritos){
						favoritos.create({
							event: id,
							user: 2
						});
					});
				});

				registerPanel.on("registrar:evento", function(
					nombre, apellido, dni, telefono){

					$.when(fetchRegistros).done(function(registros){
						var model = new EventManager.Inscrito({
							firtname: nombre,
							surname: apellido,
							dni: parseInt(dni),
							phone: telefono,
							event: parseInt(id),
							id: registros.length ++
						});

						registros.add(model);
						console.log(registros);
					});
				});

				EventManager.mainRegion.show(eventsListLayout);
			});

		},

		getDia: function (dia) {
			if(dia==1){return "Lunes"}
			if(dia==2){return "Martes"}
			if(dia==3){return "Miercoles"}
			if(dia==4){return "Jueves"}
			if(dia==5){return "Viernes"}
			if(dia==6){return "Sabado"}
			if(dia==7){return "Domingo"}
		}
	};
});