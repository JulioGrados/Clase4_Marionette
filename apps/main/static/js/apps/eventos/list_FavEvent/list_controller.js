EventManager.module("EventosApp.ListFav", function( ListFav, 
	EventManager, Backbone, Marionette, $, _) {

	ListFav.Controller = {

		listFavEventos: function () {
			var fetchEventos = EventManager.request("eventos:entities");
			var fetchFavoritos = EventManager.request("favoritos:entities");

			$.when(fetchEventos).done(function(eventos){

				$.when(fetchFavoritos).done(function(favoritos){

					var eventFav = favoritos.where({user: 2});

					var filtroEvents = new EventManager.EventosCollection();

					eventos.forEach(function(evento){
						eventFav.forEach(function(favorito){
							if(evento.id == favorito.id){
								filtroEvents.add(evento);
							}
						});	
					});
					
					var eventsListView = new ListFav.EventosView ({
						collection: filtroEvents
					});

					eventsListView.on("childview:evento:showFav", function(
						childview ,model){
						EventManager.trigger("evento:show", model.get('id'));
					});

					EventManager.mainRegion.show(eventsListView);
				});
			});
		}
	};
});